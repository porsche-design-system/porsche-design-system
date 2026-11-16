import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/templates/personalized-mailing/no-video` – what differs from the `video` variant: the page opens on a title
 * instead of a video, and the vehicle at the start of the chapter is pulled up into it. Everything below the hero is
 * the same markup and script, covered by the spec of the `video` variant – except the contact bar, which depends on
 * the height of the hero.
 */

const url = getExampleUrl('templates-personalized-mailing-no-video');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // Templates share one site name; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Templates$/);
  expect(errors).toEqual([]);
});

test('opens on its title instead of a video, with the vehicle pulled up into it', async ({ page }) => {
  await setupExamplePage(page, url);

  await expect(page.locator('#hero-video')).toHaveCount(0);
  await expect(page.locator('#pause-button')).toHaveCount(0);
  await expect(page.locator('h1')).toHaveText(/A choice\s+with character\./);

  // The car overlaps the second line of the title – the chapter starts below the hero, the car above its end.
  const titleBottom = await page
    .locator('#pm-hero-heading')
    .evaluate((element) => element.getBoundingClientRect().bottom);
  const carTop = await page
    .locator('img[src$="pm-chapter-car.webp"]')
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(carTop).toBeLessThan(titleBottom);
});

test('shows the contact bar below the hero and hides it again at the contact section and the footer', async ({
  page,
}) => {
  await setupExamplePage(page, url);

  const contactBar = page.locator('#pm-contact-bar');

  await expect(contactBar).not.toHaveAttribute('data-shown');

  await page.locator('#pm-voices').scrollIntoViewIfNeeded();
  await expect(contactBar).toHaveAttribute('data-shown');

  await page.locator('#pm-contact').scrollIntoViewIfNeeded();
  await expect(contactBar).not.toHaveAttribute('data-shown');
});
