import type { Page } from '@playwright/test';
import { goto as gotoAndWait } from '@porsche-design-system/testing/playwright';

// it looks like vue event binding is a bit unreliable and happens after onMounted
export const goto = (page: Page, url: string): Promise<void> => gotoAndWait(page, url, { delayAfterReady: 100 });
