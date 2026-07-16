import * as fs from 'fs';
import * as path from 'path';

const isComponentsOnly = process.env.COMPONENTS_ONLY === '1';

const cdnPathPackageMap = {
  components: '@porsche-design-system/components-js',
  ...(!isComponentsOnly && {
    crest: '@porsche-design-system/crest',
    flags: '@porsche-design-system/flags',
    fonts: '@porsche-design-system/fonts',
    icons: '@porsche-design-system/icons',
    marque: '@porsche-design-system/marque',
    'meta-icons': '@porsche-design-system/meta-icons',
    'model-signatures': '@porsche-design-system/model-signatures',
    styles: '@porsche-design-system/font-face',
  }),
};

type CdnPath = keyof typeof cdnPathPackageMap;

const TARGET_DIRECTORY = '../cdn';

const copyAssets = (): void => {
  for (const cdnPath of Object.keys(cdnPathPackageMap) as CdnPath[]) {
    const packageName = cdnPathPackageMap[cdnPath as keyof typeof cdnPathPackageMap];
    try {
      // resolve the components package from its workspace dist directly; require.resolve of the
      // self-symlinked '@porsche-design-system/components-js' fails on CI install layouts
      const packageEntryPath =
        cdnPath === 'components'
          ? path.resolve(__dirname, '../../components-js/dist/components-wrapper/cjs/index.cjs')
          : require.resolve(packageName!);
      const packageEntryDir = path.dirname(packageEntryPath);
      // because of inconsistent package structures we maybe right in dist folder or one level deeper
      const relativePathToPackageAssetFiles = packageEntryDir.endsWith('dist') ? cdnPath : `../${cdnPath}`;
      const pathToFiles = path.resolve(
        packageEntryDir,
        cdnPath === 'components' ? '..' : '', // since we are in cjs folder otherwise
        relativePathToPackageAssetFiles
      );

      const files = fs.readdirSync(pathToFiles);
      const targetDirectory = path.resolve(__dirname, TARGET_DIRECTORY, cdnPath);
      fs.mkdirSync(targetDirectory, { recursive: true });

      console.log(`Copying contents from '${packageName}' to '${TARGET_DIRECTORY}/${path.basename(targetDirectory)}'`);

      for (const file of files) {
        fs.copyFileSync(path.resolve(pathToFiles, file), path.resolve(targetDirectory, file));
        console.log(` - ${file}`);
      }
    } catch (e) {
      if (isComponentsOnly) {
        throw new Error(`Package '${packageName}' doesn't exist and can't be copied`);
      } else {
        console.log(`Package '${packageName}' doesn't exist. Skipping...`);
      }
    }
  }
};

copyAssets();
