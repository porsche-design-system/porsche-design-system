import { Page } from 'puppeteer';

export async function redraw(page: Page) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.evaluate(() => {
    document.body.style.display = 'none';
    const offsetHeight = document.body.offsetHeight;
    document.body.style.display = 'block';
    return offsetHeight; // just for linter to be happy (no unused variables)
  });
}
