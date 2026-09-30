import type { AxeBuilder } from '@axe-core/playwright';
import type { TestInfo } from '@playwright/test';
import { schemes } from '@porsche-design-system/shared/testing';
import { getDevice, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';
import { expect, test } from './axe-helper.ts';

/**
 * The scans every example gets, and how a scan reports.
 *
 * Every scan runs in both colour schemes, which is what the contrast rules depend on, on both devices of the config –
 * on mobile, for example, the profile menu of the local market switch is a sheet, on desktop a popover.
 */

/**
 * Scans with the given builder and attaches the violations, so a CI failure is readable without a rerun. The device is
 * appended to the name of the attachment, so the results of the two projects never read alike.
 */
export const expectNoViolations = async (builder: AxeBuilder, testInfo: TestInfo, name: string): Promise<void> => {
  const { violations } = await builder.analyze();

  await testInfo.attach(`a11y-scan-results-${name}--${getDevice()}`, {
    body: JSON.stringify(violations, null, 2),
    contentType: 'application/json',
  });

  expect(violations).toEqual([]);
};

export type InitialStatesOptions = {
  /**
   * Rules that do not apply to this page, by what the page is – never a blanket exception. Say why next to the call.
   */
  disabledRules?: string[];
};

export const testInitialStates = (id: string, { disabledRules = [] }: InitialStatesOptions = {}): void => {
  const url = getExampleUrl(id);

  for (const scheme of schemes) {
    test(`initial state with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
      await setupExamplePage(page, url, { prefersColorScheme: scheme });

      await expectNoViolations(makeAxeBuilder().disableRules(disabledRules), testInfo, `${id}--${scheme}`);
    });
  }
};
