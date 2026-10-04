import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import test from "node:test";
import assert from "node:assert/strict";

function boot(stored = null, blocked = false) {
  const events = {}, mediaEvents = {}, attrs = {};
  const button = { setAttribute() {}, addEventListener(_, fn) { this.click = fn; } };
  const media = { matches: false, addEventListener(name, fn) { mediaEvents[name] = fn; } };
  const context = {
    localStorage: {
      getItem() { if (blocked) throw new Error("blocked"); return stored; },
      setItem(_, value) { if (blocked) throw new Error("blocked"); stored = value; },
    },
    window: { matchMedia: () => media, getComputedStyle: () => ({ backgroundColor: "white" }) },
    document: {
      documentElement: { lang: "en" }, body: {},
      firstElementChild: { setAttribute: (key, value) => { attrs[key] = value; } },
      querySelector: selector => selector === "#theme-btn" ? button : null,
      addEventListener: (name, fn) => { events[name] = fn; },
    },
  };
  const source = ts.transpileModule(readFileSync("src/scripts/theme.ts", "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  runInNewContext(source, context);
  return { attrs, button, events, mediaEvents, stored: () => stored };
}
test("OS changes never override a manual light choice", () => {
  const page = boot("light");
  page.mediaEvents.change({ matches: true });
  assert.equal(page.attrs["data-theme"], "light");
});
test("system following does not become a persisted manual choice", () => {
  const page = boot();
  page.mediaEvents.change({ matches: true });
  assert.equal(page.attrs["data-theme"], "dark");
  assert.equal(page.stored(), null);
});
test("blocked storage still permits toggling", () => {
  const page = boot(null, true);
  page.button.click();
  assert.equal(page.attrs["data-theme"], "dark");
});
test("invalid persisted theme falls back to system light", () => {
  assert.equal(boot("system").attrs["data-theme"], "light");
});
test("navigation receives the theme before document swap", () => {
  const page = boot("light");
  const attrs = {};
  page.events["astro:before-swap"]({ newDocument: {
    documentElement: { setAttribute: (key, value) => { attrs[key] = value; } },
    querySelector: () => null,
  } });
  assert.equal(attrs["data-theme"], "light");
});
