import * as fs from 'fs';
import * as path from 'path';

const rootDirectory = path.resolve(__dirname, '..');
const targetDirectory = path.resolve(rootDirectory, 'dist/jss');

// read and remove props from package.json
const propsToRemove = ['private', 'scope', 'sideEffects', 'scripts', 'dependencies', 'devDependencies'];
const pkgJson = require('../package.json');
propsToRemove.forEach((prop) => Reflect.deleteProperty(pkgJson, prop));

// fix entrypoints
const propsToClean = ['main', 'module', 'types'];
propsToClean.forEach((prop) => (pkgJson[prop] = pkgJson[prop].replace('dist/jss/', '')));

// change name
pkgJson['name'] = '@porsche-design-system/utilities-jss';

fs.writeFileSync(path.resolve(targetDirectory, 'package.json'), JSON.stringify(pkgJson, null, 2));
