import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-pure');
const getLink = () => selectNode(page, 'p-link-pure >>> a');
const getIcon = () => selectNode(page, 'p-link-pure >>> p-icon >>> svg');
const getSpan = () => selectNode(page, 'p-link-pure >>> span');

const initLinkPure = (opts?: { useSlottedAnchor?: boolean; withSubline?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false, withSubline = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link-pure onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''}>
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-link-pure>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkPure();
    const link = await getLink();
    const icon = await getIcon();

    await expectA11yToMatchSnapshot(page, link);
    await expectA11yToMatchSnapshot(page, icon, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if label is hidden', async () => {
    await initLinkPure();
    const host = await getHost();
    const link = await getLink();
    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, link);
  });

  it('should expose correct accessibility tree description if subline property is set', async () => {
    await initLinkPure({ withSubline: true });
    const link = await getLink();

    await expectA11yToMatchSnapshot(page, link);
  });

  it('should not expose accessibility tree description with slotted anchor and subline', async () => {
    await initLinkPure({ useSlottedAnchor: true, withSubline: true });
    const span = await getSpan();

    const snapshot = await page.accessibility.snapshot({
      root: span,
    });

    expect(snapshot).toBeNull();
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initLinkPure();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
