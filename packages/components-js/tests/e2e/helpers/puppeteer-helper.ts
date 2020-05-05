import { NavigationOptions } from 'puppeteer';

export const setContentWithDesignSystem = async (content: string, options: NavigationOptions = {waitUntil: 'networkidle0'}) =>
  await page.setContent(`
      <script nomodule src="http://localhost:3333/build/porsche-design-system.js"></script>
      <script type="module" src="http://localhost:3333/build/porsche-design-system.esm.js"></script>

      ${content}
    `,
    options
  );

export const getInnerHTMLFromShadowRoot = async (documentSelector: string, shadowRootSelector: string) => {
  const handle = await page.evaluateHandle(`document.querySelector('${documentSelector}').shadowRoot.querySelector('${shadowRootSelector}')`);
  return handle.getProperty('innerHTML').then(x => x.jsonValue())
};

export const timeLogger = () => {
  const now = new Date();
  return now.getUTCSeconds() + ':' + now.getUTCMilliseconds()
};

let svgRequestCounter: number;

export const setRequestInterceptor = (timeouts: number[]) => {
  svgRequestCounter = 0;
  page.removeAllListeners('request');
  page.on('request', (req) => {
    const url = req.url();

    if (url.indexOf('.svg') >= 0) {
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
