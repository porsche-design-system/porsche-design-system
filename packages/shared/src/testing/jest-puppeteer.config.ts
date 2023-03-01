import type { PuppeteerNodeLaunchOptions } from 'puppeteer';

const launch: PuppeteerNodeLaunchOptions = {
  headless: true,
  ignoreDefaultArgs: ['--hide-scrollbars'],
  defaultViewport: {
    width: 1920,
    height: 800,
  },
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-web-security'],
};

const hasServer = !!process.env.PORT;

module.exports = {
  launch,
  ...(hasServer && {
    server: {
      command: 'yarn start-app',
      port: process.env.PORT,
      launchTimeout: 180000,
      debug: true,
    },
    // https://github.com/jeffbski/wait-on/blob/master/README.md?plain=1#L149
    waitOnScheme: {
      resources: ['http-get://localhost:' + process.env.PORT],
    },
  }),
};
