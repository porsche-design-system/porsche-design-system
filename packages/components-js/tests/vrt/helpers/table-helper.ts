import { type Page } from '@playwright/test';

export const setSortToAllTableHeadCell = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.querySelectorAll('p-table-head-cell').forEach((el) => {
      (el as any).sort = { id: 'some-id', active: true, direction: 'asc' };
    });
  });
};
