import {
  expectA11yToMatchSnapshot,
  getHTMLAttributes,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import { Components } from '@porsche-design-system/components';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout');
const getFlyout = () => selectNode(page, 'p-flyout >>> dialog');
const getHeader = () => selectNode(page, 'p-flyout >>> .header');
const getHeaderSlottedContent = () => selectNode(page, '[slot="header"]');
const getFooter = () => selectNode(page, 'p-flyout >>> .footer');
const getFooterSlottedContent = () => selectNode(page, '[slot="footer"]');
const getSubFooter = () => selectNode(page, 'p-flyout >>> .sub-footer');
const getSubFooterSlottedContent = () => selectNode(page, '[slot="sub-footer"]');

const initBasicFlyout = (
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

describe('slotted', () => {
  it('should set slotted header, footer, sub-footer', async () => {
    const headerContent = '<h1>Sticky Heading</h1><p>Sticky header text</p>';
    const footerContent = '<button>Footer Button</button>';
    const subFooterContent = '<p>Sub Footer Content</p>';
    await initBasicFlyout(
      { open: true },
      {
        header: `<div slot="header">${headerContent}</div>`,
        footer: `<div slot="footer">${footerContent}</div>`,
        subFooter: `<div slot="sub-footer">${subFooterContent}</div>`,
      }
    );
    const header = await getHeader();
    const headerSlottedContent = await getHeaderSlottedContent();
    expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(
      `"<p-button-pure class="dismiss hydrated">Dismiss flyout</p-button-pure><slot name="header"></slot>"`
    );
    expect(await getProperty(headerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<h1>Sticky Heading</h1><p>Sticky header text</p>"`
    );

    const footer = await getFooter();
    const footerSlottedContent = await getFooterSlottedContent();
    expect(await getProperty(footer, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="footer"></slot>"`);
    expect(await getProperty(footerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<button>Footer Button</button>"`
    );

    const subFooter = await getSubFooter();
    const subFooterSlottedContent = await getSubFooterSlottedContent();
    expect(await getProperty(subFooter, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="sub-footer"></slot>"`);
    expect(await getProperty(subFooterSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<p>Sub Footer Content</p>"`
    );
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicFlyout();
    const flyout = await getFlyout();

    await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
  });

  it('should not expose accessibility tree if flyout is hidden', async () => {
    await initBasicFlyout({ open: false });
    const flyout = await getFlyout();

    await expectA11yToMatchSnapshot(page, flyout);
  });

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicFlyout({ open: false, aria: "{'aria-label': 'Some Heading'}" });
    const host = await getHost();
    const flyout = await getFlyout();
    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(flyout, 'ariaLabel')).toBe('Other Heading');
  });
});
