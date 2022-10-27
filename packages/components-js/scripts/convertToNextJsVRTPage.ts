import { convertToReactVRTPage } from './convertToReactVRTPage';
import * as fs from 'fs';
import * as path from 'path';
import { paramCase } from 'change-case';

type Characteristics = {
  usesSetAllReady: boolean;
  usesComponentsReady: boolean;
  usesToast: boolean;
  isIconPage: boolean;
  usesQuerySelector: boolean;
  usesPrefixing: boolean;
  isOverviewPage: boolean;
};

const sourceBasePath = path.resolve(__dirname, '../../components-react/src');
const pollComponentsReadyFilePath = path.resolve(sourceBasePath, 'pollComponentsReady.ts');
const pollComponentsReadyFileContent = fs.readFileSync(pollComponentsReadyFilePath, 'utf8');

export const convertToNextJsVRTPage = (
  fileName: string,
  fileContent: string,
  template: string,
  style: string,
  script: string,
  toastText: string,
  characteristics: Characteristics
): { fileName: string; fileContent: string } => {
  const {
    usesSetAllReady,
    usesComponentsReady,
    usesToast,
    isIconPage,
    usesQuerySelector,
    usesPrefixing,
    isOverviewPage,
  } = characteristics;

  const { fileName: convertedFileName, fileContent: convertedFileContent } = convertToReactVRTPage(
    fileName,
    fileContent,
    template,
    style,
    script,
    toastText,
    {
      usesSetAllReady,
      usesComponentsReady,
      usesToast,
      isIconPage,
      usesQuerySelector,
      usesPrefixing,
      isOverviewPage,
    }
  );

  const newFileContent = convertedFileContent
    .replace('/* Auto Generated File */', "/* Auto Generated File */\nimport type { NextPage } from 'next';")
    .replace(/import { pollComponentsReady } from '\.\.\/pollComponentsReady';/, pollComponentsReadyFileContent)
    .replace(
      /export\s+(const\s+)(.*)(\s+=\s+\(\):\s+JSX\.Element\s+=>\s+{[\s\S]*};)/,
      '$1$2: NextPage$3\n\nexport default $2;'
    )
    .replace(/@porsche-design-system\/components-react/g, '$&/ssr')
    .replace(/(\w|>)'(\w|<)/g, '$1&apos;$2') // escape single quotes
    .replace(/([\w>(])"([\w<)])/g, '$1&quot;$2') // escape double quotes
    .replace(/(url\()&quot;(.*)&quot;(\);)/, '$1"$2"$3'); // revert escaped double quotes for css styles

  return { fileName: paramCase(convertedFileName.replace(/\.tsx/, '')) + '.tsx', fileContent: newFileContent };
};
