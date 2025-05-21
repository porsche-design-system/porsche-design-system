import { expect, test } from '@playwright/test';
import type { Framework } from '@porsche-design-system/shared';

// TODO: Vue and Angular currently only work for released version
const buttonFrameworkMap: Record<Framework, string> = {
  'vanilla-js': 'Vanilla JS',
  react: 'React',
  angular: 'Angular',
  vue: 'Vue',
};

const frameworks: Framework[] = ['vanilla-js', 'react'];

for (const framework of frameworks) {
  test(`should have working stackBlitz button for framework: ${framework}`, async ({ browser }) => {
    test.setTimeout(120000);
    const context = await browser.newContext({
      // bypass captcha in headless chrome
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    });
    const page = await context.newPage();
    await page.goto('/components/button/configurator');

    const playground = page.locator('.playground');
    await expect(playground.locator('p-tabs-bar.framework-select')).toBeVisible();
    await playground.getByText(buttonFrameworkMap[framework]).click();
    await expect(playground.getByRole('tab', { name: buttonFrameworkMap[framework] })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    const stackBlitzButton = page.getByText('Open in Stackblitz');
    const stackBlitzPagePromise = page.waitForEvent('popup');

    await stackBlitzButton.click();
    const stackBlitzPage = await stackBlitzPagePromise;
    await stackBlitzPage.waitForLoadState();

    // Wait for the iframe to appear on the parent page
    await stackBlitzPage.waitForSelector('#PreviewContentWrapper iframe', {
      state: 'attached', // Ensures the iframe is attached to the DOM
      timeout: 120000, // Adjust timeout as needed
    });

    const iframeElement = stackBlitzPage.locator('#PreviewContentWrapper iframe');
    const iframe = iframeElement.contentFrame();

    if (iframe) {
      const button = iframe.locator('p-button');
      await expect(button).toBeVisible();
    } else {
      throw new Error('Unable to access the iframe content, possibly due to cross-origin restrictions');
    }

    await stackBlitzPage.close();
  });
}
