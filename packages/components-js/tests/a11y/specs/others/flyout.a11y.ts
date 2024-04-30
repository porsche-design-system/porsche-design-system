import {
  getHTMLAttributes,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import { Components } from '@porsche-design-system/components';

const getHost = (page: Page) => page.$('p-flyout');
const getFlyout = (page: Page) => page.$('p-flyout dialog');
const getHeader = (page: Page) => page.$('p-flyout .header');
const getHeaderSlottedContent = (page: Page) => page.$('[slot="header"]');
const getFooter = (page: Page) => page.$('p-flyout .footer');
const getFooterSlottedContent = (page: Page) => page.$('[slot="footer"]');
const getSubFooter = (page: Page) => page.$('p-flyout .sub-footer');
const getSubFooterSlottedContent = (page: Page) => page.$('[slot="sub-footer"]');

const initBasicFlyout = (
  page: Page,
  flyoutProps: Components.PFlyout = {
    open: true,
  },
  flyoutSlots?: {
    content?: string;
    header?: string;
    footer?: string;
    subFooter?: string;
  },
  other?: {
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const { header = '', content = '<p>Some Content</p>', footer = '', subFooter = '' } = flyoutSlots || {};
  const { markupBefore = '', markupAfter = '' } = other || {};

  const flyoutMarkup = `
<p-flyout ${getHTMLAttributes(flyoutProps)}>
  ${[header, content, footer, subFooter].filter(Boolean).join('\n  ')}
</p-flyout>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

test.describe('slotted', () => {
  test.fixme('should set slotted header, footer, sub-footer', async ({ page }) => {
    const headerContent = '<h1>Sticky Heading</h1><p>Sticky header text</p>';
    const footerContent = '<button>Footer Button</button>';
    const subFooterContent = '<p>Sub Footer Content</p>';
    await initBasicFlyout(
      page,
      { open: true },
      {
        header: `<div slot="header">${headerContent}</div>`,
        footer: `<div slot="footer">${footerContent}</div>`,
        subFooter: `<div slot="sub-footer">${subFooterContent}</div>`,
      }
    );
    const header = await getHeader(page);
    const headerSlottedContent = await getHeaderSlottedContent(page);
    // expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(
    //   `"<p-button-pure class="dismiss hydrated">Dismiss flyout</p-button-pure><slot name="header"></slot>"`
    // );
    // expect(await getProperty(headerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
    //   `"<h1>Sticky Heading</h1><p>Sticky header text</p>"`
    // );

    const footer = await getFooter(page);
    const footerSlottedContent = await getFooterSlottedContent(page);
    // expect(await getProperty(footer, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="footer"></slot>"`);
    // expect(await getProperty(footerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
    //   `"<button>Footer Button</button>"`
    // );

    const subFooter = await getSubFooter(page);
    const subFooterSlottedContent = await getSubFooterSlottedContent(page);
    // expect(await getProperty(subFooter, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="sub-footer"></slot>"`);
    // expect(await getProperty(subFooterSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
    //   `"<p>Sub Footer Content</p>"`
    // );
  });
});

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initBasicFlyout(page);
  const flyout = await getFlyout(page);

  // await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
});

test.fixme('should not expose accessibility tree if flyout is hidden', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  const flyout = await getFlyout(page);

  // await expectA11yToMatchSnapshot(page, flyout);
});

test('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicFlyout(page, { open: false, aria: "{'aria-label': 'Some Heading'}" });
  const host = await getHost(page);
  const flyout = await getFlyout(page);
  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(flyout, 'ariaLabel')).toBe('Other Heading');
});
