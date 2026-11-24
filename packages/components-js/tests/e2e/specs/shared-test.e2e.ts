import type { Frame, Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { setContentWithDesignSystem, waitForAnimationsFinished } from '../helpers';

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

test.describe('motion', () => {
  const readVariables = (page: Page | Frame) =>
    page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return [
        '--p-transition-duration',
        '--p-animation-duration',
        '--p-temporary-spinner-stroke-dasharray',
        '--p-temporary-toast-skip-timeout',
      ].map((name) => style.getPropertyValue(name).trim());
    });
  const off = ['0s', '0s', '40', 'true'];
  const on = ['', '', '40', 'true'];
  const blank = 'data:text/html,<!DOCTYPE html><title>t</title>';

  test('is off after goto', async ({ page }) => {
    await page.goto(blank);
    expect(await readVariables(page)).toEqual(off);
  });

  test('is off after setContent', async ({ page }) => {
    await page.setContent('<p>x</p>');
    expect(await readVariables(page)).toEqual(off);
  });

  test('is off after setContentWithDesignSystem', async ({ page }) => {
    await setContentWithDesignSystem(page, '<p-button>x</p-button>');
    expect(await readVariables(page)).toEqual(off);
  });

  test('stays off after a second navigation', async ({ page }) => {
    await page.goto(blank);
    await page.goto(blank);
    expect(await readVariables(page)).toEqual(off);
  });

  test('is off on a second page of the context', async ({ context }) => {
    const second = await context.newPage();
    await second.setContent('<p>x</p>');
    expect(await readVariables(second)).toEqual(off);
  });

  test('is off inside an iframe', async ({ page }) => {
    await page.setContent('<iframe srcdoc="<p>x</p>"></iframe>');
    expect(await readVariables(page.frames()[1])).toEqual(off);
  });

  test.describe('switched on', () => {
    test.use({ motion: 'on' });

    test('is on after goto', async ({ page }) => {
      await page.goto(blank);
      expect(await readVariables(page)).toEqual(on);
    });

    test('is on after setContent', async ({ page }) => {
      await page.setContent('<p>x</p>');
      expect(await readVariables(page)).toEqual(on);
    });

    test('is on after setContentWithDesignSystem', async ({ page }) => {
      await setContentWithDesignSystem(page, '<p-button>x</p-button>');
      expect(await readVariables(page)).toEqual(on);
    });
  });
});

test.describe('waitForAnimationsFinished', () => {
  test.use({ motion: 'on' });
  test.setTimeout(10_000);

  const shadowBox =
    '<style>.box { width: 10px; transition: width .3s } .wide { width: 200px }</style><div class="box"></div>';
  const host = (page: Page) => page.locator('#host');
  const readBoxStyle = (page: Page, property: 'width' | 'opacity') =>
    page.locator('.box').evaluate((el, property) => getComputedStyle(el)[property], property);

  test.beforeEach(async ({ page }) => {
    await page.setContent('<div id="host"></div>');
  });

  test('waits for a transition inside a shadow root', async ({ page }) => {
    await page.evaluate((html) => {
      const root = document.querySelector('#host')!.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      const box = root.querySelector('.box')!;
      // Reading the style first gives the transition a start value.
      getComputedStyle(box).width;
      box.classList.add('wide');
    }, shadowBox);
    await waitForAnimationsFinished(host(page));
    expect(await readBoxStyle(page, 'width')).toBe('200px');
  });

  test('waits for a transition inside a nested shadow root', async ({ page }) => {
    await page.evaluate((html) => {
      const outer = document.querySelector('#host')!.attachShadow({ mode: 'open' });
      outer.innerHTML = '<div></div>';
      const root = outer.querySelector('div')!.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      const box = root.querySelector('.box')!;
      getComputedStyle(box).width;
      box.classList.add('wide');
    }, shadowBox);
    await waitForAnimationsFinished(host(page));
    expect(await readBoxStyle(page, 'width')).toBe('200px');
  });

  test('waits for an animation that starts when the first one ends', async ({ page }) => {
    await page.evaluate((html) => {
      const root = document.querySelector('#host')!.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      const box = root.querySelector('.box')!;
      box.addEventListener('transitionend', () => {
        box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
      });
      getComputedStyle(box).width;
      box.classList.add('wide');
    }, shadowBox);
    await waitForAnimationsFinished(host(page));
    expect(await readBoxStyle(page, 'opacity')).toBe('0');
  });

  test('returns when nothing runs', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('#host')!.innerHTML = '<p>x</p>';
    });
    await waitForAnimationsFinished(host(page));
  });

  test('does not hang on an infinite animation', async ({ page }) => {
    await page.evaluate((html) => {
      const root = document.querySelector('#host')!.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      root.querySelector('.box')!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, iterations: Infinity });
    }, shadowBox);
    await waitForAnimationsFinished(host(page));
  });

  test('does not throw on a cancelled animation', async ({ page }) => {
    await page.evaluate((html) => {
      const root = document.querySelector('#host')!.attachShadow({ mode: 'open' });
      root.innerHTML = html;
      const a = root.querySelector('.box')!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1000 });
      setTimeout(() => a.cancel(), 300);
    }, shadowBox);
    await waitForAnimationsFinished(host(page));
  });
});
