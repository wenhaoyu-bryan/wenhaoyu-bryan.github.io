import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
test("only two public builds are featured as projects", () => {
  const projects = read("src/data/projects.ts");
  const home = read("src/components/home/HomePage.astro");
  const manifesto = read("src/pages/about/manifesto.astro");
  assert.doesNotMatch(projects, /title: "AI PM Operating Playbook"/);
  assert.match(projects, /title: "SEO\/GEO Growth Experiments"[\s\S]*?listed: false/);
  assert.doesNotMatch(home, /project-playbook|PlaybookExample|kind="playbook"/);
  assert.doesNotMatch(manifesto, /AI PM Operating Playbook/);
  assert.match(home, /kind="ontology"/);
  assert.match(home, /kind="agent"/);
  assert.match(home, /getBuilds\(locale\)\.find\(\s*project => project\.title === "SEO\/GEO Growth Experiments"/);
});

test("the main site retains the useful handoff and review method in both languages", () => {
  for (const [page, marker] of [
    ["src/pages/playbook.astro", "Review the handoff"],
    ["src/pages/zh/playbook.astro", "交付前检查"],
  ]) {
    const source = read(page);
    assert.match(source, /<PlaybookExample locale=/);
    assert.ok(source.includes(marker), page);
    assert.match(source, /evidence|证据/i);
    assert.match(source, /review|审核/i);
    assert.doesNotMatch(source, /AI-PM-Operating-Playbook|WORKBENCH_URL/);
  }
});

test("portfolio content no longer sends visitors to the standalone tool", () => {
  for (const page of [
    "src/pages/ai-stack.astro",
    "src/pages/zh/ai-stack.astro",
    "src/pages/playbook/vibe-coding.astro",
    "src/pages/zh/playbook/vibe-coding.astro",
    "src/pages/playbook/harness-engineering.astro",
    "src/pages/zh/playbook/harness-engineering.astro",
    "src/pages/playbook/loop-engineering.astro",
    "src/pages/zh/playbook/loop-engineering.astro",
    "src/content/posts/three-frameworks-ai-assisted-product-delivery.md",
  ]) {
    assert.doesNotMatch(read(page), /AI-PM-Operating-Playbook/, page);
  }
  assert.doesNotMatch(read("src/pages/posts/index.astro"), /methodology playbook/i);
  assert.doesNotMatch(read("src/pages/zh/about.astro"), /Playbook/);
});
