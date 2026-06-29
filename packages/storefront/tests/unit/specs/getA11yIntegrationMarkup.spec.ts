import { checkboxA11yExamples } from '@/app/(main)/components/checkbox/accessibility/stories';
import { buttonA11yExamples } from '@/app/(main)/components/button/accessibility/stories';
import { modalA11yExamples } from '@/app/(main)/components/modal/accessibility/stories';
import { getA11yIntegrationMarkup } from '@/utils/generator/getA11yIntegrationMarkup';

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
});
