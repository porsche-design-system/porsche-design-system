import type { Framework } from '@/models/framework';
import { type Page, expect, test } from '@playwright/test';

const selectMarkupFramework = async (page: Page, framework: Framework) => {
  const buttonFrameworkMap: Record<Framework, string> = {
    'vanilla-js': 'Vanilla JS',
    react: 'React',
    next: 'React',
    angular: 'Angular',
    vue: 'Vue',
  };
  const playground = page.locator('.playground');
  const tabs = playground.locator('p-tabs-bar');
  await expect(playground.locator('p-tabs-bar')).toBeVisible();
  // await tabs.evaluate(
  //   (el, { buttonFrameworkMap, framework }) =>
  //     ((el as any).activeTabIndex = Object.keys(buttonFrameworkMap).indexOf(framework)),
  //   {
  //     buttonFrameworkMap,
  //     framework,
  //   }
  // );
  await playground.getByText(buttonFrameworkMap[framework]).click();
  await expect(playground.getByRole('tab', { name: buttonFrameworkMap[framework] })).toHaveAttribute(
    'aria-selected',
    'true'
  );
};

// Tests select input of type string[] and checks if default is handled (Accordion)
const selectStringProperty: { framework: Framework; expectedTag: string; sizePropText: string }[] = [
  { framework: 'vanilla-js', expectedTag: 'p-accordion', sizePropText: 'size="medium"' },
  { framework: 'react', expectedTag: 'PAccordion', sizePropText: 'size="medium"' },
  { framework: 'angular', expectedTag: 'p-accordion', sizePropText: 'size="medium"' },
  { framework: 'vue', expectedTag: 'PAccordion', sizePropText: 'size="medium"' },
];

test.describe('properties > select', () => {
  for (const { framework, expectedTag, sizePropText } of selectStringProperty) {
    test(`should reflect selection correctly for ${framework}`, async ({ page }) => {
      await page.goto('/components/accordion/examples');

      await selectMarkupFramework(page, framework);
      const markup = page.locator('.markup');
      const accordion = page.locator('.demo p-accordion');

      await expect(accordion).toBeVisible();
      await expect(accordion).toHaveJSProperty('size', 'small');
      await expect(markup).toContainText(expectedTag);

      const sizeSelect = page.locator('p-select[name="size"]');
      await expect(sizeSelect).toBeVisible();
      await expect(sizeSelect).toHaveJSProperty('value', 'small');
      await expect(markup).not.toContainText('size');

      await sizeSelect.click();
      await sizeSelect.locator('p-select-option').last().click();
      await expect(markup).toContainText(sizePropText);
      await expect(accordion).toHaveJSProperty('size', 'medium');

      await sizeSelect.getByText('Reset').click();
      await expect(sizeSelect).toHaveJSProperty('value', 'small');
      await expect(accordion).toHaveJSProperty('size', 'small');
      await expect(markup).not.toContainText('size');
    });
  }
});

// Tests select input of type string[] and checks if default is handled (Accordion)
const changeBooleanProperty: { framework: Framework; expectedTag: string; propString: string }[] = [
  { framework: 'vanilla-js', expectedTag: 'p-accordion', propString: 'compact="true"' },
  { framework: 'react', expectedTag: 'PAccordion', propString: 'compact={true}' },
  { framework: 'angular', expectedTag: 'p-accordion', propString: '[compact]="true"' },
  { framework: 'vue', expectedTag: 'PAccordion', propString: ':compact="true"' },
];

test.describe('properties > switch', () => {
  for (const { framework, expectedTag, propString } of changeBooleanProperty) {
    test(`should reflect selection correctly for ${framework}`, async ({ page }) => {
      await page.goto('/components/accordion/examples');

      await selectMarkupFramework(page, framework);
      const markup = page.locator('.markup');
      const accordion = page.locator('.demo p-accordion');

      await expect(accordion).toBeVisible();
      await expect(markup).toContainText(expectedTag);

      // Initial state
      const compactSwitch = page.locator('p-switch').filter({ hasText: 'Compact' });
      await expect(compactSwitch).toHaveJSProperty('checked', false);
      await expect(accordion).toHaveJSProperty('compact', undefined);
      await expect(markup).not.toContainText('compact');

      // Change prop
      await compactSwitch.click();
      await expect(compactSwitch).toHaveJSProperty('checked', true);
      await expect(markup).toContainText(propString);
      await expect(accordion).toHaveJSProperty('compact', true);

      // Reset prop
      await page.locator('p-switch + p-tag button').click();
      await expect(compactSwitch).toHaveJSProperty('checked', false);
      await expect(accordion).toHaveJSProperty('compact', undefined);
      await expect(markup).not.toContainText('compact');
    });
  }
});

// Tests text input of type string and checks if default is handled (Button)
test.describe('properties > text-field', () => {
  test('should reflect input correctly for vanilla-js', async ({ page }) => {
    await page.goto('/components/button/examples');

    const markup = page.locator('.markup');
    const button = page.locator('.demo p-button');

    await expect(button).toBeVisible();
    await expect(markup).toContainText('p-button');

    const nameTextField = page.locator('input[name="name"]');
    await expect(nameTextField).toHaveJSProperty('value', '');
    await expect(markup).not.toContainText('name');

    const testInput = 'test';
    await nameTextField.fill(testInput);
    await expect(button).toHaveJSProperty('name', testInput);
    await expect(markup).toContainText(`name="${testInput}"`);

    await nameTextField.fill('');
    await expect(button).toHaveJSProperty('name', '');
    // Default value is for name is undefined but prop is not removed until reset is clicked
    await expect(markup).toContainText('name=""');

    await page.locator('p-text-field-wrapper').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for react', async ({ page }) => {
    await page.goto('/components/button/examples');

    await selectMarkupFramework(page, 'react');

    const markup = page.locator('.markup');
    const button = page.locator('.demo p-button');

    await expect(button).toBeVisible();
    await expect(markup).toContainText('PButton');

    const nameTextField = page.locator('input[name="name"]');
    await expect(nameTextField).toHaveJSProperty('value', '');
    await expect(markup).not.toContainText('name');

    const testInput = 'test';
    await nameTextField.fill(testInput);
    await expect(button).toHaveJSProperty('name', testInput);
    await expect(markup).toContainText(`name="${testInput}"`);

    await nameTextField.fill('');
    await expect(button).toHaveJSProperty('name', '');
    // Default value is for name is undefined but prop is not removed until reset is clicked
    await expect(markup).toContainText('name=""');

    await page.locator('p-text-field-wrapper').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for angular', async ({ page }) => {
    await page.goto('/components/button/examples');

    await selectMarkupFramework(page, 'angular');

    const markup = page.locator('.markup');
    const button = page.locator('.demo p-button');

    await expect(button).toBeVisible();
    await expect(markup).toContainText('p-button');

    const nameTextField = page.locator('input[name="name"]');
    await expect(nameTextField).toHaveJSProperty('value', '');
    await expect(markup).not.toContainText('name');

    const testInput = 'test';
    await nameTextField.fill(testInput);
    await expect(button).toHaveJSProperty('name', testInput);
    await expect(markup).toContainText(`name="${testInput}"`);

    await nameTextField.fill('');
    await expect(button).toHaveJSProperty('name', '');
    // Default value is for name is undefined but prop is not removed until reset is clicked
    await expect(markup).toContainText('name=""');

    await page.locator('p-text-field-wrapper').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for vue', async ({ page }) => {
    await page.goto('/components/button/examples');

    await selectMarkupFramework(page, 'vue');

    const markup = page.locator('.markup');
    const button = page.locator('.demo p-button');

    await expect(button).toBeVisible();
    await expect(markup).toContainText('PButton');

    const nameTextField = page.locator('input[name="name"]');
    await expect(nameTextField).toHaveJSProperty('value', '');
    await expect(markup).not.toContainText('name');

    const testInput = 'test';
    await nameTextField.fill(testInput);
    await expect(button).toHaveJSProperty('name', testInput);
    await expect(markup).toContainText(`name="${testInput}"`);

    await nameTextField.fill('');
    await expect(button).toHaveJSProperty('name', '');
    // Default value is for name is undefined but prop is not removed until reset is clicked
    await expect(markup).toContainText('name=""');

    await page.locator('p-text-field-wrapper').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
});

// TODO: Test default value is deleted again for all types
