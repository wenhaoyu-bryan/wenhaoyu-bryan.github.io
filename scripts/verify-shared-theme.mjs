import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const read = path => readFileSync(path, "utf8");
assert.ok(read("src/styles/theme.css").includes("#182127"), "shared dark palette must match the approved homepage");
assert.ok(read("src/styles/theme.css").includes("#f8f9f6"), "shared light palette");
assert.ok(!read("src/styles/home.css").includes("--background:"), "homepage must not own a second palette");
assert.ok(read("src/styles/global.css").includes('"./site-shell.css"'), "shared shell loaded on every page");
assert.ok(read("src/styles/site-shell.css").includes("flex-wrap: nowrap"), "desktop navigation stays on one row");
process.stdout.write("Shared theme regression checks passed\n");
