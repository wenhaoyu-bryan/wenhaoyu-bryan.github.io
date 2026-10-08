import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";

test("both homepages expose a static scene, two project covers and playback controls", () => {
  for (const prefix of ["", "zh/"]) {
    const html = readFileSync(`dist/${prefix}index.html`, "utf8");
    assert.ok(html.includes("data-atelier-hero"), "homepage includes the atelier scene");
    assert.equal((html.match(/data-lens-button=/g) ?? []).length, 4);
    assert.equal((html.match(/data-project-cover=/g) ?? []).length, 2);
    assert.ok(html.includes(prefix ? "概念演示" : "Concept demonstration"));
    assert.ok(html.includes("data-playback"));
    assert.ok(html.includes("data-replay"));
    assert.ok(html.includes('data-stage="3"'), "no-script visitors get the complete scene");
  }
});
