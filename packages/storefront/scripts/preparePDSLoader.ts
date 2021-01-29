import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

const rootDirectory = path.resolve(__dirname, '..');

const removeLoaderFile = (): void => {
  const publicDir = path.resolve(rootDirectory, 'public');
  const publicDirFiles = fs.readdirSync(publicDir);
  const [fileName] = publicDirFiles.filter((el) => el.startsWith('pds-loader') && el.endsWith('.js'));

  try {
    const filePath = path.resolve(publicDir, fileName);
    fs.unlinkSync(filePath);
  } catch (e) {}
};

const toHash = (str: string): string =>
  crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');

const copyAndHashLoader = (): string => {
  const filePath = require.resolve('@porsche-design-system/components-js');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const hash = toHash(fileContent);
  const loaderName = `pds-loader.${hash}.js`;

  const newFilePath = path.resolve(rootDirectory, 'public', loaderName);

  fs.copyFileSync(filePath, newFilePath);
  return loaderName;
};

const addExportToFile = (loaderName: string): void => {
  const configPath = path.resolve(rootDirectory, 'hashedLoaderFilename.js');
  const separator = '/* Auto Generated Below */';
  const loaderFilenameExport = `export const PDS_LOADER_FILENAME = '${loaderName}';`;
  const content = separator + '\n' + loaderFilenameExport;
  fs.writeFileSync(configPath, content);
};

const preparePDSLoader = () => {
  removeLoaderFile();
  const loaderName = copyAndHashLoader();
  addExportToFile(loaderName);
};

preparePDSLoader();
