import * as fs from 'fs';
import * as path from 'path';

const rootDirectory = path.resolve(__dirname, '..');
const targetDirectory = path.resolve(rootDirectory, 'dist');

// copy all necessary files
const files = ['README.md', 'CHANGELOG.md', 'LICENSE'];
files.forEach((file) =>
  fs.copyFile(path.resolve(rootDirectory, file), path.resolve(targetDirectory, path.basename(file)), (err) => {
    if (err) {
      throw err;
    }
  })
);

// read and remove props from package.json
const propsToRemove = ['scripts', 'devDependencies', 'files', 'bin'];
const pkgJson = require('../package.json');
propsToRemove.forEach((prop) => Reflect.deleteProperty(pkgJson, prop));

// fix entrypoints
const propsToClean = ['main', 'module', 'types'];
propsToClean.forEach((prop) => (pkgJson[prop] = pkgJson[prop].replace('dist/', '')));

fs.writeFileSync(path.resolve(targetDirectory, 'package.json'), JSON.stringify(pkgJson, null, 2));
