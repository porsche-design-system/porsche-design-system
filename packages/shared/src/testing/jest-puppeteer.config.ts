import type { PuppeteerNodeLaunchOptions } from 'puppeteer';

const launch: PuppeteerNodeLaunchOptions = {
  headless: true,
  defaultViewport: {
    width: 1920,
    height: 800,
  },
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--single-process',
    '--disable-web-security',
  ],
};

const hasServer = !!process.env.PORT;

module.exports = {
  launch,
  ...(hasServer && {
    server: {
      command: 'yarn start',
      port: process.env.PORT,
      launchTimeout: 30000,
      debug: true,
    },
  }),
};
