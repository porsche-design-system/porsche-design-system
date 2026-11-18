import type { HTMLTagOrComponent, Story } from '../../../src';
import { getStoryMarkup, wrapCode } from '../../../src';

const story: Story<HTMLTagOrComponent> = {
  state: { properties: { variant: 'primary' } },
  generator: ({ properties } = {}) => [{ tag: 'p-button', properties, children: ['Some label'] }],
};

describe('getStoryMarkup()', () => {
  it('should wrap the markup of every framework in an example file', () => {
    const markup = getStoryMarkup(story, { colorScheme: 'scheme-dark' });

    expect(Object.keys(markup).sort()).toEqual(['angular', 'react', 'vanilla-js', 'vue']);
    expect(markup['vanilla-js']).toContain('<html lang="en" class="scheme-dark">');
    expect(markup['vanilla-js']).toContain('<p-button variant="primary">\n  Some label\n</p-button>');
    expect(markup['vanilla-js']).not.toContain('<meta charset="utf-8" />');
    expect(markup.react).toContain('export const Example = () => {');
    expect(markup.angular).toContain('export class ExampleComponent');
    expect(markup.vue).toContain('<template>');
  });

  it('should generate the markup of the given state instead of the story state', () => {
    expect(getStoryMarkup(story, { state: { properties: { variant: 'secondary' } } })['vanilla-js']).toContain(
      '<p-button variant="secondary">'
    );
  });

  it('should generate a complete Vanilla JS document for a project', () => {
    expect(getStoryMarkup(story, { output: 'project' })['vanilla-js']).toContain('<meta charset="utf-8" />');
  });

  it('should generate only the markup for a snippet', () => {
    expect(getStoryMarkup(story, { output: 'snippet' })).toEqual({
      'vanilla-js': '<p-button variant="primary">\n  Some label\n</p-button>',
      angular: '<p-button variant="primary">\n  Some label\n</p-button>',
      react: '<PButton variant="primary">\n  Some label\n</PButton>',
      vue: '<PButton variant="primary">\n  Some label\n</PButton>',
    });
  });
});

describe('wrapCode()', () => {
  it('should wrap Vanilla JS markup and its script in a document', () => {
    const code = wrapCode(
      'vanilla-js',
      { markup: '<p-text>Some text</p-text>', script: 'console.warn(1);', scriptAttributes: 'type="module"' },
      { colorScheme: 'scheme-light-dark', output: 'project' }
    );

    expect(code).toContain('<html lang="en" class="scheme-light-dark">');
    expect(code).toContain('<meta charset="utf-8" />');
    expect(code).toContain('<p-text>Some text</p-text>\n<script type="module">\nconsole.warn(1);\n</script>');
  });

  it('should wrap markup in a component of the framework', () => {
    expect(wrapCode('react', { markup: '<PText>Some text</PText>' })).toContain('<PText>Some text</PText>');
    expect(wrapCode('angular', { markup: '<p-text>Some text</p-text>' })).toContain('template: `\n<p-text>');
    expect(wrapCode('vue', { markup: '<PText>Some text</PText>' })).toContain('<template>\n<PText>Some text</PText>');
  });
});
