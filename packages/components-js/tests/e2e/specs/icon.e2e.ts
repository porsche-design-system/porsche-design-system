import {
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  waitForInnerHTMLChange
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('p-icon', () => {

  let page: Page;
  let responseCounter: number;
  let svgRequestCounter: number;

  beforeEach(async () => {
    page = await getBrowser().newPage();

    await page.setRequestInterception(true);

    responseCounter = 0;
    page.removeAllListeners('response');
    page.on('response', (resp) => {
      const url = resp.url();

      if (url.endsWith('.svg')) {
        const iconName = url.match(/icons\/(.*)\.min/)[1];
        console.log(`RESP ${responseCounter}: icon = ${iconName}, time = ${timeLogger()}`);
        responseCounter++;
      }
    });
  });
  afterEach(async () => await page.close());

  const getIconHost = async () => selectNode(page, 'p-icon');
  const getIconIcon = async () => selectNode(page, 'p-icon >>> .p-icon');
  const getIconContent = async () => getProperty(await selectNode(page, 'p-icon >>> i'), 'innerHTML');

  const timeLogger = (): string => {
    const now = new Date();
    return now.getUTCSeconds() + ':' + now.getUTCMilliseconds()
  };

  const setSvgRequestInterceptor = async (page: Page, timeouts: number[]): Promise<void> => {
    svgRequestCounter = 0;
    page.removeAllListeners('request');
    page.on('request', (req) => {
      const url = req.url();

      if (url.endsWith('.svg')) {
        const iconName = url.match(/icons\/(.*)\.min/)[1];
        const delay = timeouts[svgRequestCounter] ?? 0;

        console.log(`REQ ${svgRequestCounter}: delay = ${delay}, icon = ${iconName}, time = ${timeLogger()}`);
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

  it('should have only one response for default icon', async () => {
    await setSvgRequestInterceptor(page, []);
    // render with default icon "arrow-head-right"
    await setContentWithDesignSystem(page, `<p-icon></p-icon>`);

    expect(await getIconContent()).toContain('arrow-head-right');
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
    await setContentWithDesignSystem(page, `<p-icon></p-icon>`, {waitUntil: 'networkidle2'});
    const iconComponent = await getIconHost();

    // change icon name to "question"
    await iconComponent.evaluate(el => el.setAttribute('name', 'question'));

    // waitFor is needed for request duration, otherwise first Request wont be finished before test ends
    await page.waitFor(delay);

    expect(await getIconContent()).toContain('question');
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
    await setContentWithDesignSystem(page, `<p-icon name="highway"></p-icon>`);

    const iconComponent = await getIconHost();
    expect(await getIconContent()).toContain('highway');

    await iconComponent.evaluate(el => el.setAttribute('name', 'light'));
    expect(await getIconContent()).toEqual('');

    await page.waitForResponse(resp => resp.url().indexOf('light') && resp.status() === 200);

    expect(await getIconContent()).toContain('light');
    expect(responseCounter).toEqual(2);
  });

  it('should unset previous icon if name prop is removed', async () => {
    await setSvgRequestInterceptor(page, [2000]);
    await setContentWithDesignSystem(page, `<p-icon name="highway"></p-icon>`);

    const iconComponent = await getIconHost();
    const shadowIcon = await getIconIcon();
    expect(await getIconContent()).toContain('highway');

    await iconComponent.evaluate(el => el.removeAttribute('name'));

    // check name attribute
    const outerHTML = await iconComponent.evaluate(el => el.outerHTML);
    expect(outerHTML).not.toContain('name=');
    // one tick delay to repaint
    await waitForInnerHTMLChange(page, shadowIcon);

    expect(await getIconContent()).toContain('arrow-head-right');
    expect(responseCounter).toEqual(2);
  });
});
