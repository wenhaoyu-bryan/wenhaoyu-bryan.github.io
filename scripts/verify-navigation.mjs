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
test('methodology and About link to the integrated introduction, not the old standalone manifesto', () => {
  for (const route of ['playbook', 'about']) {
    const html = read(route);
    assert.ok(!html.includes('href="/AI-PM-Manifesto/"'), route);
    assert.ok(html.includes('href="/about/manifesto/"'), route);
  }
  for (const route of ['zh/playbook', 'zh/about']) {
    const html = read(route);
    assert.ok(!html.includes('href="/AI-PM-Manifesto/"'), route);
    assert.match(html, /href="\/zh\/one-page\/?"/, route);
  }
});
test('About separates AI tools from engineering stack in both locales', () => {
  for (const route of ['about','zh/about']) assert.ok(read(route).includes('tool-stack-columns'));
});
