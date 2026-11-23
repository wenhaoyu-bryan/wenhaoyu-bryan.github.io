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
  class Toggle {
    dataset = {
      labelLight: "Switch to light mode",
      labelDark: "Switch to dark mode",
    };

    closest(selector) {
      return selector === "#theme-btn" ? this : null;
    }

    setAttribute(name, value) {
      this[name] = value;
    }
  }
  const toggle = new Toggle();

  const context = {
    defaultTheme: options.defaultTheme,
    themeModes: options.themeModes,
    themePreferenceKey: options.themePreferenceKey,
    exports: {},
    require: () => options,
    Element: Toggle,
    localStorage: {
      getItem(key) {
        if (blocked) throw new Error("storage blocked");
        return stored.get(key) ?? null;
      },
      setItem(key, value) {
        if (blocked) throw new Error("storage blocked");
        stored.set(key, value);
      },
    },
    window: {
      matchMedia: () => ({ matches: prefersDark, addEventListener() {} }),
      getComputedStyle: () => ({ backgroundColor: "white" }),
      addEventListener: (name, fn) => { windowEvents[name] = fn; },
    },
    document: {
      documentElement: { dataset },
      body: {},
      querySelector: selector => (selector === "#theme-btn" ? toggle : null),
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
    click: () => events.click({ target: toggle }),
    label: () => toggle["aria-label"],
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

test("the first visit starts light even when the system prefers dark", () => {
  const page = boot({}, { prefersDark: true });
  assert.deepEqual(page.initial, { theme: "light" });
  assert.equal(page.dataset.theme, "light");
  assert.equal(page.stored.has("theme"), false);
});

test("one click switches theme and updates the next action", () => {
  const page = boot();
  assert.equal(page.label(), "Switch to dark mode");
  page.click();
  assert.equal(page.dataset.theme, "dark");
  assert.equal(page.stored.get("theme"), "dark");
  assert.equal(page.label(), "Switch to light mode");

  page.click();
  assert.equal(page.dataset.theme, "light");
  assert.equal(page.stored.get("theme"), "light");
  assert.equal(page.label(), "Switch to dark mode");

  const reloaded = boot(Object.fromEntries(page.stored), { prefersDark: true });
  assert.equal(reloaded.initial.theme, "light");
});

test("a saved dark choice applies before paint and across navigation", () => {
  const page = boot({ theme: "dark" });
  const expected = { theme: "dark" };
  assert.deepEqual(page.initial, expected);
  assert.deepEqual(page.incomingPage(), expected);
});

test("blocked storage still lets visitors switch themes for the current visit", () => {
  const page = boot({}, { blocked: true });
  page.click();
  assert.equal(page.dataset.theme, "dark");
  assert.equal(page.incomingPage().theme, "dark");
});

test("legacy theme settings fall back to light", () => {
  const page = boot({
    theme: "system",
    "portfolio-dark-palette": "pine",
    "portfolio-text-tone": "warm",
  }, { prefersDark: true });
  assert.deepEqual(page.dataset, { theme: "light" });
  page.fromAnotherTab("portfolio-dark-palette", "navy");
  assert.deepEqual(page.dataset, { theme: "light" });
});

test("another tab's theme change is reflected", () => {
  const page = boot({ theme: "light" }, { prefersDark: true });
  page.fromAnotherTab("theme", "dark");
  assert.equal(page.dataset.theme, "dark");
  page.fromAnotherTab("theme", null);
  assert.equal(page.dataset.theme, "light");
});
