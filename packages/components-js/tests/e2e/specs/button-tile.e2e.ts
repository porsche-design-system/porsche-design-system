import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-button-tile');
const getVideo = (page: Page) => page.locator('p-button-tile video');

const imageTag = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some image label"/>`;
const videoTag = `<video
  poster="http://localhost:3002/ocean.jpg"
  src="http://localhost:3002/ocean.mp4"
  loop
  muted
  autoplay
  aria-hidden="true"
></video>`;

const initButtonTile = (
  page: Page,
  opts?: { compact?: boolean | string; img?: boolean; video?: boolean }
): Promise<void> => {
  const { compact = false, img = false, video = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-button-tile label="Some label" description="Some description" gradient="true" compact="${compact}" style="color-scheme: dark">
  ${img ? imageTag : ''}
  ${video ? videoTag : ''}
</p-button-tile>`
  );
};

const appendVideo = async (page: Page): Promise<void> => {
  await page.evaluate(async (): Promise<void> => {
    const video = document.createElement('video');
    video.src = 'http://localhost:3002/ocean.mp4';
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    document.querySelector('p-button-tile').appendChild(video);
  });
};

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initButtonTile(page, { img: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact="true"', async ({ page }) => {
    await initButtonTile(page, { img: true, compact: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact responsive', async ({ page }) => {
    await initButtonTile(page, { img: true, compact: '{ base: true, s: false, l: true }' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initButtonTile(page), { img: true };
    const host = getHost(page);
    const statusBefore = await getLifecycleStatus(page);
    expect(statusBefore.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(statusBefore.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);
    expect(statusBefore.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(statusBefore.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await setProperty(host, 'compact', 'true');
    await waitForStencilLifecycle(page);
    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
    expect(statusAfter.componentDidUpdate['p-button-tile'], 'componentDidUpdate: p-button-tile').toBe(1);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('slotted video', () => {
  // test against branded Chromium, Google Chrome would work (https://playwright.dev/docs/browsers#google-chrome--microsoft-edge)
  // but it's not shipped with the default Microsoft Playwright docker image
  skipInBrowsers(['chromium', 'webkit']);

  test('should work with autoplay', async ({ page }) => {
    await initButtonTile(page, { video: true });

    await expect(getVideo(page)).toHaveJSProperty('paused', false);
  });

  test('should not autoplay when reduced motion is set', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await initButtonTile(page, { video: true });

    await expect(getVideo(page)).toHaveJSProperty('paused', true);
  });

  test('should work with autoplay when video gets added dynamically', async ({ page }) => {
    await initButtonTile(page, { video: false });
    await appendVideo(page);

    await expect(getVideo(page)).toHaveJSProperty('paused', false);
  });

  test('should not autoplay when video gets added dynamically and reduced motion is set', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await initButtonTile(page, { video: false });
    await appendVideo(page);

    await expect(getVideo(page)).toHaveJSProperty('paused', true);
  });
});
