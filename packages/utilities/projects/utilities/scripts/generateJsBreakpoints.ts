import * as fs from 'fs';
import * as path from 'path';
import { breakpoint } from '../src/js/breakpoint';

const generateBreakpointMapWithoutUnit = (): void => {
  const content =
    'const breakpoint: {[key in Breakpoint]: number} = ' +
    JSON.stringify(
      Object.fromEntries(Object.entries(breakpoint).map(([k, v]) => [k, parseInt(v.slice(0, -2), 10)])),
      null,
      2
    );
  const targetPath = path.normalize('./src/js/mediaQuery.ts');
  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${content}$2`
  );
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Injected static breakpoints into '${targetPath}'`);
};

generateBreakpointMapWithoutUnit();
