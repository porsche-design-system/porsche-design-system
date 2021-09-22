import * as fs from 'fs';
import * as path from 'path';

const cleanConsoleWarnInInjectToGlobalStyles = (fileContent: string): string => {
  return fileContent.replace(
    /console\.warn\(`The Porsche Design System had to inject our font-face.css file into your head.(.|\s)*?\);/,
    ''
  );
};

const addConditionToGlobalScripts = (fileContent: string): string => {
  return fileContent.replace(/(appGlobals\.globalScripts\(\);)/, 'if(!window.PDS_SKIP_FETCH) { $1 }');
};

const addConditionToPdsFetch = (fileContent: string): string => {
  return fileContent.replace(
    /(const pdsFetch = \(input, init\) =>) (fetch\(input, init\);)/,
    '$1 window.PDS_SKIP_FETCH ? undefined : $2'
  );
};

const addPictureConditionToMarque = (fileContent: string): string => {
  return fileContent.replace(
    /(const picture =)( \(resizeObserver(?:.|\s)*?;)/,
    '$1 window.PDS_SKIP_FETCH ? undefined : $2'
  );
};

const cleanScriptTagsInComments = (fileContent: string): string => {
  return fileContent.replace(/\/\/.*(?:<\/|<)script>/g, '');
};

const cleanJsdomBuild = (): void => {
  const directory = require.resolve('@porsche-design-system/components-react');
  const filePath = path.resolve(directory, '../jsdom-polyfill/index.js');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const content = [
    cleanConsoleWarnInInjectToGlobalStyles,
    addConditionToGlobalScripts,
    addConditionToPdsFetch,
    addPictureConditionToMarque,
    cleanScriptTagsInComments,
  ].reduce((previousResult, fn) => fn(previousResult), fileContent);

  fs.writeFileSync(filePath, content);
  console.log('jsdom build successful cleaned');
};

cleanJsdomBuild();
