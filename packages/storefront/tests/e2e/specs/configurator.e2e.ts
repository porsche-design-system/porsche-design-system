import { expect, type Page, test } from '@playwright/test';
import { FRAMEWORK_TYPES, type Framework } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';

const selectMarkupFramework = async (page: Page, framework: Framework) => {
  const buttonFrameworkMap: Record<Framework, string> = {
    'vanilla-js': 'Vanilla JS',
    react: 'React',
    angular: 'Angular',
    vue: 'Vue',
  };
  const playground = page.locator('.playground');
  const tabs = playground.locator('p-tabs-bar');
  await expect(playground.locator('p-tabs-bar.framework-select')).toBeVisible();
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
      await page.goto('/components/accordion/configurator');

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
      await page.goto('/components/accordion/configurator');

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

// Tests input text of and checks if default is handled (Button)
test.describe('properties > input-text', () => {
  test('should reflect input correctly for vanilla-js', async ({ page }) => {
    await page.goto('/components/button/configurator');

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

    await page.locator('p-input-text').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for react', async ({ page }) => {
    await page.goto('/components/button/configurator');

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

    await page.locator('p-input-text').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for angular', async ({ page }) => {
    await page.goto('/components/button/configurator');

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

    await page.locator('p-input-text').filter({ hasText: 'Name' }).getByText('Reset').click();
    // This is a stencil bug when setting a reflected prop to undefined, it will be set to null instead (https://github.com/ionic-team/stencil/issues/3586)
    await expect(button).toHaveJSProperty('name', null);
    await expect(markup).not.toContainText('name');
  });
  test('should reflect input correctly for vue', async ({ page }) => {
    await page.goto('/components/button/configurator');

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

    await page.locator('p-input-text').filter({ hasText: 'Name' }).getByText('Reset').click();
    await expect(button).toHaveJSProperty('name', undefined);
    await expect(markup).not.toContainText('name');
  });
});

// Tests input of type number and checks if default is handled
test.describe('properties > input number', () => {
  const getTag = (framework: Framework, tag: string) => {
    switch (framework) {
      case 'vanilla-js':
        return tag;
      case 'react':
        return pascalCase(tag);
      case 'angular':
        return tag;
      case 'vue':
        return pascalCase(tag);
    }
  };

  const getProp = (framework: Framework, prop: string, value?: string) => {
    // Without value, we can check if a prop exists or not
    if (value === undefined) {
      switch (framework) {
        case 'vanilla-js':
          return `${prop}`;
        case 'react':
          return camelCase(prop);
        case 'angular':
          return `[${camelCase(prop)}]`;
        case 'vue':
          return `:${camelCase(prop)}`;
      }
    }
    switch (framework) {
      case 'vanilla-js':
        return `${prop}="${value}"`;
      case 'react':
        return `${camelCase(prop)}={${value}}`;
      case 'angular':
        return `[${camelCase(prop)}]="${value}"`;
      case 'vue':
        return `:${camelCase(prop)}="${value}"`;
    }
  };

  // Pagination active-page is required and should not be clearable
  test.describe('> p-pagination', () => {
    for (const framework of FRAMEWORK_TYPES) {
      test(`should reflect selection correctly for ${framework}`, async ({ page }) => {
        const componentTag = getTag(framework as Framework, 'p-pagination');
        await page.goto('/components/pagination/configurator');
        await selectMarkupFramework(page, framework);

        const markup = page.locator('.markup');
        const pagination = page.locator('.demo p-pagination');

        await expect(pagination).toBeVisible();
        await expect(markup).toContainText(componentTag);

        const textField = page.locator('input[name="activePage"]');
        await expect(pagination).toHaveJSProperty('activePage', 1);
        await expect(textField).toHaveJSProperty('value', '1');
        await expect(markup).toContainText(getProp(framework as Framework, 'active-page', '1'));

        await textField.press('Backspace');

        await expect(pagination).toHaveJSProperty('activePage', 1);
        await expect(textField).toHaveJSProperty('value', '');
        await expect(markup).toContainText(getProp(framework as Framework, 'active-page', '1'));

        await textField.fill('2');
        await expect(pagination).toHaveJSProperty('activePage', 2);
        await expect(markup).toContainText(getProp(framework as Framework, 'active-page', '2'));

        await page.locator('p-input-number').filter({ hasText: 'Active Page' }).getByText('Reset').click();

        await expect(pagination).toHaveJSProperty('activePage', 1);
        await expect(textField).toHaveJSProperty('value', '1');
        await expect(markup).toContainText(getProp(framework as Framework, 'active-page', '1'));
      });
    }
  });

  // Textarea max-length is not required and should be clearable
  test.describe('> p-textarea', () => {
    for (const framework of FRAMEWORK_TYPES) {
      test(`should reflect selection correctly for ${framework}`, async ({ page }) => {
        const componentTag = getTag(framework as Framework, 'p-textarea');
        await page.goto('/components/textarea/configurator');
        await selectMarkupFramework(page, framework);

        const markup = page.locator('.markup');
        const textarea = page.locator('.demo p-textarea');

        await expect(textarea).toBeVisible();
        await expect(markup).toContainText(componentTag);

        const textField = page.locator('input[name="maxLength"]');
        await expect(textarea).toHaveJSProperty('maxLength', undefined);
        await expect(textField).toHaveJSProperty('value', '');
        await expect(markup).not.toContainText(getProp(framework as Framework, 'max-length'));

        await textField.fill('1');

        await expect(textarea).toHaveJSProperty('maxLength', 1);
        await expect(textField).toHaveJSProperty('value', '1');
        await expect(markup).toContainText(getProp(framework as Framework, 'max-length', '1'));

        await textField.press('Backspace');
        await expect(textarea).toHaveJSProperty('maxLength', undefined);
        await expect(textField).toHaveJSProperty('value', '');
        await expect(markup).not.toContainText(getProp(framework as Framework, 'max-length'));

        await textField.fill('2');

        await expect(textarea).toHaveJSProperty('maxLength', 2);
        await expect(textField).toHaveJSProperty('value', '2');
        await expect(markup).toContainText(getProp(framework as Framework, 'max-length', '2'));

        await page.locator('p-input-number').filter({ hasText: 'Max Length' }).getByText('Reset').click();

        await expect(textarea).toHaveJSProperty('maxLength', undefined);
        await expect(textField).toHaveJSProperty('value', '');
        await expect(markup).not.toContainText(getProp(framework as Framework, 'max-length'));
      });
    }
  });

  // Tabs Bar active-tab-index is not required but since its controlled it should not be clearable
  test.describe('> p-tabs-bar', () => {
    for (const framework of FRAMEWORK_TYPES) {
      test(`should reflect selection correctly for ${framework}`, async ({ page }) => {
        const componentTag = getTag(framework as Framework, 'p-tabs-bar');
        await page.goto('/components/tabs-bar/configurator');
        await selectMarkupFramework(page, framework);

        const markup = page.locator('.markup');
        const tabsBar = page.locator('.demo p-tabs-bar');

        await expect(tabsBar).toBeVisible();
        await expect(markup).toContainText(componentTag);

        const textField = page.locator('input[name="activeTabIndex"]');
        await expect(tabsBar).toHaveJSProperty('activeTabIndex', 0);
        await expect(textField).toHaveJSProperty('value', '0');
        if (framework === 'vanilla-js') {
          await expect(markup).not.toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        } else {
          await expect(markup).toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        }

        await textField.press('Backspace');
        await expect(tabsBar).toHaveJSProperty('activeTabIndex', 0);
        await expect(textField).toHaveJSProperty('value', '');
        if (framework === 'vanilla-js') {
          await expect(markup).not.toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        } else {
          await expect(markup).toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        }

        await textField.fill('2');
        await expect(tabsBar).toHaveJSProperty('activeTabIndex', 2);
        if (framework === 'vanilla-js') {
          await expect(markup).not.toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        } else {
          await expect(markup).toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        }

        await page.locator('p-input-number').filter({ hasText: 'Active Tab Index' }).getByText('Reset').click();

        await expect(tabsBar).toHaveJSProperty('activeTabIndex', 0);
        await expect(textField).toHaveJSProperty('value', '0');
        if (framework === 'vanilla-js') {
          await expect(markup).not.toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        } else {
          await expect(markup).toContainText(getProp(framework as Framework, 'active-tab-index', 'activeTabIndex'));
        }
      });
    }
  });
});

// TODO: Test default value is deleted again for all types
