
describe('p-icon', () => {

  const setRequestInterceptor = (content: string) => {
    page.removeAllListeners('request')
    page.on('request', (req) => {
      if (req.url().indexOf('.svg') >= 0) {
        // setTimeout(() => {
        req.respond({
          status: 200,
          contentType: 'image/svg+xml',
          body: `<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg">${content}</svg>`,
        });
        // }, 2000);
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

    setRequestInterceptor('hi')
    await setContentWithDesignSystem(`
      <p-icon name="question"></p-icon>
      <div class="test">hello</div>
    `);

    await page.content().then(console.log);

    const testHtml = await page.$eval('.test', element => element.innerHTML);
    console.log('testHtml', testHtml);

    const icon = await getInnerHTMLFromShadowRoot('p-icon','i');
    console.log('icon', icon);

    expect(testHtml).toEqual('hello');
    expect(icon).toContain('hi');

    // ---

    setRequestInterceptor('hello')
    await setContentWithDesignSystem(`<p-icon name="highway"></p-icon>`);

    const icon2 = await getInnerHTMLFromShadowRoot('p-icon','i');
    console.log('icon2', icon2);

    expect(icon2).toContain('hello');
  })

});

