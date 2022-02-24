import * as fs from 'fs';
import * as path from 'path';
import pkgJson from '../package.json';

const rootDirectory = path.resolve(__dirname, '..');
const targetDirectory = path.resolve(rootDirectory, 'dist');

const preparePackage = () => {
  // fix package name
  pkgJson.name = '@porsche-design-system/shared';

  // read and remove props from package.json
  const propsToRemove = ['scripts', 'devDependencies'];
  propsToRemove.forEach((prop) => Reflect.deleteProperty(pkgJson, prop));

  // fix entrypoints
  const propsToClean = ['main', 'module', 'types'];
  propsToClean.forEach((prop) => (pkgJson[prop] = pkgJson[prop].replace('dist/', '')));

  fs.writeFileSync(path.resolve(targetDirectory, 'package.json'), JSON.stringify(pkgJson, null, 2));
};

preparePackage();
