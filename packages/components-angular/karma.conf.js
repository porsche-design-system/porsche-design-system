// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const fs = require('fs');
const transformIndexHtml = require('./scripts/transformIndexHtml');

if (process.env.CI) {
  // using chrome that comes with playwright
  process.env.CHROME_BIN = require('@playwright/test').chromium.executablePath();
}

function CustomMiddlewareFactory(config) {
  const modifiedFile = config.customDebugFile.replace(/\.html$/, '-modified$&');
  const fileContent = fs.readFileSync(config.customDebugFile, 'utf8');
  const modifiedFileContent = transformIndexHtml({}, fileContent);
  fs.writeFileSync(modifiedFile, modifiedFileContent);

  config.customContextFile = modifiedFile;

  return function (request, response, next) {
    return next();
  };
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      { 'middleware:custom': ['factory', CustomMiddlewareFactory] },
    ],
    middleware: ['custom'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    // coverageIstanbulReporter: {
    //   dir: require('path').join(__dirname, './coverage/sample-integration-angular'),
    //   reports: ['html', 'lcovonly', 'text-summary'],
    //   fixWebpackSourcePaths: true,
    // },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
