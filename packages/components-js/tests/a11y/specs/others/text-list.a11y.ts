import { setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const initTextList = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `
    <p-text-list>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick <a onclick="return false;" href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>
        The quick brown fox jumps over the lazy dog
        <p-text-list>
          <p-text-list-item>
            The quick brown fox jumps over the lazy dog
          </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
    </p-text-list>`
  );
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initTextList(page);
  const getList = (page: Page) => page.locator('p-text-list [role="list"]');

  // await expectA11yToMatchSnapshot(page, await getList(), { interestingOnly: false });
});
