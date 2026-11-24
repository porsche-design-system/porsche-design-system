import { schemes } from '@porsche-design-system/testing';
import { waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';
import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/personal-details` – the personal details form in its initial and validation error states.
 */

const id = 'patterns-forms-personal-details';
const url = getExampleUrl(id);

testInitialStates(id);

for (const scheme of schemes) {
  test(`validation errors with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
    await waitForComponentsHydrated(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--errors--${scheme}`);
  });
}
