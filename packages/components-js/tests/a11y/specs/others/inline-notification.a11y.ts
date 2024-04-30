import { getAttribute, setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { InlineNotificationState } from '@porsche-design-system/components/dist/types/bundle';
import { INLINE_NOTIFICATION_STATES } from '@porsche-design-system/components/src/components/inline-notification/inline-notification-utils';

const initInlineNotification = (
  page: Page,
  opts?: {
    state?: InlineNotificationState;
    persistent?: boolean;
    dismissButton?: boolean;
    actionLabel?: string;
  }
): Promise<void> => {
  const { state, persistent, dismissButton = true, actionLabel } = opts || {};
  const attributes = [
    'heading="Some inline-notification heading."',
    'description="Some inline-notification description."',
    state && `state="${state}"`,
    persistent && 'persistent',
    `dismiss-button="${dismissButton}"`,
    actionLabel && `action-label="${actionLabel}"`,
  ]
    .filter((x) => x)
    .join(' ');

  // <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
  return setContentWithDesignSystem(
    page,
    `
    <p-inline-notification ${attributes}>
    </p-inline-notification>`
  );
};

for (const notificationState of INLINE_NOTIFICATION_STATES) {
  test(`should expose correct accessibility tree properties for state: ${notificationState}`, async ({ page }) => {
    await initInlineNotification(page, { state: notificationState });
    const wrapper = await page.$('p-inline-notification .content');

    // await expectA11yToMatchSnapshot(page, wrapper, { interestingOnly: false });
    expect(await getAttribute(wrapper, 'aria-live')).toBeDefined();
  });
}
