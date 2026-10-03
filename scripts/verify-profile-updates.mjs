import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";

const read = path => readFileSync(`dist/${path}`, "utf8");

test("Chinese header uses Chinese navigation", () => {
  const header = read("zh/index.html").match(/<header[\s\S]*?<\/header>/)[0];
  for (const label of ["工作", "项目", "思考", "关于"]) assert.ok(header.includes(label), label);
  assert.ok(!/>\s*(Work|Projects|Thinking|About)\s*</.test(header));
});

test("ontology work is linked from both homepages and work indexes", () => {
  for (const prefix of ["", "zh/"]) {
    const route = `/${prefix}work/ontology-platform/`;
    for (const page of ["index.html", "work/index.html"]) {
      assert.ok(read(prefix + page).includes(route.replace(/\/$/, "")), prefix + page);
    }
    assert.ok(read(prefix + "index.html").includes(prefix ? "本体系统" : "Ontology systems"));
  }
});

test("ontology case study is bilingual and clear about contribution and status", () => {
  for (const prefix of ["", "zh/"]) {
    const path = `${prefix}work/ontology-platform/index.html`;
    assert.ok(existsSync(`dist/${path}`), path);
    const html = read(path);
    const breadcrumb = html.match(/<nav[^>]*aria-label="breadcrumb"[\s\S]*?<\/nav>/)?.[0] ?? "";
    assert.ok(breadcrumb.includes(prefix ? "本体平台" : "Ontology Platform"), "localized ontology breadcrumb");
    assert.ok(html.includes("DDL"));
    for (const marker of ["Codex", "Evidence Packet", prefix ? "工作片段" : "Work in practice", prefix ? "合成数据" : "synthetic data"]) {
      assert.ok(html.includes(marker), `ontology evidence: ${marker}`);
    }
    assert.ok(html.includes(prefix ? "参与产品设计与研发" : "contribute to product design and development"));
    assert.ok(html.includes(prefix ? "探索中" : "in progress"));
    assert.ok(!/semantica/i.test(html));
    assert.ok(html.includes('hreflang="zh"'));
    assert.ok(html.includes('hreflang="en"'));
  }
});

test("new WY favicon is served with a cache revision", () => {
  assert.ok(read("favicon.svg").includes("WY"));
  assert.ok(!read("favicon.svg").includes("<rect"));
  assert.ok(read("favicon.svg").includes("prefers-color-scheme"));
  assert.ok(read("zh/index.html").includes("favicon.svg?v=wy-2"));
});
