import * as fs from 'fs';
import * as path from 'path';
import { paramCase } from 'change-case';
import { convertToReactVRTPage, ReactCharacteristics } from './convertToReactVRTPage';

const sourceBasePath = path.resolve(__dirname, '../../components-react/src');
const pollComponentsReadyFilePath = path.resolve(sourceBasePath, 'pollComponentsReady.ts');
const pollComponentsReadyFileContent = fs.readFileSync(pollComponentsReadyFilePath, 'utf8');

export const convertToRemixVRTPage = (
  ...params: [string, string, string, string, string, string, ReactCharacteristics]
): { fileName: string; fileContent: string } => {
  const { fileName, fileContent } = convertToReactVRTPage(...params);

  let newFileContent = fileContent
    .replace(/import { pollComponentsReady } from '\.\.\/pollComponentsReady';/, pollComponentsReadyFileContent)
    .replace(/export\s(const\s)([a-zA-Z]+)(\s=\s\(\):\sJSX\.Element\s=>\s{[\s\S]+};)/, '$1$2$3\n\nexport default $2;')
    .replace(/@porsche-design-system\/components-react/g, '$&/ssr') // tweak path to ssr subpackage
    .replace(/(\w|>)'(\w|<)/g, '$1&apos;$2') // escape single quotes
    .replace(/([\w>(])"([\w<)])/g, '$1&quot;$2') // escape double quotes
    .replace(/(url\()&quot;(.*)&quot;(\);)/, '$1"$2"$3'); // revert escaped double quotes for css styles

  return { fileName: paramCase(fileName.replace(/\.tsx/, '')) + '.tsx', fileContent: newFileContent };
};
