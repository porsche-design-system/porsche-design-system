import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { isTemplateInput, readRootData, renderTemplate, type TemplateContext } from '../../plugins/nunjucks.ts';

const fixturesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../fixtures');

/** Mirrors what a page gets: `_data.json` as the base scope, optionally overridden by explicit values. */
const render = (source: string, context: TemplateContext = {}): string =>
  renderTemplate(source, { rootDir: fixturesDir, filePath: path.join(fixturesDir, 'page.html'), context });

describe('conditions', () => {
  it('renders the consequent when truthy', () => {
    expect(render('{% if enabled %}\nyes\n{% endif %}\n', { enabled: true })).toBe('yes\n');
  });

  it('renders nothing when falsy and there is no else branch', () => {
    expect(render('{% if enabled %}\nyes\n{% endif %}\n', { enabled: false })).toBe('');
  });

  it('renders the else branch when falsy', () => {
    expect(render('{% if enabled %}yes{% else %}no{% endif %}', { enabled: false })).toBe('no');
  });

  it('treats undefined and empty arrays as falsy', () => {
    expect(render('{% if missing %}x{% endif %}')).toBe('');
    expect(render('{% if items | length %}x{% endif %}', { items: [] })).toBe('');
  });

  it('supports negation', () => {
    expect(render('{% if not enabled %}x{% endif %}', { enabled: false })).toBe('x');
  });

  it('compares against a literal and against another variable', () => {
    expect(render('{% if page == "home" %}x{% endif %}', { page: 'home' })).toBe('x');
    expect(render('{% if page != "home" %}x{% endif %}', { page: 'home' })).toBe('');
    expect(render('{% if a == b %}x{% endif %}', { a: 'same', b: 'same' })).toBe('x');
  });

  it('resolves dotted paths, including missing intermediate objects', () => {
    expect(render('{% if user.active %}x{% endif %}', { user: { active: true } })).toBe('x');
    expect(render('{% if user.missing.deep %}x{% endif %}', { user: {} })).toBe('');
  });

  it('supports elif, which the in-house engine did not', () => {
    const source = '{% if n == 1 %}one{% elif n == 2 %}two{% else %}many{% endif %}';
    expect(render(source, { n: 2 })).toBe('two');
    expect(render(source, { n: 7 })).toBe('many');
  });
});

describe('loops', () => {
  const items = [{ label: 'One' }, { label: 'Two' }];

  it('repeats its body for every item', () => {
    expect(render('{% for item in items %}<li>{{ item.label }}</li>\n{% endfor %}', { items })).toBe(
      '<li>One</li>\n<li>Two</li>\n'
    );
  });

  it('exposes loop metadata', () => {
    const source = '{% for item in items %}{{ loop.index }}/{{ loop.length }}:{{ loop.last }};{% endfor %}';
    expect(render(source, { items })).toBe('1/2:false;2/2:true;');
  });

  it('renders nothing for an empty array', () => {
    expect(render('{% for item in items %}x{% endfor %}', { items: [] })).toBe('');
  });

  it('nests conditions inside the loop', () => {
    const source = '{% for item in items %}{% if item.label == "One" %}first{% else %}other{% endif %}{% endfor %}';
    expect(render(source, { items })).toBe('firstother');
  });

  it('nests loops', () => {
    const source = '{% for group in groups %}{% for item in group.items %}{{ item }}{% endfor %}{% endfor %}';
    expect(render(source, { groups: [{ items: ['a', 'b'] }, { items: ['c'] }] })).toBe('abc');
  });

  it('keeps the outer scope available inside the loop', () => {
    expect(render('{% for item in items %}{{ prefix }}{{ item.label }};{% endfor %}', { items, prefix: '#' })).toBe(
      '#One;#Two;'
    );
  });

  it('strips the indentation and the line break of a tag on its own line', () => {
    const source = '<ul>\n  {% for item in items %}\n  <li>{{ item.label }}</li>\n  {% endfor %}\n</ul>\n';
    expect(render(source, { items })).toBe('<ul>\n  <li>One</li>\n  <li>Two</li>\n</ul>\n');
  });

  it('supports an else branch for empty arrays, which the in-house engine did not', () => {
    expect(render('{% for item in items %}x{% else %}empty{% endfor %}', { items: [] })).toBe('empty');
  });
});

describe('includes and macros', () => {
  it('includes a partial with the surrounding scope', () => {
    expect(render('{% include "_partials/nav.njk" %}')).toBe('Shared A;Shared B;');
  });

  it('calls a macro once per loop iteration with the iteration values', () => {
    const source =
      '{% from "_partials/card.njk" import card %}{% for item in items %}{{ card(item.label) }}{% endfor %}';
    expect(render(source, { items: [{ label: 'One' }, { label: 'Two' }] })).toBe('<p>One</p><p>Two</p>');
  });

  it('skips an include that sits in a branch which is not taken', () => {
    expect(render('{% if false %}{% include "_partials/missing.njk" %}{% endif %}ok')).toBe('ok');
  });

  it('re-indents an inlined macro through the indent filter', () => {
    const source = '{% from "_partials/card.njk" import card %}  {{ card("One") | trim | indent(2) }}';
    expect(render(source)).toBe('  <p>One</p>');
  });
});

describe('placeholders', () => {
  it('substitutes dotted paths and non string values', () => {
    expect(render('{{ user.name }} is {{ user.age }}', { user: { name: 'Ada', age: 36 } })).toBe('Ada is 36');
  });

  it('escapes values by default and honours the safe filter', () => {
    expect(render('{{ value }}', { value: '<b>&</b>' })).toBe('&lt;b&gt;&amp;&lt;/b&gt;');
    expect(render('{{ value | safe }}', { value: '<b>&</b>' })).toBe('<b>&</b>');
  });

  it('fails on an unknown placeholder instead of rendering an empty string', () => {
    expect(() => render('{{ missing }}')).toThrow(/attempted to output null or undefined value/);
  });
});

describe('scope precedence', () => {
  it('uses _data.json as the base scope of a page', () => {
    expect(render('{{ brand }}: {% include "_partials/nav.njk" %}')).toBe('Shared brand: Shared A;Shared B;');
  });

  it('lets a page level set replace a _data.json value wholesale, arrays included', () => {
    const source = '{% set navItems = [{ "label": "Local" }] %}{{ brand }}: {% include "_partials/nav.njk" %}';
    expect(render(source)).toBe('Shared brand: Local;');
  });

  it('keeps _data.json keys that the page does not define', () => {
    expect(render('{% set title = "Local" %}{{ title }}/{{ brand }}')).toBe('Local/Shared brand');
  });

  it('applies multiple set tags in document order', () => {
    expect(render('{% set title = "First" %}{% set title = "Second" %}{{ title }}')).toBe('Second');
  });

  it('lets a macro argument override the surrounding scope', () => {
    const source = '{% from "_partials/card.njk" import card %}{{ card("Inline") }}';
    expect(render(source, { label: 'Outer' })).toBe('<p>Inline</p>');
  });
});

describe('layout inheritance', () => {
  it('fills a block of the extended layout', () => {
    expect(render('{% extends "_layouts/base.njk" %}{% set title = "T" %}{% block content %}body{% endblock %}')).toBe(
      '[T|body]\n'
    );
  });

  it('falls back to the default block content', () => {
    expect(render('{% extends "_layouts/base.njk" %}{% set title = "T" %}')).toBe('[T|fallback]\n');
  });

  it('makes page level set values visible to the layout', () => {
    expect(render('{% extends "_layouts/base.njk" %}{% set title = "Page" %}')).toContain('[Page|');
  });
});

describe('errors', () => {
  it('rejects an unclosed block', () => {
    expect(() => render('{% if enabled %}x', { enabled: true })).toThrow(/expected elif, else, or endif/);
  });

  it('rejects a stray endif', () => {
    expect(() => render('{% endif %}')).toThrow(/unknown block tag: endif/);
  });

  it('rejects a mismatched closing tag', () => {
    expect(() => render('{% for item in items %}x{% endif %}', { items: [] })).toThrow(/unknown block tag: endif/);
  });

  it('rejects invalid loop syntax', () => {
    expect(() => render('{% for nonsense %}x{% endfor %}')).toThrow(/expected "in"/);
  });

  it('rejects an empty condition', () => {
    expect(() => render('{% if %}x{% endif %}')).toThrow(/unexpected token/);
  });

  it('rejects a missing template', () => {
    expect(() => render('{% include "_partials/missing.njk" %}')).toThrow(/template not found/);
  });

  it('names the file that failed to render', () => {
    expect(() => render('{{ missing }}')).toThrow(/Failed to render "page.html"/);
  });
});

describe('inputs', () => {
  it('reads the shared data file', () => {
    expect(readRootData(fixturesDir)).toMatchObject({ brand: 'Shared brand' });
  });

  it('returns an empty scope when there is no data file', () => {
    expect(readRootData(path.join(fixturesDir, '_partials'))).toEqual({});
  });

  it('treats underscore prefixed files and folders as inputs, never pages', () => {
    expect(isTemplateInput(fixturesDir, path.join(fixturesDir, '_data.json'))).toBe(true);
    expect(isTemplateInput(fixturesDir, path.join(fixturesDir, '_partials/nav.njk'))).toBe(true);
    expect(isTemplateInput(fixturesDir, path.join(fixturesDir, 'landing-page/index.html'))).toBe(false);
  });
});
