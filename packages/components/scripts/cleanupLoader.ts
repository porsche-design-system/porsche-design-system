import * as fs from 'fs';
import * as path from 'path';

const cleanupLoader = () => {
  const srcFilePath = './dist/esm/loader.js';
  const srcFile = path.normalize(srcFilePath);
  const srcContent = fs.readFileSync(srcFile, 'utf8');

  // Stencil imports everything the loader needs from the runtime chunk in one statement
  const [, runtimeImport] = /(import \{[^}]*?bootstrapLazy[^}]*?} from ".*?");/.exec(srcContent) || [];
  const [, lazyData] = /bootstrapLazy\((JSON.parse\("\[.*]"\)),/.exec(srcContent) || [];

  if (
    !lazyData ||
    !runtimeImport ||
    !/\bglobalScripts\b/.test(runtimeImport) ||
    !/\bsetTagTransformer\b/.test(runtimeImport)
  ) {
    throw new Error('Failed cleaning up Loader.\n');
  }

  // Rolldown keeps the code every component uses in a chunk of its own, apart from the runtime. The main chunk of
  // components-js has to contain it, otherwise webpack copies it into the chunk of each component.
  const esmDir = path.dirname(srcFile);
  const esmFiles = fs.readdirSync(esmDir);
  const entryFilesContent = esmFiles
    .filter((file) => file.endsWith('.entry.js'))
    .map((file) => fs.readFileSync(path.join(esmDir, file), 'utf8'));
  const sharedChunkImports = esmFiles
    .filter((file) => file.endsWith('.js') && !file.endsWith('.entry.js') && !runtimeImport.includes(`/${file}"`))
    .filter((file) => entryFilesContent.every((entryFileContent) => entryFileContent.includes(`"./${file}"`)))
    .map((file) => `import './${file}';`);

  if (!sharedChunkImports.length) {
    throw new Error('Failed cleaning up Loader, found no chunk every component uses.\n');
  }

  const content = `${runtimeImport};
${sharedChunkImports.join('\n')}

export const defineCustomElements = ({ transformTagName, ...options } = {}) => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // Stencil 5 replaced the transformTagName option with one transformer for the whole runtime, which it also applies
  // to every tag a component renders. Components render their children with the prefix already, so the transformer is
  // only set while the components of this prefix are registered.
  setTagTransformer(transformTagName);
  try {
    globalScripts();
    return bootstrapLazy(
      // prettier-ignore
      ${lazyData},
      options
    );
  } finally {
    setTagTransformer(undefined);
  }
};
`;

  const targetFilePath = './dist/esm/loader-cleaned.js';
  const targetFile = path.normalize(targetFilePath);
  fs.writeFileSync(targetFile, `/* Auto Generated File */\n${content}`);

  console.log(`Cleaned up ${srcFilePath} => ${targetFilePath}`);
};

cleanupLoader();
