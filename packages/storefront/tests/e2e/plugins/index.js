/* eslint-disable arrow-body-style, @typescript-eslint/no-var-requires */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

const puppeteer = require('puppeteer');

module.exports = (on, config) => {
  // on('file:preprocessor', webpack({
  //  webpackOptions: require('@vue/cli-service/webpack.config'),
  //  watchOptions: {}
  // }))

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.family === 'chrome') {
      args.push('--disable-dev-shm-usage');
      args.push('--headless');
    }

    return args
  });

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
    browsers: [ {
        name: 'chrome',
        family: 'chrome',
        displayName: 'Chrome',
        path: puppeteer.executablePath(),
        version: '79.0.3945.0',
        majorVersion: 79
    } ]
  })
};
