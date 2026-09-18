import { renderA11yIntegrationExamples, resolvePayload } from '@skills/knowledge/components/accessibility';
import { FRAMEWORKS } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';
import type { AccessibilityExample, ExampleMarkupSample } from '@/models/accessibilityMeta';

const hiddenLabel: AccessibilityExample = {
  name: 'Hidden label without accessible name',
  antiPattern: {
    kind: 'story',
    story: { generator: () => [{ tag: 'p-checkbox', properties: { name: 'terms', hideLabel: true } }] },
  },
  recommended: {
    kind: 'story',
    story: {
      generator: () => [
        {
          tag: 'p-checkbox',
          properties: { name: 'terms', hideLabel: true, label: 'I accept the terms and conditions' },
        },
      ],
    },
  },
};

const codeSample: ExampleMarkupSample = {
  frameworkMarkup: {
    'vanilla-js': '<p-checkbox name="terms"></p-checkbox>',
    react: '<PCheckbox name="terms" />',
    angular: '<p-checkbox name="terms"></p-checkbox>',
    vue: '<PCheckbox name="terms" />',
  },
};

describe('renderA11yIntegrationExamples', () => {
  it('omits the section for an empty map', () => {
    expect(renderA11yIntegrationExamples('p-checkbox', {}, 'js')).toBe('');
  });

  it('renders the section, heading, and anti-pattern/recommended labels in order', () => {
    const markdown = renderA11yIntegrationExamples('p-checkbox', { hiddenLabel }, 'js');
    const headingIndex = markdown.indexOf('## Integration examples');
    const nameIndex = markdown.indexOf('### Hidden label without accessible name');
    const antiIndex = markdown.indexOf('#### ❌ Anti-pattern');
    const recommendedIndex = markdown.indexOf('#### ✅ Recommended');

    expect(headingIndex).toBeGreaterThanOrEqual(0);
    expect(nameIndex).toBeGreaterThan(headingIndex);
    expect(antiIndex).toBeGreaterThan(nameIndex);
    expect(recommendedIndex).toBeGreaterThan(antiIndex);
  });

  it.each([
    ['js', 'html'],
    ['angular', 'html'],
    ['react', 'tsx'],
    ['vue', 'html'],
  ] as const)('uses the %s fence language for %s', (framework, fence) => {
    const markdown = renderA11yIntegrationExamples('p-checkbox', { hiddenLabel }, framework);
    expect(markdown).toContain(`\`\`\`${fence}`);
  });

  it('resolves an authored markup sample to its exact framework markup', () => {
    const example: AccessibilityExample = {
      name: 'Imperative example',
      antiPattern: { kind: 'example', example: codeSample },
      recommended: { kind: 'example', example: codeSample },
    };
    for (const framework of FRAMEWORKS) {
      const markup = resolvePayload(example.antiPattern, framework, 'p-checkbox', 'imperative', 'antiPattern');
      expect(markup).toBe(codeSample.frameworkMarkup[framework === 'js' ? 'vanilla-js' : framework]);
    }
  });

  it('throws identifying tag, key, side and framework for an empty authored variant', () => {
    const emptyExample: ExampleMarkupSample = {
      frameworkMarkup: { 'vanilla-js': '', react: '', angular: '', vue: '' },
    };
    const example: AccessibilityExample = {
      name: 'Empty',
      antiPattern: { kind: 'example', example: emptyExample },
      recommended: { kind: 'example', example: emptyExample },
    };
    expect(() => resolvePayload(example.antiPattern, 'js', 'p-checkbox', 'empty', 'antiPattern')).toThrow(
      /p-checkbox example "empty" antiPattern \(example, js\) produced empty markup/
    );
  });

  it('produces non-empty markup for a story across all four frameworks', () => {
    for (const framework of FRAMEWORKS) {
      expect(resolvePayload(hiddenLabel.antiPattern, framework, 'p-checkbox', 'hiddenLabel', 'antiPattern')).not.toBe(
        ''
      );
    }
  });

  it('emits bare snippet markup without runnable-file scaffolding', () => {
    for (const framework of FRAMEWORKS) {
      const markup = resolvePayload(hiddenLabel.antiPattern, framework, 'p-checkbox', 'hiddenLabel', 'antiPattern');
      expect(markup).not.toContain('<!doctype html>');
      expect(markup).not.toContain('export const Example');
      expect(markup).not.toContain('@Component');
      expect(markup).not.toContain('<script setup');
      expect(markup).toMatch(/checkbox/i);
    }
  });

  it('rejects imperative multiline strings in story payloads', () => {
    const imperative: AccessibilityExample = {
      ...hiddenLabel,
      antiPattern: {
        kind: 'story',
        story: { generator: () => ['if (open) {\n  mount();\n}'] },
      },
    };
    expect(() => resolvePayload(imperative.antiPattern, 'js', 'p-checkbox', 'imperative', 'antiPattern')).toThrow(
      /contains an imperative multiline string/
    );
  });
});
