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
    /console\.warn\(`The Porsche Design System had to inject our font-face.css file into your head(.|\s)*?\);/,
    ''
  );

  fs.writeFileSync(filePath, result);

  console.log(`Cleaned inject global styles warning`);
};

const addFetchConditionToLoader = (): void => {
  const { filePath, fileContent } = getFileContent();
  const fetchCondition = `if(!window.PDS_SKIP_FETCH) {
      $1
    }`;

  const result = fileContent.replace(/(appGlobals\.globalScripts\(\);)/, fetchCondition);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to loader`);
};

const addFetchConditionToPdsFetch = (): void => {
  const { filePath, fileContent } = getFileContent();

  const fetchCondition = 'const pdsFetch = (input, init) => !window.PDS_SKIP_FETCH ? fetch(input, init) : undefined;';

  const result = fileContent.replace('const pdsFetch = (input, init) => fetch(input, init);', fetchCondition);
  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to icon`);
};

const addPictureConditionToMarque = (): void => {
  const { filePath, fileContent } = getFileContent();

  const conditionalPicture = `$1 !window.PDS_SKIP_FETCH ?$2 : undefined;`;

  const result = fileContent.replace(/(const picture =)( \(resizeObserver.*? }\)\)\));/s, conditionalPicture);

  fs.writeFileSync(filePath, result);

  console.log(`Added fetch condition to marque`);
};

const cleanAndExtendJSDOMBuild = (): void => {
  cleanConsoleWarnInInjectToGlobalStyles();
  addFetchConditionToLoader();
  addFetchConditionToPdsFetch();
  addPictureConditionToMarque();
};

cleanAndExtendJSDOMBuild();
