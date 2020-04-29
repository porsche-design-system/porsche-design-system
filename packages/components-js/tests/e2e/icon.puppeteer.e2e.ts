
describe('p-icon', () => {
  // beforeEach(async () => {
  //   await page.goto('http://localhost:3333/')
  // })

  const setContentWithDesignSystem = async (content: string) => await page.setContent(`
      <link href="https://cdn.ui.porsche.com/porsche-design-system/styles/v2/porsche-design-system.css" type="text/css" rel="stylesheet">
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
    { waitUntil: 'networkidle0'}
  );

  it('should render', async () => {
    await page.setRequestInterception(true);
    await page.on('request', req => {
      if (req.url().indexOf('.svg') >= 0) {
        // setTimeout(() => {
        req.respond({
          status: 200,
          contentType: 'image/svg+xml',
          body: '<svg height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg">hi</svg>',
        });
        // }, 2000);
      } else {
        req.continue();
      }
    });

    await setContentWithDesignSystem(`
      <p-icon name="question"></p-icon>
      <div class="test">hello</div>
    `);

    await page.content().then(console.log);

    // const el = await page.waitForSelector('p-icon')

    const testHtml = await page.$eval('.test', element => element.innerHTML);
    console.log('testHtml', testHtml);

    const handle = await page.evaluateHandle(`document.querySelector('p-icon').shadowRoot.querySelector('i')`);
    console.log('icon', await handle.getProperty('innerHTML').then(x => x.jsonValue()))

    // expect(el).not.toBe(null);
    expect(testHtml).toEqual('hello');
  })

});

