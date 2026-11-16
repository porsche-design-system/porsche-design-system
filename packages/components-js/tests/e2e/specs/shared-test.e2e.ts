import { expect, test } from '@porsche-design-system/testing/playwright';

const fetchText = (url: string) => fetch(url).then((response) => response.text());

test.describe('console guard', () => {
  test('fails on an undeclared console.error', async ({ page }) => {
    test.fail();
    await page.evaluate(() => console.error('boom'));
  });

  test('fails on an undeclared console.warn', async ({ page }) => {
    test.fail();
    await page.evaluate(() => console.warn('boom'));
  });

  test('fails on an uncaught page error', async ({ page }) => {
    test.fail();
    await page.evaluate(() =>
      setTimeout(() => {
        throw new Error('boom');
      })
    );
    await page.waitForTimeout(50);
  });

  test.describe('with a declared message', () => {
    test.use({ expectedConsole: [/boom/] });

    test('passes on a declared message', async ({ page }) => {
      await page.evaluate(() => console.error('boom'));
    });

    test('passes on a declared page error', async ({ page }) => {
      await page.evaluate(() =>
        setTimeout(() => {
          throw new Error('boom');
        })
      );
      await page.waitForTimeout(50);
    });
  });

  test('sees a message logged on the last line of the test', async ({ page }) => {
    test.fail();
    await page.evaluate(() => console.warn('late'));
  });

  test('covers a second page of the context', async ({ context }) => {
    test.fail();
    const second = await context.newPage();
    await second.evaluate(() => console.error('boom'));
  });
});

test.describe('request routing', () => {
  test.describe('with a stubbed origin', () => {
    test.use({
      externalRequests: { stubs: { 'https://registry.npmjs.org': { json: { versions: { '1.0.0': {} } } } } },
    });

    test('answers a stubbed origin', async ({ page }) => {
      const json = await page.evaluate(() =>
        fetch('https://registry.npmjs.org/@porsche-design-system/components-js').then((response) => response.json())
      );
      expect(json).toEqual({ versions: { '1.0.0': {} } });
    });
  });

  test('stubs an unknown image', async ({ page }) => {
    await page.setContent(
      `<img src="https://images.invalid/a.png" onload="this.dataset.event = 'load'" onerror="this.dataset.event = 'error'">`
    );
    const img = page.locator('img');
    await expect(img).toHaveAttribute('data-event', 'load');
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(64);
  });

  test("a spec's context route wins", async ({ page, context }) => {
    await context.route('https://stackblitz.com/**', (route) => route.fulfill({ body: 'spec' }));
    expect(await page.evaluate(fetchText, 'https://stackblitz.com/x')).toBe('spec');
  });

  test("a spec's page route wins", async ({ page }) => {
    await page.route('https://stackblitz.com/**', (route) => route.fulfill({ body: 'spec' }));
    expect(await page.evaluate(fetchText, 'https://stackblitz.com/x')).toBe('spec');
  });

  test.describe('with any console message declared', () => {
    test.use({ expectedConsole: [/.*/] });

    test('fails on an aborted request', async ({ page }) => {
      test.fail();
      await page.evaluate(() => fetch('https://unknown.invalid/x').catch(() => {}));
    });

    test('ends cleanly with a request in flight', async ({ page }) => {
      await page.evaluate(() => {
        fetch('https://cdn.ui.porsche.com/porsche-design-system/components/never.js');
      });
    });
  });

  test.describe('with routing switched off', () => {
    test.use({ externalRequests: false, expectedConsole: [/.*/] });

    test('routing can be switched off', async ({ page }) => {
      await page.setContent(
        `<img src="https://images.invalid/a.png" onload="this.dataset.event = 'load'" onerror="this.dataset.event = 'error'">`
      );
      const img = page.locator('img');
      await expect(img).toHaveAttribute('data-event', 'error');
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(0);
    });
  });
});
