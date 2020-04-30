const setContentWithDesignSystem = async (content: string) => await page.setContent(`
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
  {waitUntil: 'networkidle2'}
);

const getInnerHTMLFromShadowRoot = async (documentSelector: string, shadowRootSelector: string) => {
  const handle = await page.evaluateHandle(`document.querySelector('${documentSelector}').shadowRoot.querySelector('${shadowRootSelector}')`);
  return handle.getProperty('innerHTML').then(x => x.jsonValue())
};

const timeLogger = () => {
  const now = new Date();
  return now.getUTCSeconds() + ':' + now.getUTCMilliseconds()
};

const iconNames = ['arrow-head-right', 'question'];

const setRequestInterceptor = (timeout = 0) => {
  page.removeAllListeners('request');
  page.on('request', (req) => {
    const url = req.url();

    if (url.indexOf('.svg') >= 0) {
      const iconName = url.match(/icons\/(.*)\.min/)[1];
      const iconIndex = iconNames.indexOf(iconName);
      const delay = iconIndex === 0 ? timeout : 0;

      console.log(`REQ: delay = ${delay}, icon = ${iconName}, time = ${timeLogger()}`);
      if (iconIndex >= 0) {
        setTimeout(() => {
          req.respond({
            status: 200,
            contentType: 'image/svg+xml',
            body: `<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg">${iconName}</svg>`,
          });
        }, delay);
      }
    } else {
      req.continue();
    }
  });
};

describe('p-icon', () => {

  let responseCounter: number;

  beforeEach(async () => {
    responseCounter = 0;
    await page.setRequestInterception(true);

    page.on('response', (resp) => {
      const url = resp.url();

      if (url.indexOf('.svg') >= 0) {
        const iconName = url.match(/icons\/(.*)\.min/)[1];
        responseCounter++;
        console.log(`RESP: icon = ${iconName}, time = ${timeLogger()}`);
      }
    });
  });

  /**
   *                   request of default icon
   *           |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾⌄
   * TIME ------------------------------------------------>
   *                 |_______________________⌃
   *                   request of actual icon
   */
  it('should render correct icon if default-icon request takes longer than icon request', async () => {
    const delay = 1000;
    setRequestInterceptor(delay);

    // render with default icon "arrow-head-right"
    await setContentWithDesignSystem(`<p-icon></p-icon>`);

    // change icon name to "question"
    await page.$eval('p-icon', el => el.setAttribute('name', 'question'));

    // waitFor is needed for request duration, otherwise first Request wont be finished before test ends
    await page.waitFor(delay);
    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon', 'i');
    expect(iconAfter).toContain('question');

    expect(responseCounter).toEqual(2);
  });


  xit('should unset previous icon if name prop is removed', () => {

  });


  xit('should unset previous icon if name prop is changed', async () => {

  });

});

