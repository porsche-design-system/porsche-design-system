import {
  expectA11yToMatchSnapshot,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { ModalAriaAttribute, SelectedAriaAttributes } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-modal');
const getModal = () => selectNode(page, 'p-modal >>> .root');

const initBasicModal = (opts?: {
  isOpen?: boolean;
  content?: string;
  heading?: string;
  aria?: SelectedAriaAttributes<ModalAriaAttribute>;
  hasSlottedHeading?: boolean;
  hasSlottedFooter?: boolean;
  disableCloseButton?: boolean;
  markupBefore?: string;
  markupAfter?: string;
}): Promise<void> => {
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicModal();
    const modal = await getModal();

    await expectA11yToMatchSnapshot(page, modal, { interestingOnly: false });
  });

  it('should not expose accessibility tree if modal is hidden', async () => {
    await initBasicModal({ isOpen: false });
    const modal = await getModal();

    await expectA11yToMatchSnapshot(page, modal);
  });

  it.each<[string, SelectedAriaAttributes<ModalAriaAttribute>, string]>([
    ['Some Heading', undefined, 'Some Heading'],
    [undefined, "{'aria-label': 'Some Heading'}", 'Some Heading'],
    ['Some Heading', "{'aria-label': 'Other Heading'}", 'Other Heading'],
  ])('should with props heading: %s and aria: %s set aria-label: %s', async (heading, aria, expected) => {
    await initBasicModal({ isOpen: false, heading, aria });
    const modal = await getModal();

    expect(await getProperty(modal, 'ariaLabel')).toBe(expected);
  });

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicModal({ isOpen: false });
    const host = await getHost();
    const modal = await getModal();
    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(modal, 'ariaLabel')).toBe('Other Heading');
  });

  it('should overwrite aria-label with heading when setting aria prop to undefined', async () => {
    await initBasicModal({ isOpen: false, heading: 'Some Heading', aria: "{'aria-label': 'Other Heading'}" });
    const host = await getHost();
    const modal = await getModal();
    await setProperty(host, 'aria', undefined);
    await waitForStencilLifecycle(page);

    expect(await getProperty(modal, 'ariaLabel')).toBe('Some Heading');
  });
});
