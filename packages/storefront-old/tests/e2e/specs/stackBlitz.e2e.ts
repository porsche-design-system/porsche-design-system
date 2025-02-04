import { expect, test } from '@playwright/test';
import type { Framework } from '../../../src/models';

const frameworkToButtonTextMap: Record<Exclude<Exclude<Framework, 'shared'>, 'vue'>, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
};

const frameworks: Framework[] = ['vanilla-js', 'angular', 'react'];

for (const framework of frameworks) {
  test.fixme(`should have working stackBlitz button for framework: ${framework}`, async ({ browser }) => {
    const context = await browser.newContext({
      // bypass captcha in headless chrome
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    });
    const page = await context.newPage();
    await page.goto('/components/button/examples');

    const [frameworkButton] = await page
      .locator(`xpath=//button[text() = '${frameworkToButtonTextMap[framework]}']`)
      .all();

    await frameworkButton.click();
    expect(await frameworkButton.getAttribute('aria-selected')).toBe('true');

    const stackBlitzButton = page.locator('.playground p-button[type=button]').first();
    const stackBlitzPagePromise = page.waitForEvent('popup');

    await stackBlitzButton.click();
    const stackBlitzPage = await stackBlitzPagePromise;
    await stackBlitzPage.waitForLoadState();
    // now we're on the stackBlitz website
    await stackBlitzPage.waitForSelector('#PreviewContentWrapper iframe');

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
  });
}
