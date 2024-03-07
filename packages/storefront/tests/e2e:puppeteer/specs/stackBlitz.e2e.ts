import { baseURL } from '../helpers';
import type { Page } from 'puppeteer';
import type { Framework } from '../../../src/models';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const frameworkToButtonTextMap: Record<Exclude<Framework, 'shared'>, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
};

xit.each(<Framework[]>['vanilla-js', 'angular', 'react'])(
  'should have working stackBlitz button for framework: %s',
  async (framework) => {
    await page.goto(`${baseURL}/components/button/examples`);

    const [frameworkButton] = await page.$x(`//button[text() = '${frameworkToButtonTextMap[framework]}']`);

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
      { timeout: 90000 }
    );

    const documentPDS = await stackBlitzPage.evaluate(
      () =>
        ((document.querySelector('#PreviewContentWrapper iframe') as HTMLIFrameElement).contentWindow.document as any)
          .porscheDesignSystem
    );

    expect(documentPDS).toBeDefined();
    await stackBlitzPage.close();
  }
);
