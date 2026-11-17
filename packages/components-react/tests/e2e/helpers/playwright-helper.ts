import { type Page } from '@playwright/test';
import { getLifecycleTrackingScript } from '@porsche-design-system/testing/playwright';

export const trackLifecycleStatus = async (page: Page): Promise<void> => {
  await page.evaluate((text) => {
    const script = document.createElement('script');
    script.text = text;
    document.body.appendChild(script);
  }, getLifecycleTrackingScript());
};
