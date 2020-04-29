
describe('p-icon', () => {

  const iconNames = ['arrow-head-right', 'question'];

  const setRequestInterceptor = (timeout = 0) => {
    page.removeAllListeners('request')
    page.on('request', (req) => {
      const url = req.url();

      if (url.indexOf('.svg') >= 0) {
        const iconName = url.match(/icons\/(.*)\.min/)[1];
        const iconIndex = iconNames.indexOf(iconName);
        const delay = iconIndex === 0 ? timeout : 0;

        console.log(`svg request, delay = ${delay}, icon = ${iconName}`)
        if(iconIndex >= 0) {
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
  }

  const setContentWithDesignSystem = async (content: string) => await page.setContent(`
      <link href="https://cdn.ui.porsche.com/porsche-design-system/styles/v2/porsche-design-system.css" type="text/css" rel="stylesheet">
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
    { waitUntil: 'networkidle0'}
  );

  const getInnerHTMLFromShadowRoot = async (documentSelector: string, shadowRootSelector: string) => {
    const handle = await page.evaluateHandle(`document.querySelector('${documentSelector}').shadowRoot.querySelector('${shadowRootSelector}')`);
    return handle.getProperty('innerHTML').then(x => x.jsonValue())
  }

  it('should render', async () => {
    await page.setRequestInterception(true);

    setRequestInterceptor(2000);

    // render with default icon "arrow-head-right"
    await setContentWithDesignSystem(`<p-icon></p-icon>`);

    // check name attribute
    const outerHTMLBefore = await page.$eval('p-icon', el => el.outerHTML);
    console.log('outerHTMLBefore', outerHTMLBefore);
    expect(outerHTMLBefore).not.toContain('name=');

    // check svg content in shadow root
    const iconBefore = await getInnerHTMLFromShadowRoot('p-icon','i');
    console.log('iconBefore', iconBefore);
    expect(iconBefore).toContain('arrow-head-right');

    // ---

    // change icon name to "question"
    await page.$eval('p-icon', el => el.setAttribute('name', 'question'));
    await page.waitForResponse(resp => resp.url().indexOf('question') && resp.status() === 200);

    // check name attribute
    const outerHTMLAfter = await page.$eval('p-icon', el => el.outerHTML);
    console.log('outerHTMLAfter', outerHTMLAfter);
    expect(outerHTMLAfter).toContain('name="question"');

    // check svg content in shadow root
    const iconAfter = await getInnerHTMLFromShadowRoot('p-icon','i');
    console.log('iconAfter', iconAfter);
    expect(iconAfter).toContain('question');

  })

});

