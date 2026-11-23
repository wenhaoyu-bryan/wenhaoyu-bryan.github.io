import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import test from "node:test";
import assert from "node:assert/strict";

const compile = path => ts.transpileModule(readFileSync(path, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const options = {};
runInNewContext(compile("src/scripts/appearance-options.ts"), { exports: options });

const layout = readFileSync("src/layouts/Layout.astro", "utf8");
const bootstrap = layout.match(/<script\b[^>]*data-appearance-bootstrap[^>]*>([\s\S]*?)<\/script>/)[1];
const themeScript = compile("src/scripts/theme.ts");

function boot(saved = {}, { blocked = false, prefersDark = false } = {}) {
  const stored = new Map(Object.entries(saved));
  const dataset = {};
  const events = {};
  const windowEvents = {};
  const media = {
    matches: prefersDark,
    addEventListener(_, fn) { this.change = fn; },
  };

  class Choice {
    constructor(name, value) {
      this.name = name;
      this.value = value;
    }
    hasAttribute(name) { return name === "data-appearance-choice"; }
  }

  class Reset {
    closest(selector) { return selector === "[data-appearance-reset]" ? this : null; }
  }

  const context = {
    themeModes: options.themeModes,
    themePreferenceKey: options.themePreferenceKey,
    exports: {},
    require: () => options,
    HTMLInputElement: Choice,
    localStorage: {
      getItem(key) {
        if (blocked) throw new Error("storage blocked");
        return stored.get(key) ?? null;
      },
      setItem(key, value) {
        if (blocked) throw new Error("storage blocked");
        stored.set(key, value);
      },
      removeItem(key) {
        if (blocked) throw new Error("storage blocked");
        stored.delete(key);
      },
    },
    window: {
      matchMedia: () => media,
      getComputedStyle: () => ({ backgroundColor: "white" }),
      addEventListener: (name, fn) => { windowEvents[name] = fn; },
    },
    document: {
      documentElement: { dataset },
      body: {},
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: (name, fn) => { events[name] = fn; },
    },
  };
  runInNewContext(bootstrap, context);
  const initial = { ...dataset };
  runInNewContext(themeScript, context);

  return {
    dataset,
    initial,
    stored,
    choose: (name, value) => events.change({ target: new Choice(name, value) }),
    setSystemDark: matches => { media.matches = matches; media.change(); },
    fromAnotherTab: (key, newValue) => windowEvents.storage({ key, newValue }),
    incomingPage: () => {
      const next = {};
      events["astro:before-swap"]({
        newDocument: { documentElement: { dataset: next }, querySelector: () => null },
      });
      return next;
    },
  };
}

test("existing manual theme choices survive an OS change", () => {
  const page = boot({ theme: "light" });
  page.setSystemDark(true);
  assert.equal(page.dataset.theme, "light");
});

test("System follows the OS without storing an override", () => {
  const page = boot({ theme: "light" });
  page.choose("theme", "system");
  page.setSystemDark(true);
  assert.equal(page.dataset.theme, "dark");
  assert.equal(page.stored.has("theme"), false);
});

test("a saved dark choice applies before paint and across navigation", () => {
  const page = boot({ theme: "dark" });
  const expected = { themePreference: "dark", theme: "dark" };
  assert.deepEqual(page.initial, expected);
  assert.deepEqual(page.incomingPage(), expected);
});

test("blocked storage still lets visitors switch themes for the current visit", () => {
  const page = boot({}, { blocked: true });
  page.choose("theme", "dark");
  assert.equal(page.dataset.theme, "dark");
  assert.equal(page.incomingPage().theme, "dark");
});

test("invalid themes follow the system and preview palette settings are ignored", () => {
  const page = boot({
    theme: "bad",
    "portfolio-dark-palette": "pine",
    "portfolio-text-tone": "warm",
  }, { prefersDark: true });
  assert.deepEqual(page.dataset, { themePreference: "system", theme: "dark" });
  page.fromAnotherTab("portfolio-dark-palette", "navy");
  assert.deepEqual(page.dataset, { themePreference: "system", theme: "dark" });
});

test("another tab's theme change is reflected", () => {
  const page = boot({ theme: "light" }, { prefersDark: true });
  page.fromAnotherTab("theme", "dark");
  assert.equal(page.dataset.theme, "dark");
  page.fromAnotherTab("theme", null);
  assert.equal(page.dataset.themePreference, "system");
  assert.equal(page.dataset.theme, "dark");
});
