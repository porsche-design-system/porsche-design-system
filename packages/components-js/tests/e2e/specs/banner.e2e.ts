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
      <div id="wrapper">
        <p-banner>
          <span slot="title">Some notification title</span>
          <span slot="description">Some notification description.</span>
        </p-banner>
      </div>
    `);

    const innerButton = await getBannerButton();

    // we have to wait for the CSS fade in animation of the banner
    setTimeout(async () => {
      await innerButton.click();
      await waitForStencilLifecycle(page);
      expect(await getBannerHost()).toHaveClass('p-banner--close');
      expect(await getBannerHost()).toBeNull();
    }, 2000);

  });

});
