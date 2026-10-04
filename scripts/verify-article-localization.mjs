import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
const read = path => readFileSync(`dist/${path}`, "utf8");
test("ontology essay has a complete Chinese mirror and reciprocal links", () => {
  const path = "zh/posts/building-ontology-os/index.html";
  assert.ok(existsSync(`dist/${path}`), "Chinese article must be generated");
  const zh = read(path), en = read("posts/building-ontology-os/index.html");
  for (const heading of ["问题从哪里开始", "什么是 Ontology OS", "关键技术决策", "事实表应建模为节点"]) assert.ok(zh.includes(heading), heading);
  assert.ok(zh.includes('"inLanguage":"zh-CN"'));
  assert.ok(en.includes('href="/zh/posts/building-ontology-os/"'));
  assert.ok(zh.includes('href="/posts/building-ontology-os/"'));
  for (const hub of ["zh/index.html", "zh/posts/index.html"]) assert.ok(read(hub).includes('href="/zh/posts/building-ontology-os/"'));
  assert.ok(zh.includes("post-reading"));
});
