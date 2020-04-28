require('isomorphic-fetch');

/**
 * TODO: Remove this workaround
 * This is a temporary workaround to make stencil e2e tests
 * work on github actions.
 * Currently Chrome seems only to run on github actions if
 * '--single-process' parameter is set. But with that parameter
 * the incognito browser context is not available:
 * https://github.com/GoogleChrome/puppeteer/issues/2608
 * Stencil E2E uses 'createIncognitoBrowserContext' which
 * leads to a crashing browser in that case.
 * This workaround replaces the 'createIncognitoBrowserContext'
 * method of puppeteer and just returns the default browser
 * context (which is not incognito). In the long term this
 * might lead to other problems (Workspace might not get
 * cleaned up properly). But in our case it should work
 * just fine.
 * https://github.com/porscheui/porsche-design-system/issues/317
 */
module.exports = async () => {
  const puppeteerModulePath = process.env.__STENCIL_PUPPETEER_MODULE__;
  if (puppeteerModulePath) {
    const puppeteer = require(puppeteerModulePath);
    puppeteer.originalConnect = puppeteer.connect;
    puppeteer.connect = async (...options) => {
      const browser = await puppeteer.originalConnect(...options);
      browser.createIncognitoBrowserContext = (...args) => {
        return browser.defaultBrowserContext(...args);
      };
      return browser;
    };
  }
};
