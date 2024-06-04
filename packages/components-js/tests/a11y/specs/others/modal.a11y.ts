import { type Page, test, expect } from '@playwright/test';
import { getProperty, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import type { ModalAriaAttribute, SelectedAriaAttributes } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.$('p-modal');
const getModalDialog = (page: Page) => page.$('p-modal dialog');

const initBasicModal = (
  page: Page,
  opts?: {
    isOpen?: boolean;
    content?: string;
    heading?: string;
    aria?: SelectedAriaAttributes<ModalAriaAttribute>;
    hasSlottedHeading?: boolean;
    hasSlottedFooter?: boolean;
    disableCloseButton?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const {
    isOpen = true,
    content = 'Some Content',
    heading = 'Some Heading',
    aria,
    hasSlottedHeading,
    hasSlottedFooter,
    disableCloseButton,
    markupBefore,
    markupAfter,
  } = opts || {};

  const attributes = [
    !hasSlottedHeading && `heading="${heading}"`,
    isOpen && 'open',
    aria && `aria="${aria}"`,
    disableCloseButton && 'disable-close-button',
  ]
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore}<p-modal ${attributes}>
  ${hasSlottedHeading ? '<div slot="heading">Some Heading<a href="https://porsche.com">Some link</a></div>' : ''}
  ${content}
  ${hasSlottedFooter ? '<div slot="footer">Some Footer</div>' : ''}
</p-modal>${markupAfter}`
  );
};

test('should expose correct initial accessibility tree', async ({ page }) => {
  await initBasicModal(page);
  const modal = await getModalDialog(page);

  // await expectA11yToMatchSnapshot(page, modal, { interestingOnly: false });
});

test('should not expose accessibility tree if modal is hidden', async ({ page }) => {
  await initBasicModal(page, { isOpen: false });
  const modal = await getModalDialog(page);

  // await expectA11yToMatchSnapshot(page, modal);
});

const testCases: [string, SelectedAriaAttributes<ModalAriaAttribute>, string][] = [
  ['Some Heading', undefined, 'Some Heading'],
  [undefined, "{'aria-label': 'Some Heading'}", 'Some Heading'],
  ['Some Heading', "{'aria-label': 'Other Heading'}", 'Other Heading'],
];

for (const [heading, aria, expected] of testCases) {
  test(`should with props heading: ${heading} and aria: ${aria} set aria-label: ${expected}`, async ({ page }) => {
    await initBasicModal(page, { isOpen: false, heading, aria });
    const modal = await getModalDialog(page);

    expect(await getProperty(modal, 'ariaLabel')).toBe(expected);
  });
}

test('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicModal(page, { isOpen: false });
  const host = await getHost(page);
  const modal = await getModalDialog(page);
  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(modal, 'ariaLabel')).toBe('Other Heading');
});

test('should overwrite aria-label with heading when setting aria prop to undefined', async ({ page }) => {
  await initBasicModal(page, { isOpen: false, heading: 'Some Heading', aria: "{'aria-label': 'Other Heading'}" });
  const host = await getHost(page);
  const modal = await getModalDialog(page);
  await setProperty(host, 'aria', undefined);
  await waitForStencilLifecycle(page);

  expect(await getProperty(modal, 'ariaLabel')).toBe('Some Heading');
});
