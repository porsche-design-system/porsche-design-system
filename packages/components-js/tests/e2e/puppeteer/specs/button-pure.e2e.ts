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

const getHost = () => selectNode(page, 'p-button-pure');
const getButton = () => selectNode(page, 'p-button-pure >>> button');

const initButtonPure = (opts?: { isLoading?: boolean; isDisabled?: boolean; withSubline?: boolean }): Promise<void> => {
  const { isLoading = false, isDisabled = false, withSubline = false } = opts || {};
  const loading = isLoading ? `loading="${isLoading}"` : '';
  const disabled = isDisabled ? `disabled="${isDisabled}"` : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-button-pure ${loading} ${disabled}>
      Some label
      ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
    </p-button-pure>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initButtonPure();
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose correct accessibility name when hide-label prop is set', async () => {
    await initButtonPure();
    const host = await getHost();
    const button = await getButton();
    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose accessibility tree description with slotted subline', async () => {
    await initButtonPure({ withSubline: true });
    const button = await getButton();

    await expectA11yToMatchSnapshot(page, button);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initButtonPure();
    const host = await getHost();
    const button = await getButton();
    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
      'aria-expanded': true,
      'aria-haspopup': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Initial' });

    await setProperty(host, 'aria', {
      'aria-pressed': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' }); // need to split the test in 2, because aria-expanded and aria-pressed are invalid if used simultaneously. Also aria-pressed removes the accessible name.
  });
});
