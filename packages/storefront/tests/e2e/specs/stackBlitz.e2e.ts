import { baseURL, getFrameworkButtons } from '../helpers';
import type { Page } from 'puppeteer';
import { Framework } from '../../../src/models';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should have working stackBlitz button', async () => {
  await page.goto(`${baseURL}/components/button/examples`, { waitUntil: 'networkidle0' });

  const frameWorkButtons = await getFrameworkButtons(page);

  if (frameWorkButtons.length) {
    expect(frameWorkButtons.length).toBe(3);

    for (let i = 0; i < frameWorkButtons.length; i++) {
      const frameworkButton = frameWorkButtons[i];

      await frameworkButton.click();
      await page.waitForFunction((el) => el.getAttribute('aria-selected') === 'true', {}, frameworkButton);

      // bypass captcha in headless chrome
      await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
      );

      // save target of original page to know that this was the opener
      const pageTarget = page.target();

      const stackBlitzButton = await page.$('.playground p-button[type=button]');

      await stackBlitzButton.click();

      // now we're on the stackBlitz website
      // get stackBlitz tab
      // check that the first page opened this new page
      const newTarget = await browser.waitForTarget((target) => target.opener() === pageTarget);
      // get the new page object
      const stackBlitzPage = await newTarget.page();

      await stackBlitzPage.waitForSelector('#PreviewContentWrapper');
      const previewContentWrapper = await stackBlitzPage.$('#PreviewContentWrapper');
      await previewContentWrapper.waitForSelector('iframe');

      // Wait for StackBlitz dev-server to be done
      await stackBlitzPage.waitForFunction(
        () =>
          (
            document.querySelector('#PreviewContentWrapper iframe') as HTMLIFrameElement
          ).contentWindow.document.querySelector('html .hydrated'),
        { timeout: 60000 }
      );

      const documentPDS = await stackBlitzPage.evaluate(
        () =>
          ((document.querySelector('#PreviewContentWrapper iframe') as HTMLIFrameElement).contentWindow.document as any)
            .porscheDesignSystem
      );

      expect(documentPDS).toBeDefined();
      await stackBlitzPage.close();
    }
  }
});
