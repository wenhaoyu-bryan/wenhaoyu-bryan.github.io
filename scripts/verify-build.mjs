#!/usr/bin/env node
/* eslint-disable no-console -- CLI test reporter; console output is the point */
/**
 * Build-verification test for the site iteration (AI Stack, Now, llms.txt,
 * Ask-AI buttons, analytics wiring). Run after `pnpm build`:
 *
 *   node scripts/verify-build.mjs
 *
 * Asserts (1) every expected page/endpoint was emitted, (2) new pages contain
 * their key markers, (3) the llms files are well-formed, and (4) no private /
 * employer-confidential term leaked into any HTML or text output.
 *
 * Exits non-zero on the first failed assertion so it can gate a merge.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const failures = [];
const pass = [];

function assert(cond, msg) {
  if (cond) pass.push(msg);
  else failures.push(msg);
}

function read(rel) {
  const p = join(DIST, rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// 1. Expected outputs exist
const expectedFiles = [
  "ai-stack/index.html",
  "zh/ai-stack/index.html",
  "now/index.html",
  "zh/now/index.html",
  "llms.txt",
  "llms-full.txt",
];
for (const f of expectedFiles) {
  assert(existsSync(join(DIST, f)), `emitted: ${f}`);
}

// 2. Page content markers
const aiStack = read("ai-stack/index.html") ?? "";
assert(
  /Agent Platform Product Design/.test(aiStack),
  "ai-stack has 0-to-1 agent platform section"
);
assert(
  /Honest Capability Boundaries/.test(aiStack),
  "ai-stack has capability boundaries section"
);

const now = read("now/index.html") ?? "";
assert(/Recently Shipped/.test(now), "now has Recently Shipped section");
assert(/Last updated/.test(now), "now shows last-updated date");

// 3. llms files well-formed
const llms = read("llms.txt") ?? "";
assert(llms.startsWith("# Wenhao Yu"), "llms.txt has title heading");
assert(/llms-full\.txt/.test(llms), "llms.txt points at llms-full.txt");
assert(/## Writing/.test(llms), "llms.txt lists Writing");
assert(
  /https:\/\/wenhaoyu-bryan\.github\.io\/posts\//.test(llms),
  "llms.txt has absolute post URLs"
);

const llmsFull = read("llms-full.txt") ?? "";
assert(llmsFull.length > 3000, "llms-full.txt has substantial content");
assert(/## About/.test(llmsFull), "llms-full.txt includes About");
assert(/## Projects/.test(llmsFull), "llms-full.txt includes Projects");
assert(/## Writing/.test(llmsFull), "llms-full.txt includes Writing bodies");

// 4. Ask-AI deep links present on homepage
const home = read("index.html") ?? "";
assert(
  /claude\.ai\/new\?q=/.test(home),
  "homepage has Ask-Claude deep link"
);
assert(
  /chatgpt\.com\/\?q=/.test(home),
  "homepage has Ask-ChatGPT deep link"
);

// 5. Leak scan across all HTML + TXT output
const risky = [
  // literal private strings
  "章鱼",
  "格创",
  "gtrontec",
  "东智",
  "hermes",
  "gbrain",
  "openclaw",
  "workbuddy",
  "kubo",
  "reyoung",
  "shopify",
  "electron", // guard n/a but harmless
  "电商",
  "选品",
  "半导体",
  "光伏",
  "锂电",
  "晶片",
  "面板",
  "qihang",
  "minimax",
];
// short tokens that need word boundaries to avoid false positives
const riskyWord = [/\bMES\b/, /\bEMS\b/, /\bTCL\b/, /\bVben\b/i, /\bMiMo\b/];

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else if (/\.(html|txt)$/.test(name)) files.push(full);
  }
  return files;
}

const scanFiles = walk(DIST);
const leaks = [];
for (const file of scanFiles) {
  const content = readFileSync(file, "utf8");
  const lower = content.toLowerCase();
  for (const term of risky) {
    if (lower.includes(term.toLowerCase())) {
      leaks.push(`${file.replace(DIST, "")} :: "${term}"`);
    }
  }
  for (const re of riskyWord) {
    if (re.test(content)) {
      leaks.push(`${file.replace(DIST, "")} :: ${re}`);
    }
  }
}
assert(
  leaks.length === 0,
  `no sensitive-term leaks (scanned ${scanFiles.length} files)`
);

// Report
console.log(`\n✓ ${pass.length} checks passed`);
if (leaks.length) {
  console.log("\nLEAKS FOUND:");
  for (const l of leaks) console.log("  " + l);
}
if (failures.length) {
  console.log(`\n✗ ${failures.length} checks FAILED:`);
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}
console.log("\nAll build-verification checks passed.\n");
