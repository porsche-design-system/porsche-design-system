import * as fs from 'fs';
import * as path from 'path';
import * as console from 'console';

export const generateEncodedFont = () => {
  const fontDirectory = path.resolve('../fonts/src/porsche-next-latin');
  const fontFile = path.resolve(`${fontDirectory}/porsche-next-w-la-regular.woff2`);

  const stepperHorizontalItemDirectory = path.resolve(
    './src/components/navigation/stepper-horizontal/stepper-horizontal-item'
  );
  const stepperHorizontalItemStyleFile = path.resolve(
    `${stepperHorizontalItemDirectory}/stepper-horizontal-item-styles.ts`
  );

  const fontContent = fs.readFileSync(fontFile, { encoding: 'base64' });
  const stepperHorizontalItemStyleFileContent = fs.readFileSync(stepperHorizontalItemStyleFile, { encoding: 'utf8' });

  const inlineFont = `const font = \`'data:font/woff2;charset=utf-8;base64,${fontContent}'\`;`;

  const newContent = stepperHorizontalItemStyleFileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${inlineFont}$2`
  );
  fs.writeFileSync(stepperHorizontalItemStyleFile, newContent);
  console.log('base64 encoded font added into:', stepperHorizontalItemStyleFile);
};

generateEncodedFont();
