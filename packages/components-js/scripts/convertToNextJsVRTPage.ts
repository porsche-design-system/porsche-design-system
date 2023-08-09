import * as fs from 'fs';
import * as path from 'path';
import { convertToReactVRTPage, ReactCharacteristics } from './convertToReactVRTPage';
import { paramCase } from 'change-case';

const sourceBasePath = path.resolve(__dirname, '../../components-react/src');
const pollComponentsReadyFilePath = path.resolve(sourceBasePath, 'pollComponentsReady.ts');
const pollComponentsReadyFileContent = fs.readFileSync(pollComponentsReadyFilePath, 'utf8');

export const convertToNextJsVRTPage = (
  ...params: [string, string, string, string, string, string, ReactCharacteristics]
): { fileName: string; fileContent: string } => {
  const { fileName: convertedFileName, fileContent: convertedFileContent } = convertToReactVRTPage(...params);

  let newFileContent = convertedFileContent
    .replace(
      /\/\* Auto Generated File \*\//,
      convertedFileContent.match(/use[A-Z]/)
        ? "$&\n'use client';\nimport type { NextPage } from 'next';"
        : "$&\nimport type { NextPage } from 'next';"
    )
    .replace(/import { pollComponentsReady } from '\.\.\/pollComponentsReady';/, pollComponentsReadyFileContent)
    .replace(/import { Toast } from '/, '$&../')
    .replace(/export (const pollComponentsReady)/, '$1')
    .replace(
      /export\s+(const\s+)(.*)(\s+=\s+\(\):\s+JSX\.Element\s+=>\s+{[\s\S]*};)/,
      '$1$2: NextPage$3\n\nexport default $2;'
    )
    .replace(/@porsche-design-system\/components-react/g, '$&/ssr') // tweak path to ssr subpackage
    .replace(/(\w|>)'(\w|<)/g, '$1&apos;$2') // escape single quotes
    .replace(/([\w>(])"([\w<)])/g, '$1&quot;$2') // escape double quotes
    .replace(/(url\()&quot;(.*)&quot;(\);)/, '$1"$2"$3') // revert escaped double quotes for css styles
    .replace(/<img/g, '<Image');

  if (newFileContent.includes('<Image')) {
    newFileContent = newFileContent.replace(/\/\* Auto Generated File \*\//, "$&\nimport Image from 'next/image';");
  }

  return {
    fileName: `${paramCase(convertedFileName.replace(/\.tsx/, ''))}/page.tsx`,
    fileContent: newFileContent,
  };
};
