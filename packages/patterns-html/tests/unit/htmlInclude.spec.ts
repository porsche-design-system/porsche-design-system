import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { expandIncludes, type IncludeProps } from '../../plugins/htmlInclude.ts';

const fixturesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../fixtures');

const render = (html: string, props: IncludeProps = {}): string =>
  expandIncludes(html, { rootDir: fixturesDir, filePath: path.join(fixturesDir, 'page.html'), props });

/** Omits `props`, so the scope starts from `tests/fixtures/_data.json` – like a real page does. */
const renderPage = (html: string): string =>
  expandIncludes(html, { rootDir: fixturesDir, filePath: path.join(fixturesDir, 'page.html') });

describe('@if', () => {
  it('renders the consequent when truthy', () => {
    expect(render('<!-- @if enabled -->\nyes\n<!-- @endif -->\n', { enabled: true })).toBe('yes\n');
  });

  it('renders nothing when falsy and there is no @else', () => {
    expect(render('<!-- @if enabled -->\nyes\n<!-- @endif -->\n', { enabled: false })).toBe('');
  });

  it('renders the @else branch when falsy', () => {
    const html = '<!-- @if enabled -->\nyes\n<!-- @else -->\nno\n<!-- @endif -->\n';
    expect(render(html, { enabled: false })).toBe('no\n');
  });

  it('treats undefined and empty arrays as falsy', () => {
    expect(render('<!-- @if missing -->x<!-- @endif -->', {})).toBe('');
    expect(render('<!-- @if items -->x<!-- @endif -->', { items: [] })).toBe('');
  });

  it('supports negation', () => {
    expect(render('<!-- @if !enabled -->x<!-- @endif -->', { enabled: false })).toBe('x');
  });

  it('compares against a literal and against another path', () => {
    expect(render('<!-- @if page == "home" -->x<!-- @endif -->', { page: 'home' })).toBe('x');
    expect(render('<!-- @if page != "home" -->x<!-- @endif -->', { page: 'home' })).toBe('');
    expect(render('<!-- @if a == b -->x<!-- @endif -->', { a: 'same', b: 'same' })).toBe('x');
  });

  it('resolves dotted paths', () => {
    expect(render('<!-- @if user.active -->x<!-- @endif -->', { user: { active: true } })).toBe('x');
    expect(render('<!-- @if user.missing.deep -->x<!-- @endif -->', { user: {} })).toBe('');
  });
});

describe('@each', () => {
  const items = [{ label: 'One' }, { label: 'Two' }];

  it('repeats its body for every item', () => {
    const html = '<!-- @each item in items -->\n<li>{{ item.label }}</li>\n<!-- @endeach -->\n';
    expect(render(html, { items })).toBe('<li>One</li>\n<li>Two</li>\n');
  });

  it('exposes loop metadata', () => {
    const html = '<!-- @each item in items -->{{ loop.number }}/{{ loop.length }}:{{ loop.last }};<!-- @endeach -->';
    expect(render(html, { items })).toBe('1/2:false;2/2:true;');
  });

  it('renders nothing for an empty array', () => {
    expect(render('<!-- @each item in items -->x<!-- @endeach -->', { items: [] })).toBe('');
  });

  it('nests conditions inside the loop', () => {
    const html =
      '<!-- @each item in items --><!-- @if item.label == "One" -->first<!-- @else -->other<!-- @endif --><!-- @endeach -->';
    expect(render(html, { items })).toBe('firstother');
  });

  it('nests loops', () => {
    const html =
      '<!-- @each group in groups --><!-- @each item in group.items -->{{ item }}<!-- @endeach --><!-- @endeach -->';
    expect(render(html, { groups: [{ items: ['a', 'b'] }, { items: ['c'] }] })).toBe('abc');
  });

  it('keeps the outer scope available inside the loop', () => {
    const html = '<!-- @each item in items -->{{ prefix }}{{ item.label }};<!-- @endeach -->';
    expect(render(html, { items, prefix: '#' })).toBe('#One;#Two;');
  });

  it('strips the indentation and the line break of the directive itself', () => {
    const html = '<ul>\n  <!-- @each item in items -->\n  <li>{{ item.label }}</li>\n  <!-- @endeach -->\n</ul>\n';
    expect(render(html, { items })).toBe('<ul>\n  <li>One</li>\n  <li>Two</li>\n</ul>\n');
  });

  it('throws when the path is not an array', () => {
    expect(() => render('<!-- @each item in items -->x<!-- @endeach -->', { items: 'nope' })).toThrow(
      /@each expects an array/
    );
  });
});

describe('includes', () => {
  it('expands a partial once per loop iteration with the iteration scope', () => {
    const html = '<!-- @each item in items -->\n<!-- @include _partials/card.html -->\n<!-- @endeach -->\n';
    expect(render(html, { items: [{ label: 'One' }, { label: 'Two' }] })).toBe('<p>One</p>\n<p>Two</p>\n');
  });

  it('skips an include that sits in a branch which is not taken', () => {
    const html = '<!-- @if false -->\n<!-- @include _partials/missing.html -->\n<!-- @endif -->ok';
    expect(render(html, {})).toBe('ok');
  });
});

describe('placeholders', () => {
  it('substitutes dotted paths and non string values', () => {
    expect(render('{{ user.name }} is {{ user.age }}', { user: { name: 'Ada', age: 36 } })).toBe('Ada is 36');
  });

  it('throws when a placeholder resolves to an object', () => {
    expect(() => render('{{ user }}', { user: { name: 'Ada' } })).toThrow(/resolves to an object/);
  });
});

describe('scope precedence', () => {
  it('uses _data.json as the base scope of a page', () => {
    expect(renderPage('{{ brand }}: <!-- @include _partials/nav.html -->')).toBe('Shared brand: Shared A;Shared B;');
  });

  it('lets @props replace a _data.json value wholesale, arrays included', () => {
    const html =
      '<!-- @props { "navItems": [{ "label": "Local" }] } -->{{ brand }}: <!-- @include _partials/nav.html -->';
    // The shared entries are gone – props are shallow-merged, so there is no deep merge and no append.
    expect(renderPage(html)).toBe('Shared brand: Local;');
  });

  it('keeps _data.json keys that @props does not define', () => {
    expect(renderPage('<!-- @props { "title": "Local" } -->{{ title }}/{{ brand }}')).toBe('Local/Shared brand');
  });

  it('merges multiple @props directives in document order', () => {
    const html = '<!-- @props { "title": "First" } --><!-- @props { "title": "Second" } -->{{ title }}';
    expect(renderPage(html)).toBe('Second');
  });

  it('lets inline include props override the file level ones', () => {
    const html =
      '<!-- @props { "navItems": [{ "label": "File" }] } --><!-- @include _partials/nav.html { "navItems": [{ "label": "Inline" }] } -->';
    expect(renderPage(html)).toBe('Inline;');
  });
});

describe('errors', () => {
  it('rejects an unclosed block', () => {
    expect(() => render('<!-- @if enabled -->x', { enabled: true })).toThrow(/Unclosed @if/);
  });

  it('rejects a stray @endif', () => {
    expect(() => render('<!-- @endif -->')).toThrow(/@endif without matching @if/);
  });

  it('rejects a mismatched closing tag', () => {
    expect(() => render('<!-- @each item in items -->x<!-- @endif -->', { items: [] })).toThrow(
      /@endif without matching @if/
    );
  });

  it('rejects invalid @each syntax', () => {
    expect(() => render('<!-- @each nonsense -->x<!-- @endeach -->')).toThrow(/Invalid @each/);
  });

  it('rejects an empty condition', () => {
    expect(() => render('<!-- @if -->x<!-- @endif -->')).toThrow(/Empty @if condition/);
  });
});
