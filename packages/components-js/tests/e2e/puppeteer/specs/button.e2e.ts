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

const getHost = () => selectNode(page, 'p-button');
const getButton = () => selectNode(page, 'p-button >>> button');

const initButton = (opts?: { isLoading?: boolean; isDisabled?: boolean }): Promise<void> => {
  const { isLoading = false, isDisabled = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button ${loading} ${disabled}>
      Some label
    </p-button>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initButton();
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose correct accessibility name when hide-label prop is set', async () => {
    await initButton();
    const host = await getHost();
    const button = await getButton();

    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initButton();
    const host = await getHost();
    const button = await getButton();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
      'aria-expanded': true,
      'aria-haspopup': true,
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, button, { message: 'initial aria attributes' });

    await setProperty(host, 'aria', {
      'aria-pressed': true,
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, button, { message: 'aria-pressed attribute' });
  });
});
