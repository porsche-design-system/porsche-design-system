import * as fs from 'fs';
import * as path from 'path';

const isComponentsOnly = process.env.COMPONENTS_ONLY === '1';

const cdnPathPackageMap = {
  components: '@porsche-design-system/components-js',
  ...(!isComponentsOnly && {
    email: '@porsche-design-system/email',
    fonts: '@porsche-design-system/fonts',
    icons: '@porsche-design-system/icons',
    marque: '@porsche-design-system/marque',
    'meta-icons': '@porsche-design-system/meta-icons',
    styles: '@porsche-design-system/styles',
  }),
};

const TARGET_DIRECTORY = '../cdn';

const copyAssets = (): void => {
  for (const cdnPath of Object.keys(cdnPathPackageMap)) {
    const packageName = cdnPathPackageMap[cdnPath as keyof typeof cdnPathPackageMap];
    try {
      const pathToPackage = require.resolve(packageName!);
      const relativePathToPackageFiles = `../${cdnPath}`;
      const pathToFiles = path.resolve(path.dirname(pathToPackage), relativePathToPackageFiles);

      const files = fs.readdirSync(pathToFiles);
      const targetDirectory = path.resolve(__dirname, TARGET_DIRECTORY, cdnPath);
      fs.mkdirSync(targetDirectory, { recursive: true });

      console.log(`Copying contents from '${packageName}' to '${TARGET_DIRECTORY}/${path.basename(targetDirectory)}'`);

      for (const file of files) {
        fs.copyFileSync(path.resolve(pathToFiles, file), path.resolve(targetDirectory, file));
        console.log(` - ${file}`);
      }
    } catch (e) {
      console.log(`Package '${packageName}' doesn't exist. Skipping...`);
    }
  }
};

copyAssets();
