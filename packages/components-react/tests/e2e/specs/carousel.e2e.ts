import { test, expect } from '@playwright/test';
import { getLifecycleStatus, goto, trackLifecycleStatus, waitForComponentsReady } from '../helpers';

test('should not cause new lifecycle when nothing on the component changes', async ({ page }) => {
  await goto(page, 'carousel-example-events');
  expect(await waitForComponentsReady(page)).toBe(2); // p-carousel and p-text

  const goToLastSlideButton = page.getByRole('button', { name: 'Go to last slide' }); // await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
  const prevSlideButton = page.getByRole('button', { name: 'Previous slide' }); // await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
  const nextSlideButton = page.getByRole('button', { name: 'Next slide' }); // await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');

  await expect(goToLastSlideButton).toBeVisible();
  await expect(prevSlideButton).toBeHidden();
  await expect(nextSlideButton).toBeVisible();

  await trackLifecycleStatus(page);

  const initialStatus = await getLifecycleStatus(page);
  expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0); // tracking was started after page was loaded
  expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(0); // tracking was started after page was loaded

  await nextSlideButton.click();

  await expect(goToLastSlideButton).toBeHidden();
  await expect(prevSlideButton).toBeVisible();
  await expect(nextSlideButton).toBeVisible();

  const finalStatus = await getLifecycleStatus(page);
  expect(finalStatus.componentDidUpdate['p-button-pure'], 'final componentDidUpdate: p-button-pure').toBe(1);
  expect(finalStatus.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(1);
  expect(finalStatus.componentDidLoad.all, 'final componentDidLoad: all').toBe(0);
});
