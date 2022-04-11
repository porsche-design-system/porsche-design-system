import { normalize } from 'path';
import { copyFileSync, rmSync, mkdirSync } from 'fs';
import * as globby from 'globby';

const targetDirectory = './dist/scss/lib';
const sourceFiles = globby.sync('./src/scss/**/*.scss');

const cleanBuild = (): void => {
  rmSync(normalize(targetDirectory), { force: true, recursive: true });
  mkdirSync(normalize(targetDirectory), { recursive: true });
};

const copyFiles = (): void => {
  for (const sourceFile of sourceFiles) {
    const targetFile = sourceFile.replace('./src', './dist');
    copyFileSync(sourceFile, targetFile);
    console.log(`${sourceFile} was copied to ${targetFile}`);
  }
};

((): void => {
  cleanBuild();
  copyFiles();
})();
