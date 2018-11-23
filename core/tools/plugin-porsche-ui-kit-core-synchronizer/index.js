let npmPackage = require('./package');
let Logger = require('./console-logger');
let rimraf = require('rimraf');
let ncp = require('ncp').ncp;

class PorscheUIKitCoreSynchronizer {

  constructor(patternlabPath, porscheUIKitCorePath) {
    if (!patternlabPath || !porscheUIKitCorePath) {
      throw new Error(npmPackage.name +': A local Pattern Lab path and local @porsche/ui-kit-core npm package path needs to be defined when instanciating the synchronizer plugin, e.g. "new (require(\'@porsche/plugin-ui-kit-core-synchronizer\'))(\'./patternlab\', \'./node_modules/@porsche/ui-kit-core\');".');
    }

    this.patternlabPath = patternlabPath;
    this.porscheUIKitCorePath = porscheUIKitCorePath;

    this.init();
  }

  init() {
    ['01-atoms', '02-molecules', '03-organisms', '04-layout', '98-deprecated', '99-design-spec'].forEach(this.syncPatterns, this);
    ['porsche-ui-kit-core.json'].forEach(this.syncData, this);
    ['porsche-ui-kit-core.styleguide-scaffolding.css'].forEach(this.syncCSS, this);
    ['porsche-ui-kit-core'].forEach(this.syncImages, this);
    ['porsche-ui-kit-core'].forEach(this.syncScripts, this);
  }

  syncPatterns(folder) {
    rimraf(this.patternlabPath +'/source/_patterns/'+ folder, () => {
      ncp(this.porscheUIKitCorePath +'/patternlab/source/_patterns/'+ folder, this.patternlabPath +'/source/_patterns/'+ folder, (err) => {
        if (err) {
          return Logger.error(err);
        }
        Logger.progress(npmPackage.name +': Synced patterns in "'+ folder +'"');
      });
    });
  }

  syncData(file) {
    rimraf(this.patternlabPath +'/source/_data/'+ file, () => {
      ncp(this.porscheUIKitCorePath +'/patternlab/source/_data/'+ file, this.patternlabPath +'/source/_data/'+ file, (err) => {
        if (err) {
          return Logger.error(err);
        }
        Logger.progress(npmPackage.name +': Synced data "'+ file +'"');
      });
    });
  }

  syncCSS(file) {
    rimraf(this.patternlabPath +'/source/css/'+ file, () => {
      ncp(this.porscheUIKitCorePath +'/patternlab/source/css/'+ file, this.patternlabPath +'/source/css/'+ file, (err) => {
        if (err) {
          return Logger.error(err);
        }
        Logger.progress(npmPackage.name +': Synced css "'+ file +'"');
      });
    });
  }

  syncImages(folder) {
    rimraf(this.patternlabPath +'/source/images/'+ folder, () => {
      ncp(this.porscheUIKitCorePath +'/patternlab/source/images/'+ folder, this.patternlabPath +'/source/images/'+ folder, (err) => {
        if (err) {
          return Logger.error(err);
        }
        Logger.progress(npmPackage.name +': Synced images in "'+ folder +'"');
      });
    });
  }

  syncScripts(folder) {
    rimraf(this.patternlabPath +'/source/js/'+ folder, () => {
      ncp(this.porscheUIKitCorePath +'/patternlab/source/js/'+ folder, this.patternlabPath +'/source/js/'+ folder, (err) => {
        if (err) {
          return Logger.error(err);
        }
        Logger.progress(npmPackage.name +': Synced scripts in "'+ folder +'"');
      });
    });
  }
}

module.exports = PorscheUIKitCoreSynchronizer;
