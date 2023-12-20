import * as fs from 'fs';

const walk = (dir: any, done: any): void => {
  fs.readdir(dir, (error, list) => {
    if (error) {
      return done(error);
    }

    let i = 0;

    (function next() {
      let file = list[i++];

      if (!file) {
        return done(null);
      }

      file = dir + '/' + file;

      fs.stat(file, (_error, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, () => {
            next();
          });
        } else {
          if (file.endsWith('actual.png')) {
            // Chrome
            if (/chrome(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'chrome.png'));
            }
            // Safari
            if (/safari(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'safari.png'));
            }
          }

          next();
        }
      });
    })();
  });
};

const deleteRetryDirectories = (source: string): void => {
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      if (/retry\d+$/.test(dirent.name)) {
        fs.rmSync(`./${dirent.path}/${dirent.name}`, { recursive: true, force: true });
      }
    });
};

const path = 'tests/vrt/playwright/results';
if (fs.existsSync(path)) {
  deleteRetryDirectories(path);
  walk(path, (error: any): void => {
    if (error) {
      throw error;
    }
  });
}
