import * as fs from 'fs';
import * as path from 'path';
import { globbySync } from 'globby';
import { camelCase, capitalCase, paramCase, pascalCase } from 'change-case';
import { type AngularCharacteristics, convertToAngularVRTPage } from './convertToAngularVRTPage';
import { convertToReactVRTPage, type ReactCharacteristics } from './convertToReactVRTPage';
import { convertToNextJsVRTPage } from './convertToNextJsVRTPage';
import { convertToRemixVRTPage } from './convertToRemixVRTPage';

/** array of html file names that don't get converted */
const PAGES_TO_SKIP: string[] = [];
/** array of html file names that are converted but without route since it is maintained manually */
const PAGES_WITHOUT_ROUTE: string[] = ['core-initializer', 'overview', 'overview-notifications'];

type Framework = 'angular' | 'react' | 'nextjs' | 'remix';

const rootDirectory = path.resolve(__dirname, '..');
const pagesDirectories: Record<Framework, string> = {
  angular: path.resolve(rootDirectory, '../components-angular/src/app/pages/generated'),
  react: path.resolve(rootDirectory, '../components-react/src/pages/generated'),
  nextjs: path.resolve(rootDirectory, '../components-react/projects/nextjs/app'),
  remix: path.resolve(rootDirectory, '../components-react/projects/remix/app/routes'),
};

const generateVRTPages = (): void => {
  const pagesDirectory = path.resolve(rootDirectory, './src/pages');
  const htmlFiles = globbySync(`${pagesDirectory}/**/*.html`);

  const htmlFileContentMap: { [key: string]: string } = htmlFiles
    .filter((file) => !PAGES_TO_SKIP.map((page) => `${page}.html`).some((page) => file.endsWith(page)))
    .map((filePath) => [path.parse(filePath).name, fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});

  generateVRTPagesForJsFramework(htmlFileContentMap, 'angular');
  generateVRTPagesForJsFramework(htmlFileContentMap, 'react');
  generateVRTPagesForJsFramework(htmlFileContentMap, 'nextjs');
  generateVRTPagesForJsFramework(htmlFileContentMap, 'remix');
};

export const templateRegEx = /( *<template.*>[\s\S]*?<\/template>)/;
export const iconsRegEx = /(<div class="playground[\sa-z]+overview".*?>)\n(<\/div>)/;
export const scriptRegEx = /\s*<script\b[^>]*>([\s\S]*?)<\/script\b[^>]*>\s*/i;
export const styleRegEx = /\s*<style.*>([\s\S]*?)<\/style>\s*/i;

export const comment = '/* Auto Generated File */';

export const byAlphabet = (a: string, b: string): number =>
  a
    .toLowerCase()
    .replace(/(\w+)(?:component|page)/, '$1')
    .localeCompare(b.toLowerCase().replace(/(\w+)(?:component|page)/, '$1'));

const writeFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
  console.log(`- Generated ${filePath.replace(path.resolve(rootDirectory, '..'), '')}`);
};

const normalizeImportPath = (input: string): string =>
  paramCase(input.replace('.component', '').replace('generated/', ''));
const isPageWithoutRoute = (importPath: string): boolean =>
  PAGES_WITHOUT_ROUTE.includes(normalizeImportPath(importPath));

const getRoutes = (importPaths: string[], framework: Framework): string => {
  const isAngular = framework === 'angular';
  const pathPrefix = isAngular ? '' : '/';

  return (
    importPaths
      .filter((importPath) => !isPageWithoutRoute(importPath))
      // temporary map to tuple with normalized importPath for sorting
      .map((importPath) => [importPath, normalizeImportPath(importPath)])
      .sort(([_, normalizedImportPathA], [__, normalizedImportPathB]) =>
        byAlphabet(normalizedImportPathA, normalizedImportPathB)
      )
      // map it back to importPath only
      .map(([importPath]) => importPath)
      .map((importPath) => {
        const { name } = path.parse(importPath);
        return [
          '{',
          ...[
            `name: '${capitalCase(name)}'`,
            `path: '${pathPrefix}${normalizeImportPath(importPath)}'`,
            isAngular ? `component: ${pascalCase(name)}Component` : `element: <${pascalCase(name)}Page />`,
          ].map((x) => `  ${x},`),
          '}',
        ]
          .map((x) => `  ${x}`)
          .join('\n');
      })
      .join(',\n') + ','
  );
};

const getImportsAndExports = (importPaths: string[], framework: Framework): string => {
  const isAngular = framework === 'angular';
  const componentSuffix = isAngular ? 'Component' : 'Page';

  return importPaths
    .map((importPath) => {
      const { name } = path.parse(importPath);
      const componentImport = `import { ${pascalCase(name)}${componentSuffix} } from '${importPath}';`;
      return isPageWithoutRoute(importPath)
        ? [`export * from '${importPath}';`, ...(isAngular ? [`${componentImport}`] : [])]
        : [componentImport];
    })
    .flat()
    .sort(byAlphabet)
    .join('\n');
};

const generateVRTPagesForJsFramework = (htmlFileContentMap: Record<string, string>, framework: Framework): void => {
  console.log(`Generating VRT pages for ${framework}`);

  const hasGeneratedSubFolder = !!pagesDirectories[framework].match(/\/generated$/);
  if (hasGeneratedSubFolder) {
    fs.rmSync(pagesDirectories[framework], { force: true, recursive: true });
    fs.mkdirSync(pagesDirectories[framework]);
  }

  const importPaths = Object.entries(htmlFileContentMap)
    // .filter(([component]) => component === 'icon') // for easy debugging
    .filter(([component]) => (framework === 'remix' ? ['overview'].includes(component) : true)) // only overview page for remix
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

      const usesComponentsReady = script?.includes('porscheDesignSystem.') && fileName === 'core-initializer';
      script = usesComponentsReady ? script.replace('porscheDesignSystem.', '') : script;

      const usesQuerySelector = script?.includes('querySelector') && fileName === 'core-initializer';
      const usesPrefixing = !!fileContent.match(/<[a-z-]+-p-[\w-]+/);
      const usesToast = script?.includes('p-toast');
      const [, toastText] = (usesToast && script?.match(/text:\s?(['`].*?['`])/)) || [];

      const isIconPage = fileName === 'icon';
      const usesOnInit = !!script && !isIconPage && (fileName === 'core-initializer' || usesToast);
      const usesSetAllReady = script?.includes('componentsReady()') && fileName === 'core-initializer';

      // extract template if there is any, replacing is framework specific
      let [, template] = fileContent.match(templateRegEx) || [];

      fileContent = fileContent.trim();

      const baseParams: [string, string, string, string, string, string] = [
        fileName,
        fileContent,
        template,
        style,
        script,
        toastText,
      ];

      const angularCharacteristics: AngularCharacteristics = {
        usesOnInit,
        usesSetAllReady,
        usesComponentsReady,
        usesToast,
        isIconPage,
        usesQuerySelector,
      };

      const reactCharacteristics: ReactCharacteristics = {
        usesSetAllReady,
        usesComponentsReady,
        usesToast,
        isIconPage,
        usesQuerySelector,
        usesPrefixing,
      };

      const { fileName: convertedFileName, fileContent: convertedFileContent } =
        framework === 'angular'
          ? convertToAngularVRTPage(...baseParams, angularCharacteristics)
          : framework === 'react'
            ? convertToReactVRTPage(...baseParams, reactCharacteristics)
            : framework === 'nextjs'
              ? convertToNextJsVRTPage(...baseParams, reactCharacteristics)
              : framework === 'remix'
                ? convertToRemixVRTPage(...baseParams, reactCharacteristics)
                : { fileName: '', fileContent: '' };

      const targetFilePath = path.resolve(pagesDirectories[framework], convertedFileName);
      if (framework === 'nextjs') {
        const { dir: componentDir } = path.parse(targetFilePath);
        fs.rmSync(componentDir, { force: true, recursive: true });
        fs.mkdirSync(componentDir);
      }

      writeFile(targetFilePath, convertedFileContent);
      const { dir, name } = path.parse(convertedFileName);
      return (hasGeneratedSubFolder ? './generated/' : './') + (dir ? dir : name);
    })
    .sort(byAlphabet);

  // imports, exports and routes into barrel file
  const routes = getRoutes(importPaths, framework);
  const importsAndExports = getImportsAndExports(importPaths, framework);
  const separatorStart: string = '/* Auto Generated Below */';
  const separatorEnd: string = '/* Auto Generated Above */';

  let barrelFileName: string = '';
  let frameworkImports: string = '';
  let frameworkRoutes: string = '';

  if (framework === 'angular') {
    frameworkImports = [separatorStart, importsAndExports].join('\n');
    frameworkRoutes = `export const generatedPages = [
  ${importPaths
    .map((importPath) => pascalCase(importPath.replace('generated/', '')))
    .sort(byAlphabet)
    .join(',\n  ')},
];

export const generatedRoutes: ExtendedRoute[] = [\n${routes}\n];`;
    barrelFileName = 'index.ts';
  } else if (framework === 'react') {
    const eslintRule = '/* eslint-disable import/first */';
    frameworkImports = [separatorStart, eslintRule, importsAndExports].join('\n');
    frameworkRoutes = `export const generatedRoutes: RouteType[] = [\n${routes}\n];`;
    barrelFileName = 'index.tsx';
  } else if (framework === 'nextjs') {
    frameworkRoutes = `const generatedRoutes = ${JSON.stringify(
      importPaths
        .map((importPath) => ({ path: importPath.replace(/^\./, ''), name: pascalCase(importPath) }))
        .reduce((a, v) => ({ ...a, [camelCase(v.path)]: v }), {}),
      null,
      2
    )};`;
    // no imports needed, but we want to inject the routes at the beginning
    frameworkRoutes = [separatorStart, frameworkRoutes, separatorEnd].join('\n');
    barrelFileName = 'routes.ts';
  }

  if (barrelFileName) {
    const barrelFilePath = path.resolve(
      pagesDirectories[framework],
      hasGeneratedSubFolder || framework === 'nextjs' ? '..' : '',
      barrelFileName
    );
    const barrelFileContent = fs.readFileSync(barrelFilePath, 'utf8');
    const newBarrelFileContent =
      (framework === 'nextjs'
        ? [frameworkRoutes, barrelFileContent.split(separatorEnd)[1].trim()]
        : [barrelFileContent.split(separatorStart)[0].trim(), frameworkImports, frameworkRoutes]
      ).join('\n\n') + '\n';

    writeFile(barrelFilePath, newBarrelFileContent);
  }

  console.log(`Generated VRT pages for ${framework}`);
};

generateVRTPages();
