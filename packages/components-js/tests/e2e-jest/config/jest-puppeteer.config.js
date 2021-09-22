module.exports = {
  launch: {
    headless: false,
    slowMo: 200,
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
  },
  // server: {
  //   command: 'node server.js',
  //   port: 4444,
  // },
};
