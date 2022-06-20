import * as fs from 'fs';
import * as path from 'path';
import { version } from '../package.json';
import { pascalCase } from 'change-case';

const updateContent = (oldContent: string, newContent: string): string => {
  const separator = '/* Auto Generated Below */';
  return `${oldContent.substr(0, oldContent.indexOf(separator))}${separator}
${newContent}`;
};

type ScriptName = 'init-banner' | 'init-overlay' | 'init-cookie-overlay';

const getCdnScript = (name: ScriptName): string =>
  fs
    .readFileSync(path.normalize(`./tmp/${name}.min.${version}.js`), 'utf8')
    .replace(version, '${version}') // make hardcoded version dynamic
    .replace(/\\/g, '\\\\') // double escape is needed for output
    .replace(/^\s+|\s+$/g, ''); // replace new line at end

const generatePartials = (): void => {
  const targetFile = path.normalize('./src/index.ts');
  const oldContent = fs.readFileSync(targetFile, 'utf8');

  const scripts: ScriptName[] = ['init-banner', 'init-overlay', 'init-cookie-overlay'];
  const newContent = scripts
    .map((script) => {
      let partialNameSuffix = script.replace(/init-?/, '');
      if (partialNameSuffix.length > 0) {
        partialNameSuffix = pascalCase(partialNameSuffix);
      }
      return `// prettier-ignore
export const include${partialNameSuffix} = (): string => \`<script>${getCdnScript(script)}</script>\`;`;
    })
    .join('\n');

  fs.writeFileSync(targetFile, updateContent(oldContent, newContent));
};

generatePartials();
