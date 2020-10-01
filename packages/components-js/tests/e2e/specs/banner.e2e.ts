import {
  getBrowser,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

describe('banner', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getBannerHost = () => selectNode(page, 'p-banner');
  const getBannerButton = () => selectNode(page, 'p-banner >>> p-button-pure');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `);
    const el = await getBannerButton();
    const getActiveEl = await page.$eval('p-banner', (el) => el.shadowRoot.activeElement.tagName);

    expect(el).toBeDefined();
    expect(getActiveEl.toLowerCase()).toBe('p-button-pure');
  });

  it('should render without button', async () => {
    await setContentWithDesignSystem(page, `
      <p-banner persistent="true">
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `);
    const el = await getBannerButton();
    expect(el).toBeNull();
  });

  it('should remove banner from DOM by click on close button', async () => {
    await setContentWithDesignSystem(page, `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `);

    const innerButton = await getBannerButton();

    // we have to wait for the CSS fade in animation of the banner
    await page.waitFor(2000);
    await innerButton.click();
    await waitForStencilLifecycle(page);
    // we have to wait for the animation to end before the dom is cleared
    await page.waitFor(1000);
    expect(await getBannerHost()).toBeNull();
  });

});
