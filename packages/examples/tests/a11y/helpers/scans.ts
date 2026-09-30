import type { AxeBuilder } from '@axe-core/playwright';
import type { TestInfo } from '@playwright/test';
import { schemes, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage } from '../../helpers/index.ts';
import { expect, test } from './axe-helper.ts';

/**
 * The scans every example gets, and the matrix its own states are scanned in.
 *
 * The matrix is the one the component suites of `packages/components-js` use: two viewports × the two colour schemes.
 * The viewports are the ends of the responsive behaviour the examples demonstrate – at 320 the profile menu of the
 * local market switch is a sheet, at 1000 a popover – and the schemes are what the contrast rules depend on.
 */

export const scanMatrix = [viewportWidthXXS, viewportWidthM].flatMap((viewportWidth) =>
  schemes.map((scheme) => ({ viewportWidth, scheme }))
);

/** Scans with the given builder and attaches the violations, so a CI failure is readable without a rerun. */
export const expectNoViolations = async (builder: AxeBuilder, testInfo: TestInfo, name: string): Promise<void> => {
  const { violations } = await builder.analyze();

  await testInfo.attach(`a11y-scan-results-${name}`, {
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

  for (const { viewportWidth, scheme } of scanMatrix) {
    test(`initial state at ${viewportWidth} with color-scheme ${scheme}`, async ({
      page,
      makeAxeBuilder,
    }, testInfo) => {
      await setupExamplePage(page, url, { viewportWidth, prefersColorScheme: scheme });

      await expectNoViolations(
        makeAxeBuilder().disableRules(disabledRules),
        testInfo,
        `${id}-${viewportWidth}-${scheme}`
      );
    });
  }
};
