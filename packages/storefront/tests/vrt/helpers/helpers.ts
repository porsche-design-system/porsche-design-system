import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const closeSidebars = async (page: Page) => {
  const flyoutDismissButtons = page.getByRole('dialog').getByText('Dismiss flyout');

  const count = await flyoutDismissButtons.count();

  for (let i = 0; i < count; i++) {
    const button = flyoutDismissButtons.nth(i);
    if (await button.isVisible()) {
      await button.click();
      await expect(button).toBeHidden();
    }
  }
};
