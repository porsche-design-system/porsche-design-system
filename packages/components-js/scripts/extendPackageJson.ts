import * as fs from 'fs';
import * as path from 'path';

const rootDirectory = path.resolve(__dirname, '..');
const targetDirectory = path.resolve(rootDirectory, 'dist/components-wrapper');

const pkgJson = require('../dist/components-wrapper/package.json');

// add dependency
Object.assign(pkgJson, {
  dependencies: { '@porsche-design-system/utilities-jss': 'file:utilities/jss' },
});

fs.writeFileSync(path.resolve(targetDirectory, 'package.json'), JSON.stringify(pkgJson, null, 2));
