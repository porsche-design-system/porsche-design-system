import * as fs from 'fs';
import * as path from 'path';
import { globbySync } from 'globby';
import { paramCase } from 'change-case';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

const addDeprecatedAnnotations = (): void => {
  const distDir = path.resolve(__dirname, '../dist/vue-wrapper/esm/lib/components');
  const typingFilePaths = globbySync(`${distDir}/*.vue.d.ts`);

  let count = 0;
  typingFilePaths.forEach((filePath) => {
    const tagName = ('p-' + paramCase(path.basename(filePath).replace(/Wrapper\.vue\.d\.ts$/, ''))) as TagName;
    const { isDeprecated, deprecationMessage } = getComponentMeta(tagName);

    if (isDeprecated) {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const newFileContent = fileContent.replace(
        /declare const _default:/,
        `/** @deprecated ${deprecationMessage} */\n$&`
      );
      fs.writeFileSync(filePath, newFileContent);

      count++;
      console.log(`- Added @deprecated to ${path.basename(filePath)}`);
    }
  });

  console.log(`Finished adding @deprecated annotations to ${count} files`);
};

addDeprecatedAnnotations();
