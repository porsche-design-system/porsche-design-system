import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { goto } from '../helpers';

// The static shell has loaded the components before the Suspense boundary arrives, so the parser creates the
// streamed hosts with their definition at hand. The patched Stencil runtime holds them until the parser has attached
// their declarative shadow root (#4162). Unexpected console output, such as the browser's "A second declarative
// shadow root cannot be created on a host" or a hydration error of React, fails these tests through the console guard.
const getLeftoverTemplates = (page: Page): Promise<string[]> =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('template[shadowrootmode]'), (template) =>
      (template.parentElement as HTMLElement).tagName.toLowerCase()
    )
  );

// Counts the hosts the server marked, when the stream ends. Whatever React renders on the client has no marker,
// so a boundary React had to render again after a hydration error would lower the count.
const trackServerRenderedHosts = (page: Page) =>
  page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as any).serverRenderedHostIds = Array.from(document.querySelectorAll('[data-dsr][id]'), (el) => el.id);
    });
  });

test('should keep the declarative shadow roots of streamed components', async ({ page }) => {
  await goto(page, '/streaming-props');

  await expect(page.locator('#streamed-button')).toHaveJSProperty('variant', 'secondary');
  expect(await getLeftoverTemplates(page)).toEqual([]);
});

test('should hydrate streamed components with element children', async ({ page }) => {
  await trackServerRenderedHosts(page);
  await goto(page, '/streaming-children');
  const button = page.locator('#streamed-button');

  await expect(button).toHaveJSProperty('variant', 'secondary');
  await expect(button.locator('#streamed-button-label')).toHaveText('Streamed button');
  await expect(page.locator('#streamed-text')).toHaveText('Streamed text');
  expect(await getLeftoverTemplates(page)).toEqual([]);

  // React kept the server rendered hosts instead of rendering the boundary again on the client
  expect(await page.evaluate(() => (window as any).serverRenderedHostIds)).toEqual([
    'streamed-button',
    'streamed-text',
  ]);
  await expect(button).toHaveAttribute('data-dsr', '');
});

test('should render streamed components with nested components', async ({ page }) => {
  await goto(page, '/streaming');

  await expect(page.getByText('Streamed content after 5 seconds')).toBeVisible();
  await expect(page.locator('p-tabs p-tabs-item').first()).toBeVisible();
  expect(await getLeftoverTemplates(page)).toEqual([]);
});
