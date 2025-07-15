import * as fs from 'node:fs';
import * as semver from 'semver';
import { globbySync } from 'globby';

const pkgVersion = process.argv[2];

if (semver.valid(pkgVersion) === null) {
  throw new Error(`Invalid package version "${pkgVersion}" passed.`);
}

const pkgFiles = globbySync([
  './**/package.json',
  '!./**/node_modules/**',
  '!./packages/storefront/projects/stackblitz/src/**',
]);
const pkgNames = [
  '@porsche-design-system/components',
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-angular',
  '@porsche-design-system/components-react',
  '@porsche-design-system/components-vue',
];

for (const pkgFile of pkgFiles) {
  console.log(`Checking ${pkgFile}:`);
  for (const pkgName of pkgNames) {
    const pkgContent = fs.readFileSync(pkgFile, 'utf8');
    const pkgJson = JSON.parse(pkgContent);
    let updated = false;

    // Check and update in 'version'
    if (pkgJson.name === pkgName) {
      console.log(`- Found ${pkgName} in 'name'. Updating…`);
      pkgJson.version = pkgVersion;
      updated = true;
    }

    // Check and update in 'dependencies'
    if (pkgJson.dependencies?.[pkgName]) {
      console.log(`- Found ${pkgName} in 'dependencies'. Updating…`);
      pkgJson.dependencies[pkgName] = pkgVersion;
      updated = true;
    }

    // Check and update in 'devDependencies'
    if (pkgJson.devDependencies?.[pkgName]) {
      console.log(`- Found ${pkgName} in 'devDependencies'. Updating…`);
      pkgJson.devDependencies[pkgName] = pkgVersion;
      updated = true;
    }

    // Check and update in 'peerDependencies'
    if (pkgJson.peerDependencies?.[pkgName]) {
      console.log(`- Found ${pkgName} in 'peerDependencies'. Updating…`);
      pkgJson.peerDependencies[pkgName] = pkgVersion;
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(pkgFile, `${JSON.stringify(pkgJson, null, 2)}\n`);
    }
  }
}
