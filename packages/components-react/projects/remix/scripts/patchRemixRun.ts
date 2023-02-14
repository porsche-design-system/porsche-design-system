import * as path from 'path';
import * as fs from 'fs';

export const patchRemixRun = (): void => {
  const packageEntry = require.resolve('@remix-run/dev');
  const compilerDirPath = path.resolve(packageEntry, '../compiler');

  const [fileName] = fs
    .readdirSync(compilerDirPath)
    // file is currently called compileBrowser.js, but the other part is compilerServer.js
    // that's why we also consider compilerBrowser.js to be on the safe side
    .filter((fileName) => fileName.match(/^compiler?Browser\.js$/));

  const filePath = path.resolve(compilerDirPath, fileName);
  const filePathBackup = filePath.replace(/\.js$/, '-original$&');

  if (!fs.existsSync(filePathBackup)) {
    fs.copyFileSync(filePath, filePathBackup);
  } else {
    fs.copyFileSync(filePathBackup, filePath);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');

  const newFileContent = fileContent.replace(
    /"process\.env\.REMIX_DEV_SERVER_WS_PORT": JSON\.stringify\(.*/,
    '$&,\n      "process.browser": "true"'
  );

  const prettyFilePath = filePath.replace(packageEntry.substring(0, packageEntry.indexOf('/node_modules')), '.');
  if (newFileContent.includes('"process.browser": "true"')) {
    console.log(`Successfully patched ${prettyFilePath}`);
  } else {
    console.error(`Patching ${prettyFilePath} failed`);
  }

  fs.writeFileSync(filePath, newFileContent);
};

patchRemixRun();
