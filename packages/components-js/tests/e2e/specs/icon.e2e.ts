import {
  expectA11yToMatchSnapshot,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  removeAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { IconName } from '@porsche-design-system/components/dist/types/bundle';

describe('icon', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    name?: IconName;
    isLazy?: boolean;
    isScrollable?: boolean;
  };

  const initOptions: InitOptions[] = [{}, { isLazy: true }];

  const initIcon = async (opts?: InitOptions): Promise<void> => {
    const { name, isLazy, isScrollable } = opts ?? {};

    const nameAttribute = name ? `name="${name}"` : '';
    const lazyAttribute = isLazy ? `lazy="${isLazy}"` : '';
    const attributes = `${nameAttribute} ${lazyAttribute}`;

    const scrollContainer = `<div style="height:1000px"></div>`;
    const content = `${
      isScrollable ? scrollContainer : ''
    }<p-icon ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = async () => selectNode(page, 'p-icon');
  const getIcon = async () => selectNode(page, 'p-icon >>> i');
  const getIconSVG = async () => selectNode(page, 'p-icon >>> i > svg');
  const getContent = (el: ElementHandle): Promise<string> => getProperty(el, 'innerHTML') as Promise<string>;

  describe('loading behavior', () => {
    let responseCounter: number;
    let svgRequestCounter: number;

    beforeEach(async () => {
      await page.setRequestInterception(true);

      responseCounter = 0;
      page.removeAllListeners('response');
      page.on('response', (resp) => {
        const url = resp.url();

        if (url.endsWith('.svg')) {
          // const iconName = url.match(/icons\/(.*)\.min/)[1];
          // console.log(`RESP ${responseCounter}: icon = ${iconName}, time = ${timeLogger()}`);
          responseCounter++;
        }
      });
    });

    const timeLogger = (): string => {
      const now = new Date();
      return now.getUTCSeconds() + ':' + now.getUTCMilliseconds();
    };

    const setSvgRequestInterceptor = async (page: Page, timeouts: number[]): Promise<void> => {
      svgRequestCounter = 0;
      page.removeAllListeners('request');
      page.on('request', (req) => {
        const url = req.url();

        if (url.endsWith('.svg')) {
          const iconName = url.match(/icons\/(.*)\.min/)[1];
          const delay = timeouts[svgRequestCounter] ?? 0;

          // console.log(`REQ ${svgRequestCounter}: delay = ${delay}, icon = ${iconName}, time = ${timeLogger()}`);
          setTimeout(() => {
            req.respond({
              status: 200,
              contentType: 'image/svg+xml',
              body: `<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg">${iconName}</svg>`,
            });
          }, delay);
          svgRequestCounter++;
        } else {
          req.continue();
        }
      });
    };

    it('should load icon if lazy attribute is set to true', async () => {
      await setSvgRequestInterceptor(page, []);
      await initIcon({ name: 'highway', isLazy: true });

      expect(await getContent(await getIcon())).toContain('highway');
    });

    it('should load icon if lazy attribute is set to false and icon is outside of viewport', async () => {
      await setSvgRequestInterceptor(page, []);
      await setContentWithDesignSystem(
        page,
        `<div style="height:1000px"></div><p-icon lazy="false" name="information"></p-icon>`
      );

      expect(await getContent(await getIcon())).toContain('information');
    });

    it('should load icon lazily if scrolled into viewport', async () => {
      await setSvgRequestInterceptor(page, []);
      await initIcon({ name: 'information', isLazy: true, isScrollable: true });

      expect(await getContent(await getIcon())).not.toContain('information');

      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await waitForStencilLifecycle(page);

      expect(await getContent(await getIcon())).toContain('information');
    });

    initOptions.forEach((opts) => {
      describe(opts.isLazy ? 'with lazy loading' : 'with default loading', () => {
        it('should have only one response for default icon', async () => {
          await setSvgRequestInterceptor(page, []);
          // render with default icon "arrow-head-right"
          await initIcon(opts);

          expect(await getContent(await getIcon())).toContain('arrow-head-right');
          expect(responseCounter).toEqual(1);
        });

        /**
         *                   request of default icon
         *           |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾⌄
         * TIME ===================================================>
         *                 |_______________________⌃
         *                   request of actual icon
         */
        it('should render correct icon if default-icon request takes longer than icon request', async () => {
          const delay = 2000;
          await setSvgRequestInterceptor(page, [delay, 0]);

          // render with default icon "arrow-head-right"
          await setContentWithDesignSystem(page, `<p-icon${opts.isLazy ? ' lazy="true"' : ''}></p-icon>`, {
            waitUntil: 'networkidle2',
          });
          const host = await getHost();

          // change icon name to "question"
          await setProperty(host, 'name', 'question');

          // waitFor is needed for request duration, otherwise first Request wont be finished before test ends
          await page.waitForTimeout(delay);

          expect(await getContent(await getIcon())).toContain('question');
          expect(responseCounter).toEqual(2);
        });

        /**
         *       request 1st icon
         *         |‾‾‾‾‾‾‾‾‾‾⌄
         * TIME ==================xxxxxxxxxxxx==================>
         *                        |__________⌃
         *                      request 2nd icon
         */
        it('should unset previous icon if name prop is changed', async () => {
          await setSvgRequestInterceptor(page, [0, 1000]);
          await initIcon({ ...opts, name: 'highway' });

          const host = await getHost();
          expect(await getContent(await getIcon())).toContain('highway');

          await setProperty(host, 'name', 'light');
          await waitForEventSerialization(page);
          expect(await getContent(await getIcon())).toEqual('');

          await page.waitForResponse((resp) => resp.url().indexOf('light') && resp.status() === 200);

          await waitForStencilLifecycle(page);

          expect(await getContent(await getIcon())).toContain('light');
          expect(responseCounter).toEqual(2);
        });

        /**
         *       request 1st icon
         *         |‾‾‾‾‾‾‾‾‾‾⌄
         * TIME ================================================>
         *                        |__________⌃
         *                      request 1st icon again for different icon component
         */
        it('should not resolve promise of second (cached) icon with same source before render() is finished', async () => {
          await setSvgRequestInterceptor(page, []);
          await initIcon({ ...opts, name: 'highway' });

          expect(await getContent(await getIcon()), 'first icon').toContain('highway');

          await page.evaluate(() => {
            const el = document.createElement('p-icon');
            el.id = 'iconTwo';
            el.name = 'highway';
            document.body.appendChild(el);
          });

          await waitForStencilLifecycle(page);
          const iconTwo = await selectNode(page, '#iconTwo >>> i');

          expect(await getContent(iconTwo), 'second icon').toContain('highway');
        });

        it('should unset previous icon if name prop is removed', async () => {
          await setSvgRequestInterceptor(page, []);
          await initIcon({ ...opts, name: 'highway' });

          const host = await getHost();
          expect(await getContent(await getIcon())).toContain('highway');

          await removeAttribute(host, 'name');

          // check name attribute
          const outerHTML = await host.evaluate((el) => el.outerHTML);
          await waitForStencilLifecycle(page);

          expect(outerHTML).not.toContain('name=');
          expect(await getContent(await getIcon())).toContain('arrow-head-right');
          expect(responseCounter).toEqual(2);
        });
      });
    });
  });

  describe('lifecycle', () => {
    initOptions.forEach((opts) => {
      describe(opts.isLazy ? 'with lazy loading' : 'with default loading', () => {
        it('should work without unnecessary round trips on init', async () => {
          await initIcon(opts);
          const status = await getLifecycleStatus(page);

          expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

          expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
          expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
        });

        it('should work without unnecessary round trips after state change', async () => {
          await initIcon({ ...opts, name: 'highway' });
          const host = await getHost();

          await setProperty(host, 'name', 'car');
          await waitForStencilLifecycle(page);

          const status = await getLifecycleStatus(page);

          expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

          expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
          expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
        });
      });
    });

    it('should keep svg when new lifecycle is triggered', async () => {
      await initIcon({ name: 'highway' });

      const host = await getHost();
      const iconContent = await getContent(await getIcon());

      expect(await getContent(await getIcon())).not.toBe('');
      expect(await getElementStyle(await getIcon(), 'color')).toBe('rgb(0, 0, 0)');

      await setProperty(host, 'color', 'notification-error');
      await waitForStencilLifecycle(page);

      expect(await getContent(await getIcon())).toBe(iconContent);
      expect(await getElementStyle(await getIcon(), 'color')).toBe('rgb(224, 0, 0)');
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree properties', async () => {
      await initIcon();
      const icon = await getIconSVG();

      await expectA11yToMatchSnapshot(page, icon);
    });
  });
});
