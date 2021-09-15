import * as fs from 'fs';
import * as path from 'path';

const getFileContent = (fileToFind: string): { fileName: string; filePath: string; fileContent: string } => {
  const rootDirectory = path.resolve(__dirname, '..');
  const directory = path.resolve(rootDirectory, 'dist/components-wrapper/jsdom-polyfill/lib');
  const fileNameRegEx = new RegExp(`^${fileToFind}[\\d\\w]*.js\$`);
  const [fileName] = fs.readdirSync(directory).filter((el) => !!el.match(fileNameRegEx));
  const filePath = path.resolve(directory, fileName);

  return { fileName, filePath, fileContent: fs.readFileSync(filePath, 'utf8') };
};

const cleanAndExtendJSDOMBuild = (): void => {
  const { fileName, filePath, fileContent } = getFileContent('app-globals-');
  const result = fileContent.replace(/console\.warn\((.|\s)*?\);/, '');

  fs.writeFileSync(filePath, result);

  console.log(`Cleaned inject global styles warning in '${fileName}'`);
};

const addFetchConditionToLoader = () => {
  const { fileName, filePath, fileContent } = getFileContent('loader\\.cjs');
  const replaceValue = `if(!window.PDS_SKIP_FETCH) {
      appGlobals.globalScripts();
    }`;
  const result = fileContent.replace('appGlobals.globalScripts();', replaceValue);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const addFetchConditionToIcon = () => {
  const { fileName, filePath, fileContent } = getFileContent('p-icon\\.cjs\\.entry');

  const replaceValue = `if(!window.PDS_SKIP_FETCH) {
    $1
   }`;

  const result = fileContent.replace(/(getSvgContent\(url\).then\(\(iconContent\) => \{.*\}\);)/s, replaceValue);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const addPictureConditionToMarque = () => {
  const { fileName, filePath, fileContent } = getFileContent('p-marque\\.cjs\\.entry');

  const replaceValue = `$1 !window.PDS_SKIP_FETCH ?$2 : undefined;`;

  const result = fileContent.replace(/(const picture =)( \(resizeObserver.*}\)\)\));/s, replaceValue);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const addFetchConditions = (): void => {
  addFetchConditionToLoader();
  addFetchConditionToIcon();
  addPictureConditionToMarque();
};

cleanAndExtendJSDOMBuild();
addFetchConditions();
