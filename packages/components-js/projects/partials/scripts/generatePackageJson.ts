import * as fs from 'fs';
import * as path from 'path';

const rootDirectory = path.resolve(__dirname, '..');
const targetDirectory = path.resolve(rootDirectory, 'dist');

// read and remove props from package.json
const propsToRemove = [
  'private',
  'scope',
  'sideEffects',
  'author',
  'contributors',
  'license',
  'description',
  'keywords',
  'homepage',
  'repository',
  'bugs',
  'scripts',
  'devDependencies',
  'files',
];
const pkgJson = require('../package.json');
propsToRemove.forEach((prop) => Reflect.deleteProperty(pkgJson, prop));

// clean dependencies
Object.keys(pkgJson['dependencies']).forEach((key) => {
  if (key !== 'react') {
    delete pkgJson['dependencies'][key];
  }
});

// fix entrypoints
const propsToClean = ['main', 'module', 'types'];
propsToClean.forEach((prop) => (pkgJson[prop] = pkgJson[prop].replace('dist/', '')));

fs.writeFileSync(path.resolve(targetDirectory, 'package.json'), JSON.stringify(pkgJson, null, 2));
