import * as path from 'path';
import * as fs from 'fs';
import {
  getConfig,
  getProjectPackageJson,
  getProjectRootPath,
  type GlobalStyles,
  isGlobalStyleSrc,
} from '../services/config';
import { generateWebPackConfig } from '../services/webpack.config';
import { runWebpack } from '../services/webpack';
import { copyFileByPattern, fileContentByPattern, filenameByPattern } from '../services/file-by-pattern';

export const buildCommand = 'build';
const DEFINITIONS_FILE_NAME = 'index.d.ts';

export const build = async () => {
  const componentsManagerConfig = await getConfig();
  const {
    deployUrl = '',
    targetDirectory = './dist/cm',
    script = '',
    globalStyles = null,
    inlineStyles = null,
    version = null,
    copyFiles = [],
    additionalEntryFiles = [],
    format,
  } = componentsManagerConfig;
  const { version: fallbackVersion } = getProjectPackageJson();

  if (deployUrl === '') {
    console.error(`You have to define a deployUrl in your configuration.`);
    process.exit(1);
  }

  const scriptUrl: string = await getScriptUrl(script, deployUrl);
  const stylesUrl = await getStyleUrl(globalStyles, deployUrl);
  const inlineStylesContent = await getInlineStylesContent(inlineStyles);

  const tempEntryPointFilePath = path.resolve(__dirname, '../../library-entry', 'index-temp.js');
  const webpackConfig = generateWebPackConfig(targetDirectory, {
    version: version || fallbackVersion,
    script: scriptUrl,
    stylesUrl: stylesUrl || '',
    inlineStyles: inlineStylesContent || '',
    additionalEntryFiles,
    tempEntryPointFilePath,
    format,
  });
  await runWebpack(webpackConfig);

  await copyDefinitionFile(targetDirectory);
  await extendDefinitionFile(
    targetDirectory,
    additionalEntryFiles.map((x) => x.typingFilePath!).filter((x) => x)
  );

  for (const copyFile of copyFiles) {
    await copyFileByPattern(copyFile.pattern, copyFile.targetDirectory);
  }

  fs.unlinkSync(tempEntryPointFilePath); // delete temporary file again

  console.log(`Build successful.\n`);
};

async function getScriptUrl(script: string, deployUrl: string): Promise<string> {
  if (script.includes('//')) {
    return script;
  }

  const filename = await filenameByPattern(script);
  return `${deployUrl}/${filename}`;
}

async function getStyleUrl(globalStyles: GlobalStyles | null, deployUrl: string): Promise<string | null> {
  if (globalStyles) {
    if (isGlobalStyleSrc(globalStyles)) {
      return globalStyles.src;
    }

    const filename = await filenameByPattern(globalStyles.pattern);
    return `${deployUrl}/${filename}`;
  }

  return null;
}

async function getInlineStylesContent(inlineStyles: string | null): Promise<string | null> {
  if (inlineStyles) {
    return await fileContentByPattern(inlineStyles);
  }

  return null;
}

const getDefinitionsFilePath = (targetDirectory: string): string =>
  path.resolve(getProjectRootPath(), targetDirectory, DEFINITIONS_FILE_NAME);

async function copyDefinitionFile(targetDirectory: string) {
  const definitionsFile = 'with-prefix.d.ts';
  const definitionsFilePath = path.resolve(__dirname, '../../library-entry', definitionsFile);
  await fs.promises.copyFile(definitionsFilePath, getDefinitionsFilePath(targetDirectory));
}

async function extendDefinitionFile(targetDirectory: string, definitionFiles: string[]) {
  if (definitionFiles.length) {
    const targetFilePath = getDefinitionsFilePath(targetDirectory);
    const content = fs.readFileSync(targetFilePath, 'utf8');

    const result = `${content}\n\n${definitionFiles.map((file) => fs.readFileSync(file).toString()).join('\n\n')}`;
    fs.writeFileSync(targetFilePath, result);
  }
}
