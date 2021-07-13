import * as fs from 'fs';

export const generateLoaderPartial = (): string => {
  const types = `type LoaderOptions = {
  withoutTags?: boolean;
}`;

  const filePath = require.resolve('@porsche-design-system/components-js');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const func = `export const getLoader = (opts?: LoaderOptions): string => {
  const options: LoaderOptions = {
    withoutTags: false,
    ...opts
  };
  const { withoutTags } = options;

  const scriptContent = '${fileContent}';

  return withoutTags ? scriptContent : \`<script>\${scriptContent}</script>\`;
};`;

  return [types, func].join('\n\n');
};
