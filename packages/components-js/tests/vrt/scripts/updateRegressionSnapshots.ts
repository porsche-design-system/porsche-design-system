import * as fs from 'fs';
import * as path from 'path';

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
          if (file.endsWith('chrome.png') || file.endsWith('safari.png')) {
            fs.copyFileSync(file, `tests/vrt/specs/__screenshots__/${path.basename(file)}`);
          }

          next();
        }
      });
    })();
  });
};

const dir = 'tests/vrt/results';
if (fs.existsSync(dir)) {
  walk(dir, (error: any): void => {
    if (error) {
      throw error;
    }
  });
}
