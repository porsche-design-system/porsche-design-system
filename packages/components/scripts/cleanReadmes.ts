import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';
import { capitalCase } from 'change-case';

const removeGenerator = (str: string): string =>
  str.replace(/\s+----------------------------------------------\s+\*Built with.*/g, '');

const transformDoubleToSingleQuotes = (str: string): string => str.replace(/"/g, "'");

const replaceHeadline = (str: string): string => {
  const [, tagName] = str.match(/# (.*)/) ?? [];
  const cleanedTagName = tagName.replace(/^p-|-wrapper/g, '');
  const componentHeadline = capitalCase(cleanedTagName);
  console.log(cleanedTagName, '\n---------------------------------\n');
  const headline =
    cleanedTagName === 'headline' || cleanedTagName === 'text'
      ? `Typography\n\n## ${componentHeadline}`
      : componentHeadline;

  return str.replace(tagName, headline);
};

const fixBreakpointCustomizable = (str: string): string => {
  return str.replace(/(?:\|\s`.*?`\s*?){2}\|.*?\|\s`(.*?)`/g, (match, group) => {
    let [, breakpointCustomizable] = group.match(/string\s\\\|\s{.*?base:\s(.*?);\s}/) ?? [];

    if (breakpointCustomizable) {
      // Sort if Numbers
      if (breakpointCustomizable.match(/\s\d+\s/)?.length) {
        breakpointCustomizable = breakpointCustomizable
          .split(' \\| ')
          .map((x: string) => (isNaN(+x) ? x : +x))
          .sort((a: any, b: any) => a - b)
          .join(' \\| ');
      }

      match = match.replace(group, `${breakpointCustomizable} \\| BreakpointCustomizable<${breakpointCustomizable}>`);
    }
    return match;
  });
};

const cleanReadme = (fileContent: string): string => {
  return [replaceHeadline, removeGenerator, transformDoubleToSingleQuotes, fixBreakpointCustomizable].reduce(
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
