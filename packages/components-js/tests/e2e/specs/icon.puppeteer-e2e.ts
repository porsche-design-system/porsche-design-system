import { getInnerHTMLFromShadowRoot, setContentWithDesignSystem, setRequestInterceptor, timeLogger } from '../helpers';
import { NavigationOptions } from 'puppeteer';

describe('p-icon', () => {
  let responseCounter: number;
  const navOptions: NavigationOptions = {waitUntil: 'networkidle0'};

  beforeEach(async () => {
    await page.reload(navOptions);
    await page.setRequestInterception(true);

    responseCounter = 0;
    page.removeAllListeners('response');
    page.on('response', (resp) => {
      const url = resp.url();

      if (url.indexOf('.svg') >= 0) {
        const iconName = url.match(/icons\/(.*)\.min/)[1];
        console.log(`RESP ${responseCounter}: icon = ${iconName}, time = ${timeLogger()}`);
        responseCounter++;
      }
    });
  });

  it('should have only one response for default icon', async () => {
    setRequestInterceptor([]);
    // render with default icon "arrow-head-right"
    await setContentWithDesignSystem(`<p-icon></p-icon>`, navOptions);

    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconAfter).toContain('arrow-head-right');
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
    setRequestInterceptor([delay]);

    // render with default icon "arrow-head-right"
    await setContentWithDesignSystem(`<p-icon></p-icon>`, {waitUntil: 'networkidle2'});

    // change icon name to "question"
    await page.$eval('p-icon', el => el.setAttribute('name', 'question'));

    // waitFor is needed for request duration, otherwise first Request wont be finished before test ends
    await page.waitFor(delay);

    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconAfter).toContain('question');
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
    setRequestInterceptor([0, 1000]);
    await setContentWithDesignSystem(`<p-icon name="highway"></p-icon>`, navOptions);

    const iconBefore = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconBefore).toContain('highway');

    await page.$eval('p-icon', el => el.setAttribute('name', 'light'));

    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconAfter).toEqual('');

    await page.waitForResponse(resp => resp.url().indexOf('light') && resp.status() === 200);

    const iconFinal = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconFinal).toContain('light');
    expect(responseCounter).toEqual(2);
  });

  it('should unset previous icon if name prop is removed', async () => {
    setRequestInterceptor([2000]);
    await setContentWithDesignSystem(`<p-icon name="highway"></p-icon>`, navOptions);

    const iconBefore = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconBefore).toContain('highway');

    await page.$eval('p-icon', el => el.removeAttribute('name'));

    // check name attribute
    const outerHTML = await page.$eval('p-icon', el => el.outerHTML);
    expect(outerHTML).not.toContain('name=');
    // one tick delay to repaint
    await page.waitFor(10);

    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon >>> i');
    expect(iconAfter).toContain('arrow-head-right');
    expect(responseCounter).toEqual(2);
  });
});

