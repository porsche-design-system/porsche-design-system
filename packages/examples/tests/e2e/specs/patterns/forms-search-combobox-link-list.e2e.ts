import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search-combobox-link-list` – a search field filters navigation links in a controlled popover.
 * The arrow keys move a highlight, and Enter follows that link.
 */

const url = getExampleUrl('patterns-forms-search-combobox-link-list');

const popover = (page: Page) => page.locator('#dealer-search-popover');
const field = (page: Page) => page.locator('#dealer-search input');

/**
 * Names of the nodes a combobox relationship points at in the browser accessibility tree.
 *
 * String `aria-controls` and `aria-activedescendant` cannot name elements from inside the field's shadow tree. The
 * page sets the element references instead, and this reads the relationship the tree actually exposes. CDP is
 * Chromium-only.
 */
const relationshipNames = async (page: Page, name: 'controls' | 'activedescendant'): Promise<string[]> => {
  const client = await page.context().newCDPSession(page);
  try {
    await client.send('Accessibility.enable');
    const { nodes } = await client.send('Accessibility.getFullAXTree');
    const combobox = nodes.find((node) => node.role?.value === 'combobox' && node.name?.value === 'City');
    const property = combobox?.properties?.find((item) => item.name === name);
    const targets = new Set((property?.value.relatedNodes ?? []).map((node) => node.backendDOMNodeId));
    return nodes
      .filter((node) => node.backendDOMNodeId !== undefined && targets.has(node.backendDOMNodeId))
      .map((node) => String(node.name?.value ?? ''));
  } finally {
    await client.detach();
  }
};

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('role', 'combobox');
  await expect(field(page)).toHaveAttribute('aria-autocomplete', 'list');
  await expect(field(page)).toHaveAttribute('aria-haspopup', 'dialog');
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect
    .poll(() => field(page).evaluate((input) => input.ariaControlsElements?.[0]?.id === 'dealer-search-dialog'))
    .toBe(true);
});

test('filters dealer links and follows the highlighted one', async ({ page, browserName }) => {
  await setupExamplePage(page, url);

  await field(page).fill('stu');

  const stuttgart = page.getByRole('link', { name: 'Stuttgart', exact: true });
  await expect(stuttgart).toBeVisible();
  await expect(page.getByRole('link', { name: 'Stuttgart Airport' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Berlin', exact: true })).toBeHidden();
  expect(await isOpen(popover(page))).toBe(true);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'true');
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipNames(page, 'controls')).toEqual(['Dealer suggestions']);
  }

  await page.keyboard.press('ArrowDown');
  await expect(stuttgart.locator('xpath=ancestor::p-link-pure[1]')).toHaveJSProperty('active', true);
  await expect
    .poll(() => field(page).evaluate((input) => input.ariaActiveDescendantElement?.textContent?.trim()))
    .toBe('Stuttgart');
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipNames(page, 'activedescendant')).toEqual(['Stuttgart']);
  }

  await page.keyboard.press('Enter');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(field(page)).toHaveValue('stu');
  await expect(page).toHaveURL(/#dealer-stuttgart$/);
  await expect(stuttgart).toHaveAttribute('aria-current', 'page');
});

test('follows an exact match on Enter when nothing is highlighted', async ({ page }) => {
  await setupExamplePage(page, url);

  await field(page).fill('Hamburg');
  await expect(page.getByRole('link', { name: 'Hamburg Airport' })).toBeVisible();

  await page.keyboard.press('Enter');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(page).toHaveURL(/#dealer-hamburg$/);
  await expect(field(page)).toHaveValue('Hamburg');
});

test('follows a clicked link and leaves the query unchanged', async ({ page }) => {
  await setupExamplePage(page, url);

  await field(page).fill('ber');
  await page.getByRole('link', { name: 'Berlin Brandenburg' }).click();

  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveValue('ber');
  await expect(page).toHaveURL(/#dealer-berlin-brandenburg$/);
});

test('closes on Escape without clearing the query and stays closed until the query changes', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  await input.fill('ham');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('link', { name: 'Hamburg', exact: true })).toBeVisible();

  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('ham');
  await expect(input).toHaveAttribute('aria-expanded', 'false');

  await input.focus();
  expect(await isOpen(popover(page))).toBe(false);

  await input.fill('hamb');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('link', { name: 'Hamburg', exact: true })).toBeVisible();
});

test('reopens the list with ArrowDown and highlights the first match', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  const hamburg = page.getByRole('link', { name: 'Hamburg', exact: true });

  await input.fill('ham');
  await expect(hamburg).toBeVisible();
  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);

  await page.keyboard.press('ArrowDown');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(hamburg.locator('xpath=ancestor::p-link-pure[1]')).toHaveJSProperty('active', true);
});

test('announces the result count and when nothing matches', async ({ page }) => {
  await setupExamplePage(page, url);

  await field(page).fill('stu');
  await expect(page.locator('#dealer-search-status')).toHaveText('2 results available');

  await field(page).fill('bochum');
  await expect(page.locator('#dealer-search-status')).toHaveText('1 result available');

  await field(page).fill('zzz');
  await expect(page.locator('#dealer-search-empty')).toBeVisible();
  await expect(page.locator('#dealer-search-status')).toHaveText('No results found');

  await field(page).fill('');
  await expect(page.locator('#dealer-search-status')).toHaveText('');
});
