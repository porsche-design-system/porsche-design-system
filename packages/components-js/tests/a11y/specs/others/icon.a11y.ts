import { setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { IconName } from '@porsche-design-system/components/dist/types/bundle';

type InitOptions = {
  name?: IconName;
};

const initIcon = async (page: Page, opts?: InitOptions): Promise<void> => {
  const { name } = opts || {};

  const nameAttribute = name ? `name="${name}"` : '';
  const attributes = `${nameAttribute}`;

  const content = `<p-icon ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

  await setContentWithDesignSystem(page, content);
};

const getIconImg = async (page: Page) => page.locator('p-icon img');

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initIcon(page);
  const icon = await getIconImg(page);

  // await expectA11yToMatchSnapshot(page, icon);
});
