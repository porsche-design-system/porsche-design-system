import * as fs from 'fs';
import * as path from 'path';
import type { CommonConfig } from '../../shared-definitions/entry-config';
import { filePathByPattern } from './file-by-pattern';

const configFileName = 'cm.config.js';
const packageJsonFileName = 'package.json';

type PackageJson = {
  version: string;
};

export type GlobalStylesFile = {
  pattern: string;
};
export type GlobalStylesSrc = {
  src: string;
};
export type GlobalStyles = GlobalStylesFile | GlobalStylesSrc;

export type CopyFile = {
  pattern: string;
  targetDirectory: string;
};

export function isGlobalStyleSrc(globalStyle: GlobalStyles): globalStyle is GlobalStylesSrc {
  return (globalStyle as GlobalStylesSrc).src !== undefined;
}

export type ComponentsManagerConfig = CommonConfig & {
  deployUrl?: string;
  targetDirectory?: string;
  globalStyles?: GlobalStyles;
  inlineStyles?: string;
  script: string;
  copyFiles?: CopyFile[];
};

export function getProjectRootPath(): string {
  return path.resolve('.');
}

export async function getConfig(): Promise<ComponentsManagerConfig> {
  const configFilePath = await filePathByPattern(`**/${configFileName}`);

  try {
    fs.statSync(configFilePath);
  } catch (error) {
    console.error(`Config file could not be found.`);
    console.error(`Please ensure that you've created a valid configuration file`);
    console.error(`named "${configFileName}" in the directory you're executing the`);
    console.error(`cm command in.\n`);
    process.exit(1);
  }

  return await import(configFilePath);
}

export function getProjectPackageJson(): PackageJson {
  const packageJsonPath = path.resolve(getProjectRootPath(), packageJsonFileName);
  try {
    fs.statSync(packageJsonPath);
  } catch (error) {
    console.error(`"${packageJsonFileName}" could not be found.`);
    console.error(`Please ensure that you're executing the cm command in the`);
    console.error(`directory your "${packageJsonFileName}" is in.`);
    process.exit(1);
  }

  const packageJsonString = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(packageJsonString);
}
