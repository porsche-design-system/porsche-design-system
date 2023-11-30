// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const injectPartials = require('./scripts/injectPartials');

if (process.env.CI) {
  // using chrome that comes with playwright
  process.env.CHROME_BIN = require('@playwright/test').chromium.executablePath();
}

const injectPartialsIntoKarmaContextHtml = () => {
  const packagePath = path.resolve(require.resolve('@angular-devkit/build-angular'), '..');
  const [filePath] = globbySync(packagePath + '/**/karma-context.html');
  const backupFilePath = filePath.replace(/\.html$/, '-original$&');

  // restore backup
  if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, filePath);
    fs.rmSync(backupFilePath);
  }

  fs.copyFileSync(filePath, backupFilePath); // create backup
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const modifiedFileContent = injectPartials({}, fileContent);
  fs.writeFileSync(filePath, modifiedFileContent);
};
injectPartialsIntoKarmaContextHtml();

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
    ],
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
