import { checkboxA11yExamples } from '@/app/(main)/components/checkbox/accessibility/stories';
import { buttonA11yExamples } from '@/app/(main)/components/button/accessibility/stories';
import { modalA11yExamples } from '@/app/(main)/components/modal/accessibility/stories';
import { antiMarkupToGeneratorNodes } from '../../../scripts/lib/a11yMarkupParser';
import { getA11yIntegrationMarkup } from '@/utils/generator/getA11yIntegrationMarkup';

describe('antiMarkupToGeneratorNodes()', () => {
  it('should parse structural anti-patterns into element configs', () => {
    const nodes = antiMarkupToGeneratorNodes('<p-checkbox name="terms" hide-label="true"></p-checkbox>');
    expect(nodes).toEqual([
      {
        tag: 'p-checkbox',
        properties: { name: 'terms', hideLabel: true },
        children: [],
      },
    ]);
  });

  it('should parse host-level aria anti-patterns into element configs', () => {
    const nodes = antiMarkupToGeneratorNodes('<p-button aria-haspopup="dialog">Open</p-button>');
    expect(nodes).toEqual([
      {
        tag: 'p-button',
        properties: { 'aria-haspopup': 'dialog' },
        children: ['Open'],
      },
    ]);
  });

  it('should keep imperative anti-patterns as raw strings', () => {
    const markup = "if (hasError) {\n  document.body.insertAdjacentHTML('beforeend', '<p-banner></p-banner>');\n}";
    expect(antiMarkupToGeneratorNodes(markup)).toEqual([markup]);
  });
});

describe('getA11yIntegrationMarkup()', () => {
  it('should generate anti-pattern markup from typed story config', () => {
    const { anti } = checkboxA11yExamples[0];
    expect(getA11yIntegrationMarkup(anti)).toMatchInlineSnapshot(
      `"<p-checkbox name="terms" hide-label="true"></p-checkbox>"`
    );
  });

  it('should generate host-level aria anti-pattern markup from story config', () => {
    const { anti } = modalA11yExamples[0];
    expect(getA11yIntegrationMarkup(anti)).toMatchInlineSnapshot(
      `"<p-button aria-haspopup="dialog">
  Details of product XYZ
</p-button>"`
    );
  });

  it('should generate recommended markup from story config', () => {
    const { recommended } = buttonA11yExamples[0];
    expect(getA11yIntegrationMarkup(recommended)).toMatchInlineSnapshot(
      `"<p-button aria="{'aria-haspopup': 'dialog', 'aria-label': 'Open details of product XYZ'}">
  Open details
</p-button>"`
    );
  });

  it('should generate icon-only recommended markup from story config', () => {
    const { recommended } = buttonA11yExamples[1];
    expect(getA11yIntegrationMarkup(recommended)).toMatchInlineSnapshot(
      `"<p-button icon="plus" hide-label="true">
  Add item XYZ to shopping cart
</p-button>"`
    );
  });
});
