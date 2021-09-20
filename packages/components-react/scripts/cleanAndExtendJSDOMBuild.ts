import * as fs from 'fs';
import * as path from 'path';

const getFileContent = (): { filePath: string; fileContent: string } => {
  const rootDirectory = path.resolve(__dirname, '..');
  const directory = path.resolve(rootDirectory, 'dist/components-wrapper/jsdom-polyfill');
  const filePath = path.resolve(directory, 'index.js');

  return { filePath, fileContent: fs.readFileSync(filePath, 'utf8') };
};

const cleanConsoleWarnInInjectToGlobalStyles = (): void => {
  const { filePath, fileContent } = getFileContent();
  const result = fileContent.replace(
    /console\.warn\(`The Porsche Design System had to inject our font-face.css file into your head.(.|\s)*?\);/,
    ''
  );

  fs.writeFileSync(filePath, result);

  console.log('Cleaned inject global styles warning ');
};

const conditionalFetch = `if(!window.PDS_SKIP_FETCH) {
      $1
    }`;

const addConditionToGlobalScripts = () => {
  const { filePath, fileContent } = getFileContent();
  const result = fileContent.replace(/(appGlobals\.globalScripts\(\);)/, conditionalFetch);

  fs.writeFileSync(filePath, result);

  console.log('Added fetch condition to globalScripts');
};

const addConditionToPdsFetch = () => {
  const { filePath, fileContent } = getFileContent();
  const replaceValue = `const pdsFetch = \(input, init\) => !window.PDS_SKIP_FETCH ? fetch\(input, init\) : 'undefined'`;

  const result = fileContent.replace(/const pdsFetch = \(input, init\) => fetch\(input, init\);/s, replaceValue);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to icon`);
};

const addPictureConditionToMarque = () => {
  const { filePath, fileContent } = getFileContent();

  const conditionalPicture = `$1 !window.PDS_SKIP_FETCH ?$2 : undefined;`;

  const result = fileContent.replace(/(const picture =)( \(resizeObserver.*? }\)\)\));/s, conditionalPicture);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to marque`);
};

const cleanAndExtendJSDOMBuild = (): void => {
  cleanConsoleWarnInInjectToGlobalStyles();
  addConditionToGlobalScripts();
  addConditionToPdsFetch();
  addPictureConditionToMarque();
};

cleanAndExtendJSDOMBuild();
