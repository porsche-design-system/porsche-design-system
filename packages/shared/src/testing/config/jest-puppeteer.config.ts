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

module.exports = {
  launch,
  // server: {
  //   command: 'node server.js',
  //   port: 4444,
  // },
};
