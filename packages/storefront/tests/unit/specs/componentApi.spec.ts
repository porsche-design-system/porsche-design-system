import { describe, expect, it } from 'vitest';
import { renderComponentApi } from '@/lib/skill/componentApi';
import { componentApiFixtures } from '../data/skill/componentApiFixtures';

const { 'p-accordion': accordion, 'p-heading': heading } = componentApiFixtures;

describe('renderComponentApi', () => {
  it('renders the full API section for a component with props, events, slots and CSS variables', () => {
    expect(renderComponentApi(accordion, 'js')).toMatchSnapshot();
  });

  it('renders the API section for a component whose props carry deprecated values', () => {
    expect(renderComponentApi(heading, 'js')).toMatchSnapshot();
  });

  it('only emits tables that have entries', () => {
    const markdown = renderComponentApi(heading, 'js');
    expect(markdown).toContain('### Properties');
    expect(markdown).not.toContain('### Events');
    expect(markdown).toContain('### Slots');
    expect(markdown).not.toContain('### CSS Variables');
  });

  describe('raw-meta link', () => {
    it('links the local `../meta` sibling for the js skill', () => {
      expect(renderComponentApi(accordion, 'js')).toContain('`../meta`');
    });

    it('links the js peer `/meta` subpath for framework skills', () => {
      for (const framework of ['angular', 'react', 'vue'] as const) {
        const markdown = renderComponentApi(accordion, framework);
        expect(markdown).toContain('`@porsche-design-system/components-js/meta`');
        expect(markdown).not.toContain('`../meta`');
      }
    });
  });

  describe('deprecation handling', () => {
    it('flags fully deprecated props, slots and uses no deprecated recommended values', () => {
      const markdown = renderComponentApi(accordion, 'js');
      // deprecated prop / slot rows are kept but marked
      expect(markdown).toMatch(/`size`.*_\(deprecated\)_/);
      expect(markdown).toMatch(/`heading`.*_\(deprecated\)_/);
      // experimental and required-style flags surface too
      expect(markdown).toMatch(/`sticky`.*_\(experimental\)_/);
    });

    it('never lists a deprecated value as a recommended value', () => {
      const markdown = renderComponentApi(heading, 'js');
      // every prop row keeps its recommended values before the `deprecated:` divider
      for (const line of markdown.split('\n').filter((l: string) => l.includes('_deprecated:_'))) {
        const [recommended, deprecated] = line.split('_deprecated:_');
        for (const value of ['small', 'medium', 'large', 'x-large', 'xx-large', 'regular', 'semi-bold']) {
          expect(recommended, `recommended values must not contain deprecated '${value}'`).not.toContain(`'${value}'`);
        }
        // the deprecated values are still documented, just on the deprecated side
        expect(deprecated).toBeTruthy();
      }
      // a known recommended (non-deprecated) value is still present
      expect(markdown).toContain("`'2xs'`");
      expect(markdown).toContain("`'semibold'`");
    });
  });
});
