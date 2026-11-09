import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search-combobox-option-list` – a search field filters selectable options in a controlled popover.
 * The arrow keys move a highlight, and Enter writes that choice into the field.
 */

const url = getExampleUrl('patterns-forms-search-combobox-option-list');

const popover = (page: Page) => page.locator('#dealer-search-popover');
const submitPopover = (page: Page) => page.locator('#dealer-search-popover-button');
const field = (page: Page) => page.locator('#dealer-search input');

/**
 * Ids a combobox relationship in the browser accessibility tree.
 *
 * The page passes element references for `aria-controls` and `aria-activedescendant` through the `aria` prop. This
 * reads the relationship the tree actually exposes. CDP is Chromium-only.
 */
const relationshipIds = async (page: Page, name: 'controls' | 'activedescendant'): Promise<string[]> => {
  const client = await page.context().newCDPSession(page);
  try {
    await client.send('Accessibility.enable');
    const { nodes } = await client.send('Accessibility.getFullAXTree');
    const combobox = nodes.find((node) => node.role?.value === 'combobox' && node.name?.value === 'City');
    const property = combobox?.properties?.find((item) => item.name === name);
    return (property?.value.relatedNodes ?? []).flatMap((node) => (node.idref ? [node.idref] : []));
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
  expect(await isOpen(submitPopover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('role', 'combobox');
  await expect(field(page)).toHaveAttribute('aria-autocomplete', 'list');
  await expect(field(page)).toHaveAttribute('aria-haspopup', 'listbox');
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search' })).toHaveAttribute('aria-disabled', 'true');
  await expect(page.getByRole('button', { name: 'Search' })).toHaveAttribute(
    'aria-description',
    'Select a city from the list to search first.'
  );
  await expect
    .poll(() => field(page).evaluate((input) => input.ariaControlsElements?.[0]?.id === 'dealer-search-results'))
    .toBe(true);
});

test('filters dealer choices and writes the highlighted one into the field', async ({ page, browserName }) => {
  await setupExamplePage(page, url);

  await field(page).fill('stu');

  const stuttgart = page.getByRole('option', { name: 'Stuttgart', exact: true });
  await expect(stuttgart).toBeVisible();
  await expect(page.getByRole('option', { name: 'Stuttgart Airport' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Berlin', exact: true })).toBeHidden();
  expect(await isOpen(popover(page))).toBe(true);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'true');
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipIds(page, 'controls')).toEqual(['dealer-search-results']);
  }

  await page.keyboard.press('ArrowDown');
  await expect(stuttgart).toHaveClass(/bg-frosted/);
  await expect(stuttgart).toHaveAttribute('aria-selected', 'false');
  await expect(stuttgart.locator('p-icon')).toBeHidden();
  await expect
    .poll(() =>
      field(page).evaluate((input) => input.ariaActiveDescendantElement?.id === 'dealer-search-result-stuttgart')
    )
    .toBe(true);
  if (browserName === 'chromium') {
    await expect.poll(() => relationshipIds(page, 'activedescendant')).toEqual(['dealer-search-result-stuttgart']);
  }

  await page.keyboard.press('Enter');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(field(page)).toHaveValue('Stuttgart');
  await expect(stuttgart).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('ArrowDown');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(stuttgart.locator('p-icon')).toBeVisible();

  await field(page).fill('stu');
  await expect(stuttgart).toHaveAttribute('aria-selected', 'false');
  await expect(stuttgart.locator('p-icon')).toBeHidden();
});

test('closes on Escape without clearing the query and stays closed until the query changes', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  await input.fill('ham');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('option', { name: 'Hamburg', exact: true })).toBeVisible();

  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('ham');
  await expect(input).toHaveAttribute('aria-expanded', 'false');

  await input.focus();
  expect(await isOpen(popover(page))).toBe(false);

  await input.fill('hamb');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(page.getByRole('option', { name: 'Hamburg', exact: true })).toBeVisible();
});

test('reopens the list with ArrowDown and highlights the first match', async ({ page }) => {
  await setupExamplePage(page, url);
  const input = field(page);

  const hamburg = page.getByRole('option', { name: 'Hamburg', exact: true });

  await input.fill('ham');
  await expect(hamburg).toBeVisible();
  await page.keyboard.press('Escape');
  expect(await isOpen(popover(page))).toBe(false);

  await page.keyboard.press('ArrowDown');
  expect(await isOpen(popover(page))).toBe(true);
  await expect(hamburg).toHaveClass(/bg-frosted/);
});

test('shows a popover on focus and hover while the Search button is disabled, and enables it once a city is chosen', async ({
  page,
}) => {
  await setupExamplePage(page, url);
  const input = field(page);
  const submitHost = page.locator('#dealer-search-submit');
  const submit = page.getByRole('button', { name: 'Search' });

  await submitHost.focus();
  expect(await isOpen(submitPopover(page))).toBe(true);

  await input.focus();
  expect(await isOpen(submitPopover(page))).toBe(false);

  await submitHost.hover();
  expect(await isOpen(submitPopover(page))).toBe(true);

  await input.fill('ber');
  await page.getByRole('option', { name: 'Berlin', exact: true }).click();
  expect(await isOpen(popover(page))).toBe(false);
  expect(await isOpen(submitPopover(page))).toBe(false);
  await expect(input).toHaveValue('Berlin');
  await expect(submit).not.toHaveAttribute('aria-disabled');
  await expect(submit).not.toHaveAttribute('aria-description');

  await submitHost.focus();
  expect(await isOpen(submitPopover(page))).toBe(false);

  await submit.click();
  expect(await isOpen(popover(page))).toBe(false);
  await expect(input).toHaveValue('Berlin');

  await input.fill('ber');
  await expect(submit).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Berlin');
  await expect(submit).not.toHaveAttribute('aria-disabled');
});

test('announces the result count and when nothing matches', async ({ page }) => {
  await setupExamplePage(page, url);

  await field(page).fill('stu');
  await expect(page.locator('#dealer-search-status')).toHaveText('2 results available');

  await field(page).fill('bochum');
  await expect(page.locator('#dealer-search-status')).toHaveText('1 result available');

  await field(page).fill('zzz');
  await expect(page.locator('#dealer-search-empty')).toBeVisible();
  await expect(field(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#dealer-search-status')).toHaveText('No results found');

  await field(page).fill('');
  await expect(page.locator('#dealer-search-status')).toHaveText('');
});
