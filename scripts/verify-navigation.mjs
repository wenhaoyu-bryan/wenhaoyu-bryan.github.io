import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
const read = p => readFileSync(`dist/${p}/index.html`, 'utf8');
test('methodology breadcrumbs retain the Thinking parent in both locales', () => {
  for (const prefix of ['', 'zh/']) {
    for (const route of ['playbook', 'playbook/loop-engineering']) {
      const nav = read(prefix + route).match(/<nav[^>]*aria-label="breadcrumb"[\s\S]*?<\/nav>/)?.[0] ?? '';
      assert.ok(nav.includes(`href="/${prefix}posts/"`), route);
    }
  }
});
test('articles use breadcrumbs rather than a history-dependent back button', () => {
  const html = read('posts/why-ai-pms-should-learn-vibe-coding');
  assert.ok(html.includes('aria-label="breadcrumb"'));
  assert.ok(!html.includes('id="back-button"'));
});
test('manifesto links resolve to the separately deployed site, not a missing local route', () => {
  for (const route of ['playbook','zh/playbook','about','zh/about']) {
    const html = read(route);
    assert.ok(!html.includes('href="/AI-PM-Manifesto/"'), route);
    assert.ok(html.includes('href="https://wenhaoyu-bryan.github.io/AI-PM-Manifesto/"'), route);
  }
});
test('About separates AI tools from engineering stack in both locales', () => {
  for (const route of ['about','zh/about']) assert.ok(read(route).includes('tool-stack-columns'));
});
