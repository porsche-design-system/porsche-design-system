import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { capitalCase } from 'change-case';

const removeGraph = (str: string): string => str.replace(/### Graph\s+```.*```/gs, '');
const removeGenerator = (str: string): string =>
  str.replace(/----------------------------------------------\s+\*Built with.*/g, '');
const removeWhitespace = (str: string): string => str.replace(/^\s+|\s+$/g, '');

const replaceHeadline = (readme: string): string => {
  const [, tagName] = readme.match(/# (.*)/) ?? [];
  const cleanedTagName = tagName.replace(/^p-|-wrapper/g, '');
  const componentHeadline = capitalCase(cleanedTagName);

  const headline =
    cleanedTagName === 'headline' || cleanedTagName === 'text'
      ? `Typography\n\n## ${componentHeadline}`
      : componentHeadline;

  return readme.replace(tagName, headline);
};

const cleanReadme = (fileContent: string): string => {
  return [replaceHeadline, removeGenerator, removeGraph, removeWhitespace].reduce(
    (previousResult, fn) => fn(previousResult),
    fileContent
  );
};

const cleanReadmes = () => {
  const files = globby.sync('./src/components/**/readme.md');
  for (const file of files) {
    const sourceFile = path.normalize(file);
    const sourceDirectory = path.dirname(sourceFile);
    const componentName = path.basename(sourceDirectory);
    const sourceFileContent = fs.readFileSync(sourceFile, 'utf8');

    const content = cleanReadme(sourceFileContent);

    fs.writeFileSync(path.normalize(`${sourceDirectory}/${componentName}.props.md`), content);
    /*fs.renameSync(path.normalize(file), path.normalize(`${sourceDirectory}/${componentName}.props.md`));*/
  }
};

cleanReadmes();
