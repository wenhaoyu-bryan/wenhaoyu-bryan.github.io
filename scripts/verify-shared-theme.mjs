import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const read = path => readFileSync(path, "utf8");
const theme = read("src/styles/theme.css");
const layout = read("src/layouts/Layout.astro");
for (const [scheme, background] of [["light", "#f6f8fd"], ["dark", "#17191f"]]) {
  assert.ok(theme.includes(`--background: ${background}`), `shared ${scheme} palette`);
  assert.match(layout, new RegExp(`content="${background}"\\s+media="\\(prefers-color-scheme: ${scheme}\\)"`));
}
assert.match(theme, /\[data-theme="dark"\]\s*\{[^}]*--foreground: #ced7e6/);
assert.doesNotMatch(theme, /\[data-(palette|text-tone)=/);
assert.ok(!read("src/styles/home.css").includes("--background:"), "homepage must not own a second palette");
assert.ok(read("src/styles/global.css").includes('"./site-shell.css"'), "shared shell loaded on every page");
assert.ok(read("src/styles/site-shell.css").includes("flex-wrap: nowrap"), "desktop navigation stays on one row");
process.stdout.write("Shared theme regression checks passed\n");
