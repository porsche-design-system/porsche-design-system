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

const cleanInjectGlobalStyles = (): void => {
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
  // const picture = !window.SKIP_FETCH ? (resizeObserver.h("picture", null, this.size === 'responsive' ? ([
  //   resizeObserver.h("source", {
  //     srcSet: buildSrcSet(manifestPath, 'medium'),
  //     media: `(min-width: ${resizeObserver.breakpoint.l}px)`
  //   }),
  //   resizeObserver.h("source", {srcSet: buildSrcSet(manifestPath, 'small')}),
  // ]) : (resizeObserver.h("source", {srcSet: buildSrcSet(manifestPath, this.size)})), resizeObserver.h("img", {
  //   src: `${cdnBaseUrl}/${manifestPath.medium['2x']}`,
  //   alt: "Porsche"
  // }))) : undefined;
};

const addFetchConditions = (): void => {
  addFetchConditionToLoader();
  addFetchConditionToIcon();
};

// Icon();
// cleanFetchMarque();
cleanInjectGlobalStyles();
addFetchConditions();
