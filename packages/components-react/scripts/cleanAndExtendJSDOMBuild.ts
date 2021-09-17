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

const cleanConsoleWarnInInjectToGlobalStyles = (): void => {
  const { fileName, filePath, fileContent } = getFileContent('app-globals-');
  const result = fileContent.replace(/console\.warn\((.|\s)*?\);/, '');

  fs.writeFileSync(filePath, result);

  console.log(`Cleaned inject global styles warning in '${fileName}'`);
};

const conditionalFetch = `if(!window.PDS_SKIP_FETCH) {
      $1
    }`;

const addFetchConditionToLoader = () => {
  const { fileName, filePath, fileContent } = getFileContent('loader\\.cjs');
  const result = fileContent.replace(/(appGlobals\.globalScripts\(\);)/, conditionalFetch);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const addFetchConditionToIcon = () => {
  const { fileName, filePath, fileContent } = getFileContent('p-icon\\.cjs\\.entry');

  const result = fileContent.replace(/(getSvgContent\(url\).then\(\(iconContent\) => \{.*\}\);)/s, conditionalFetch);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const addPictureConditionToMarque = () => {
  const { fileName, filePath, fileContent } = getFileContent('p-marque\\.cjs\\.entry');

  const conditionalPicture = `$1 !window.PDS_SKIP_FETCH ?$2 : undefined;`;

  const result = fileContent.replace(/(const picture =)( \(resizeObserver.*}\)\)\));/s, conditionalPicture);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to '${fileName}'`);
};

const cleanAndExtendJSDOMBuild = (): void => {
  cleanConsoleWarnInInjectToGlobalStyles();
  addFetchConditionToLoader();
  addFetchConditionToIcon();
  addPictureConditionToMarque();
};

cleanAndExtendJSDOMBuild();
