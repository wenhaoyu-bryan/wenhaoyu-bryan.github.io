import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const playbookProject = read("src/data/projects.ts").split('title: "AI PM Operating Playbook"')[1]?.split('\n  },')[0] ?? "";

test("Playbook project leads into the personal-site methodology, while preserving its source repo", () => {
  assert.match(playbookProject, /path: "playbook"/);
  assert.match(playbookProject, /repo: "https:\/\/github\.com\/wenhaoyu-bryan\/AI-PM-Operating-Playbook"/);
  assert.doesNotMatch(playbookProject, /url: "https:\/\/wenhaoyu-bryan\.github\.io\/AI-PM-Operating-Playbook/);
});

test("homepage presents the experiment on the personal site", () => {
  const home = read("src/components/home/HomePage.astro");
  assert.match(home, /href=\{playbook\.href\}/);
  assert.match(home, /<PlaybookExample locale=\{locale\} compact \/>/);
});

for (const [locale, path, workbenchPath] of [
  ["en", "src/pages/playbook.astro", "/en/workbench/"],
  ["zh", "src/pages/zh/playbook.astro", "/zh-CN/workbench/"],
]) {
  test(`${locale} methodology owns the example and treats the workbench as optional`, () => {
    const page = read(path);
    assert.match(page, /<PlaybookExample locale=/);
    assert.ok(page.includes(workbenchPath));
    assert.match(page, /getRelativeLocaleUrl\([^)]*, "projects\/prompt-to-ontology"\)/);
  });
}

test("the example ties a real public prototype to concrete, reviewable outputs", () => {
  const component = read("src/components/PlaybookExample.astro");
  assert.match(component, /Prompt-to-Ontology/);
  assert.match(component, /CSV/);
  assert.match(component, /324/);
  assert.match(component, /review|审核/i);
  assert.doesNotMatch(component, /\.compact \.example-output li:not\(:first-child\)\s*\{\s*display:\s*none/);
});
