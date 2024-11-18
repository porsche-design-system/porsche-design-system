import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import type { TagName } from '@porsche-design-system/shared';
import { setContentWithDesignSystem, sleep } from '../helpers';

const getReadyAmount = (page: Page, selector?: string): Promise<number> =>
  page.evaluate((selector: string) => {
    const el = selector ? document.querySelector(selector) : undefined;
    return (window as any).porscheDesignSystem.componentsReady(el);
  }, selector);

const addComponent = (page: Page, tagName: TagName) =>
  page.evaluate((tagName: string) => {
    const el = document.createElement(tagName);
    document.body.appendChild(el);
  }, tagName);

test.describe('with initialized design system', () => {
  test('should work for no component', async ({ page }) => {
    await setContentWithDesignSystem(page, ``);
    expect(await getReadyAmount(page)).toBe(0);
  });

  test('should work for single component', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await getReadyAmount(page)).toBe(1);
  });

  test('should work for multiple components', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-button>Button1</p-button><p-button>Button2</p-button>`);
    expect(await getReadyAmount(page)).toBe(2);
  });

  test('should work for prefixed component', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <script type="text/javascript">porscheDesignSystem.load({ prefix: 'my-prefix' });</script>
      <my-prefix-p-button>Button</my-prefix-p-button>`
    );
    expect(await getReadyAmount(page)).toBe(1);
  });

  test('should work for nested component', async ({ page }) => {
    await setContentWithDesignSystem(page, `<div><p-button>Button</p-button></div>`);
    expect(await getReadyAmount(page)).toBe(1);
  });

  test('should work with HTMLElement parameter', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-button>Button</p-button><div id="sidebar"><p-button>Button</p-button></div>`
    );
    expect(await getReadyAmount(page, '#sidebar')).toBe(1);
    expect(await getReadyAmount(page)).toBe(2); // for document.body
  });

  test('should ignore other custom web components', async ({ page }) => {
    await setContentWithDesignSystem(page, '<x-button>hi</x-button>');
    expect(await getReadyAmount(page)).toBe(0);
  });

  test('should work when called multiple times', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-button>Button</p-button>`);
    expect(await getReadyAmount(page)).toBe(1);
    expect(await getReadyAmount(page)).toBe(1);
    expect(await getReadyAmount(page)).toBe(1);
  });

  test('should work when a component is added later', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-button>Button1</p-button><p-button>Button2</p-button>`);
    expect(await getReadyAmount(page)).toBe(2);

    await addComponent(page, 'p-text');
    expect(await getReadyAmount(page)).toBe(3);
  });

  test('should work in parallel', async ({ page }) => {
    await setContentWithDesignSystem(page, ``);

    let val1;
    let val2;
    await addComponent(page, 'p-text');

    getReadyAmount(page).then((x) => (val1 = x));
    getReadyAmount(page).then((x) => (val2 = x));

    expect(await getReadyAmount(page)).toBe(1);
    expect(val1).toBe(1);
    expect(val1).toBe(val2);

    await addComponent(page, 'p-button');

    getReadyAmount(page).then((x) => (val1 = x));
    getReadyAmount(page).then((x) => (val2 = x));

    expect(await getReadyAmount(page)).toBe(2);
    expect(val1).toBe(2);
    expect(val1).toBe(val2);
  });
});

test.describe('without initialized design system', () => {
  const initPDS = (page: Page): Promise<void> => {
    return page.evaluate(() => {
      const el = document.createElement('script');
      el.textContent = 'porscheDesignSystem.load()';
      document.body.append(el);
    });
  };

  const interceptAndDelayJsRequests = async (page: Page): Promise<void> => {
    await page.route('**/*', async (route) => {
      if (route.request().url().endsWith('.js')) {
        await sleep(500);
        await route.continue();
      } else {
        await route.continue();
      }
    });
  };

  const setContentWithDesignSystemWithoutLoadCallAndWaitForComponentsReady = (page: Page): Promise<void> =>
    setContentWithDesignSystem(page, `<p-button>Button</p-button>`, {
      withoutLoadCall: true,
      withoutWaitForComponentsReady: true,
    });

  test('should work for single component', async ({ page }) => {
    await setContentWithDesignSystemWithoutLoadCallAndWaitForComponentsReady(page);
    await initPDS(page);

    expect(await getReadyAmount(page)).toBe(1);
  });

  test('should work for single component with delayed js requests', async ({ page }) => {
    await interceptAndDelayJsRequests(page);
    await setContentWithDesignSystemWithoutLoadCallAndWaitForComponentsReady(page);
    await initPDS(page);

    expect(await getReadyAmount(page)).toBe(1);
  });
});
