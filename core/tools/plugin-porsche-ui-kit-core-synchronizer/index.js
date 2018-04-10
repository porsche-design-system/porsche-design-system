let package = require('./package');
let Logger = require('./console-logger');
let rimraf = require('rimraf');
let ncp = require('ncp').ncp;

let syncPatterns = (folder) => {
  rimraf('./patternlab/source/_patterns/'+ folder, () => {
    ncp('./node_modules/@porsche/ui-kit-core/patternlab/source/_patterns/'+ folder, './patternlab/source/_patterns/'+ folder, (err) => {
      if (err) {
        return Logger.error(err);
      }
      Logger.progress(package.name +': Synced patterns in "'+ folder +'"');
    });
  });
};

let syncData = (file) => {
  rimraf('./patternlab/source/_data/'+ file, () => {
    ncp('./node_modules/@porsche/ui-kit-core/patternlab/source/_data/'+ file, './patternlab/source/_data/'+ file, (err) => {
      if (err) {
        return Logger.error(err);
      }
      Logger.progress(package.name +': Synced data "'+ file +'"');
    });
  });
};

let syncImages = (folder) => {
  rimraf('./patternlab/source/images/'+ folder, () => {
    ncp('./node_modules/@porsche/ui-kit-core/patternlab/source/images/'+ folder, './patternlab/source/images/'+ folder, (err) => {
      if (err) {
        return Logger.error(err);
      }
      Logger.progress(package.name +': Synced images in "'+ folder +'"');
    });
  });
};

let syncScripts = (folder) => {
  rimraf('./patternlab/source/js/'+ folder, () => {
    ncp('./node_modules/@porsche/ui-kit-core/patternlab/source/js/'+ folder, './patternlab/source/js/'+ folder, (err) => {
      if (err) {
        return Logger.error(err);
      }
      Logger.progress(package.name +': Synced scripts in "'+ folder +'"');
    });
  });
};

['01-atoms', '02-molecules', '03-organisms', '98-deprecated', '99-design-spec'].forEach(syncPatterns);
['porsche-ui-kit-core.json'].forEach(syncData);
['porsche-ui-kit-core'].forEach(syncImages);
['porsche-ui-kit-core'].forEach(syncScripts);
