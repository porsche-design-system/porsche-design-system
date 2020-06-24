import * as fs from 'fs';
import * as path from 'path';

const cdnPathPackageMap = {
  fonts: '@porsche-design-system/fonts',
  icons: '@porsche-design-system/icons',
  marque: '@porsche-design-system/marque'
};

const TARGET_DIRECTORY = '../dist/cdn';

(async () => {
  for (const cdnPath of Object.keys(cdnPathPackageMap)) {
    const pathToPackage = require.resolve(cdnPathPackageMap[cdnPath as keyof typeof cdnPathPackageMap]);
    const pathToFiles = path.resolve(path.dirname(pathToPackage), `../${cdnPath}`);

    const files = await fs.promises.readdir(pathToFiles);
    const targetDirectory = path.resolve(__dirname, TARGET_DIRECTORY, cdnPath);
    await fs.promises.mkdir(targetDirectory, { recursive: true });

    for (const file of files) {
      await fs.promises.copyFile(path.resolve(pathToFiles, file), path.resolve(targetDirectory, file));
      console.log(`'${file}'`, 'copied to', `'${TARGET_DIRECTORY}/${path.basename(targetDirectory)}/'`);
    }
  }
})();
