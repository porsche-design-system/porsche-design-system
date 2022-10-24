import * as fs from 'fs';
import * as path from 'path';
import { capitalCase, paramCase, pascalCase } from 'change-case';
import * as globby from 'globby';
import { convertToAngularVRTPage } from './convertToAngularVRTPage';
import { convertToReactVRTPage } from './convertToReactVRTPage';

/** array of html file names that don't get converted */
const PAGES_TO_SKIP: string[] = ['table'];
/** array of html file names that are converted but without route since it is maintained manually */
const PAGES_WITHOUT_ROUTE: string[] = ['core-initializer', 'overview'];

type Framework = 'angular' | 'react';

const rootDirectory = path.resolve(__dirname, '..');
const angularPagesDirectory = path.resolve(rootDirectory, '../components-angular/src/app/pages');
const reactPagesDirectory = path.resolve(rootDirectory, '../components-react/src/pages');

const generateAngularReactVRTPages = (): void => {
  const pagesDirectory = path.resolve(rootDirectory, './src/pages');
  const htmlFiles = globby.sync(`${pagesDirectory}/**/*.html`);

  const htmlFileContentMap: { [key: string]: string } = htmlFiles
    .filter((file) => !PAGES_TO_SKIP.map((page) => `${page}.html`).some((page) => file.endsWith(page)))
    .map((filePath) => [path.parse(filePath).name, fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});

  generateVRTPages(htmlFileContentMap, 'angular');
  generateVRTPages(htmlFileContentMap, 'react');
};

export const templateRegEx = /( *<template.*>[\s\S]*?<\/template>)/;
export const iconsRegEx = /(<div class="playground[\sa-z]+overview".*?>)\n(<\/div>)/;
export const scriptRegEx = /\s*<script\b[^>]*>([\s\S]*?)<\/script\b[^>]*>\s*/i;
export const styleRegEx = /\s*<style.*>([\s\S]*?)<\/style>\s*/i;

export const byAlphabet = (a: string, b: string): number =>
  a
    .toLowerCase()
    .replace(/(\w+)(?:component|page)/, '$1')
    .localeCompare(b.toLowerCase().replace(/(\w+)(?:component|page)/, '$1'));

const writeFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
  console.log(`Generated ${filePath.replace(path.resolve(rootDirectory, '..'), '')}`);
};

const normalizeImportPath = (input: string): string => paramCase(input.replace('.component', ''));
const isPageWithoutRoute = (importPath: string): boolean =>
  PAGES_WITHOUT_ROUTE.includes(normalizeImportPath(importPath));

const getRoutes = (importPaths: string[], framework: Framework): string => {
  const isAngular = framework === 'angular';
  const pathPrefix = isAngular ? '' : '/';

  return (
    importPaths
      .filter((importPath) => !isPageWithoutRoute(importPath))
      .map(normalizeImportPath)
      .sort(byAlphabet)
      .map((importPath) =>
        [
          '{',
          ...[
            `name: '${capitalCase(importPath)}'`,
            `path: '${pathPrefix}${importPath}'`,
            isAngular ? `component: ${pascalCase(importPath)}Component` : `element: <${pascalCase(importPath)}Page />`,
          ].map((x) => `  ${x},`),
          '}',
        ]
          .map((x) => `  ${x}`)
          .join('\n')
      )
      .join(',\n') + ','
  );
};

const getImportsAndExports = (importPaths: string[], framework: Framework): string => {
  const isAngular = framework === 'angular';
  const componentSuffix = isAngular ? '' : 'Page';

  return importPaths
    .map((importPath) => {
      const componentImport = `import { ${pascalCase(importPath)}${componentSuffix} } from '${importPath}';`;
      return isPageWithoutRoute(importPath)
        ? [`export * from '${importPath}';`, isAngular && `${componentImport}`]
        : [componentImport];
    })
    .flat()
    .filter((x) => x)
    .sort(byAlphabet)
    .join('\n');
};

const generateVRTPages = (htmlFileContentMap: { [key: string]: string }, framework: Framework): void => {
  const comment = '/* Auto Generated File */';
  const pagesDirectory = framework === 'angular' ? angularPagesDirectory : reactPagesDirectory;

  const importPaths = Object.entries(htmlFileContentMap)
    // .filter(([component]) => component === 'icon') // for easy debugging
    .map(([fileName, fileContent]) => {
      fileContent = fileContent.trim();

      // extract and replace style if there is any
      let [, style] = fileContent.match(styleRegEx) || [];
      fileContent = fileContent.replace(styleRegEx, '\n');

      // get rid of prettier commented
      fileContent = fileContent.replace(/<!-- prettier-ignore -->/g, '');

      // extract and replace script if there is any
      let [, script] = fileContent.match(scriptRegEx) || [];
      fileContent = fileContent.replace(scriptRegEx, '\n');
      script = script?.trim().replace(/([\w.#'()\[\]]+)(\.\w+\s=)/g, '($1 as any)$2'); // handle untyped prop assignments

      const usesComponentsReady = script?.includes('porscheDesignSystem.');
      script = usesComponentsReady ? script.replace('porscheDesignSystem.', '') : script;

      const usesQuerySelector = script?.includes('querySelector');
      const usesPrefixing = !!fileContent.match(/<[a-z-]+-p-[\w-]+/);
      const usesToast = script?.includes('p-toast');
      const [, toastText] = (usesToast && script?.match(/text:\s?(['`].*?['`])/)) || [];

      const isOverviewPage = fileName === 'overview';
      const isIconPage = fileName === 'icon';
      const usesOnInit = script && !isIconPage;
      const usesSetAllReady = script?.includes('componentsReady()');

      // extract template if there is any, replacing is framework specific
      let [, template] = fileContent.match(templateRegEx) || [];

      fileContent = fileContent.trim();

      const { fileName: convertedFileName, fileContent: convertedFileContent } =
        framework === 'angular'
          ? convertToAngularVRTPage(fileName, fileContent, template, style, script, toastText, {
              usesOnInit,
              usesSetAllReady,
              usesComponentsReady,
              usesToast,
              isIconPage,
              usesQuerySelector,
            })
          : convertToReactVRTPage(fileName, fileContent, template, style, script, toastText, {
              usesSetAllReady,
              usesComponentsReady,
              usesToast,
              isIconPage,
              usesQuerySelector,
              usesPrefixing,
              isOverviewPage,
            });

      writeFile(path.resolve(pagesDirectory, convertedFileName), convertedFileContent);

      return './' + path.parse(convertedFileName).name;
    })
    .sort(byAlphabet);

  // imports, exports and routes into barrel file
  const routes = getRoutes(importPaths, framework);
  const importsAndExports = getImportsAndExports(importPaths, framework);
  const separator = '/* Auto Generated Below */';

  let barrelFileName: string;
  let frameworkImports: string;
  let frameworkRoutes: string;

  if (framework === 'angular') {
    frameworkImports = [separator, importsAndExports].join('\n');
    frameworkRoutes = `export const generatedPages = [
  ${importPaths
    .map((importPath) => pascalCase(importPath))
    .sort(byAlphabet)
    .join(',\n  ')},
];

export const generatedRoutes: ExtendedRoute[] = [\n${routes}\n];`;
    barrelFileName = 'index.ts';
  } else if (framework === 'react') {
    const eslintRule = '/* eslint-disable import/first */';
    frameworkImports = [separator, eslintRule, importsAndExports].join('\n');
    frameworkRoutes = `export const generatedRoutes: RouteType[] = [\n${routes}\n];`;
    barrelFileName = 'index.tsx';
  }

  const barrelFilePath = path.resolve(pagesDirectory, barrelFileName);
  const barrelFileContent = fs.readFileSync(barrelFilePath, 'utf8');
  const newBarrelFileContent =
    [barrelFileContent.split(separator)[0].trim(), frameworkImports, frameworkRoutes].join('\n\n') + '\n';

  writeFile(barrelFilePath, newBarrelFileContent);
  console.log(`Generated VRT pages for components-${framework}`);
};

generateAngularReactVRTPages();
