import { getVisualRegressionStatesTester, vrtTest } from '@porsche-design-system/shared/testing';
import { type Component } from '../helpers';
import { describe } from 'node:test';
import { Page } from 'puppeteer';

const components: Component[] = ['button'];

const forceThemeAutoLight = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.getElementById('app').classList.add('auto-dark-mode');
    document.querySelectorAll('[theme="dark"]').forEach((el) => el.setAttribute('theme', 'auto'));
  });
};

const forceThemeAutoDark = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    document.getElementById('app').classList.add('auto-dark-mode');
    document.querySelectorAll(':not([theme="dark"])').forEach((el) => el.setAttribute('theme', 'auto'));
  });
};

const autoDarkModeTest = async (component: Component, scheme: 'light' | 'dark'): Promise<boolean> => {
  return await vrtTest(getVisualRegressionStatesTester(), `${component}-auto-dark-mode-${scheme}`, `/#${component}`, {
    prefersColorScheme: scheme,
    scenario: scheme === 'dark' ? forceThemeAutoDark : forceThemeAutoLight,
  });
};

describe('auto dark mode', () => {
  it.each(components)(
    'should have no visual regression for component with prefers-color-scheme light: %s',
    async (component) => {
      expect(await autoDarkModeTest(component, 'light')).toBeFalsy();
    }
  );

  it.each(components)(
    'should have no visual regression for component with prefers-color-scheme dark: %s',
    async (component) => {
      expect(await autoDarkModeTest(component, 'dark')).toBeFalsy();
    }
  );
});
