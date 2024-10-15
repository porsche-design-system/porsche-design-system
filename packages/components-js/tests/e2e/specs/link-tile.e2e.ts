import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const getHost = (page: Page) => page.locator('p-link-tile');
const getVideo = (page: Page) => page.locator('p-link-tile video');

const imageTag = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some image label"/>`;
const videoTag = `<video
  poster="http://localhost:3002/ocean.jpg"
  src="http://localhost:3002/ocean.mp4"
  loop
  muted
  autoplay
  aria-hidden="true"
></video>`;

const initLinkTile = (
  page: Page,
  opts?: { compact?: boolean | string; img?: boolean; video?: boolean }
): Promise<void> => {
  const { compact = false, img = false, video = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-link-tile href="#" label="Some label" description="Some description" ${compact ? 'compact="' + compact + '"' : ''}>
  ${img ? imageTag : ''}
  ${video ? videoTag : ''}
</p-link-tile>`
  );
};

const appendVideo = async (page: Page): Promise<void> => {
  await page.evaluate(async (): Promise<void> => {
    const video = document.createElement('video');
    video.src = 'http://localhost:3002/ocean.mp4';
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    document.querySelector('p-link-tile').appendChild(video);
  });
};

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initLinkTile(page, { img: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact="true"', async ({ page }) => {
    await initLinkTile(page, { img: true, compact: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init for compact responsive', async ({ page }) => {
    await initLinkTile(page, { img: true, compact: '{ base: true, s: false, l: true }' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initLinkTile(page, { img: true });
    const host = getHost(page);

    await setProperty(host, 'compact', 'true');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1); // changes the rendered link when compact changes
    expect(status.componentDidUpdate['p-link-tile'], 'componentDidUpdate: p-link-tile').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('slotted video', () => {
  // test against branded Chromium, Google Chrome would work (https://playwright.dev/docs/browsers#google-chrome--microsoft-edge)
  // but it's not shipped with the default Microsoft Playwright docker image
  test.skip(({ browserName }) => browserName === 'chromium');

  test('should work with autoplay', async ({ page }) => {
    await initLinkTile(page, { video: true });

    await expect(getVideo(page)).toHaveJSProperty('paused', false);
  });

  test('should not autoplay when reduced motion is set', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await initLinkTile(page, { video: true });

    await expect(getVideo(page)).toHaveJSProperty('paused', true);
  });

  test('should work with autoplay when video gets added dynamically', async ({ page }) => {
    await initLinkTile(page, { video: false });
    await appendVideo(page);

    await expect(getVideo(page)).toHaveJSProperty('paused', false);
  });

  test('should not autoplay when video gets added dynamically and reduced motion is set', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await initLinkTile(page, { video: false });
    await appendVideo(page);

    await expect(getVideo(page)).toHaveJSProperty('paused', true);
  });
});
