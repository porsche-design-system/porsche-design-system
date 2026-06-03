import * as fs from 'node:fs';
import * as path from 'node:path';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const stylesDir = 'dist/styles';
const metaDir = 'dist/meta';

const commonPlugins = [
  resolve({
    // Resolve tokens package to inline the values
    resolveOnly: [/^@porsche-design-system\/tokens$/],
  }),
];

function collectFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? collectFiles(fullPath) : [fullPath];
  });
}

function extractRelativeSpecifiers(content) {
  const specifiers = new Set();
  const regexp = /from\s+['"](\.[^'"]+)['"]|import\(\s*['"](\.[^'"]+)['"]\s*\)/g;

  for (const match of content.matchAll(regexp)) {
    const specifier = match[1] || match[2];
    if (specifier) specifiers.add(specifier);
  }

  return [...specifiers];
}

function resolveDeclarationSpecifier(filePath, specifier) {
  const resolvedBase = path.resolve(path.dirname(filePath), specifier);
  const candidates = [`${resolvedBase}.d.ts`, path.join(resolvedBase, 'index.d.ts')];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }

  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

function pruneMetaDeclarationTree(outputDir) {
  const rootMetaFile = path.join(outputDir, 'meta.d.ts');
  const rootKeepFiles = [
    path.join(outputDir, 'meta.mjs'),
    ...collectFiles(outputDir).filter(
      (filePath) => path.basename(filePath) === 'meta.d.ts' || filePath.endsWith('.meta.d.ts')
    ),
  ].filter((filePath) => fs.existsSync(filePath));

  const keepFiles = new Set(rootKeepFiles);
  const pending = rootKeepFiles.filter((filePath) => filePath.endsWith('.d.ts'));

  while (pending.length) {
    const filePath = pending.pop();
    const content = fs.readFileSync(filePath, 'utf-8');

    for (const specifier of extractRelativeSpecifiers(content)) {
      const resolvedFilePath = resolveDeclarationSpecifier(filePath, specifier);
      if (!resolvedFilePath || keepFiles.has(resolvedFilePath)) continue;

      keepFiles.add(resolvedFilePath);
      pending.push(resolvedFilePath);
    }
  }

  for (const filePath of collectFiles(outputDir)) {
    if (!keepFiles.has(filePath)) fs.rmSync(filePath, { force: true });
  }

  removeEmptyDirs(outputDir);

  if (!fs.existsSync(rootMetaFile)) {
    throw new Error(`Expected meta declaration file to exist at ${rootMetaFile}`);
  }
}

function pruneMetaDeclarationsPlugin(outputDir) {
  return {
    name: 'prune-meta-declarations',
    writeBundle: () => {
      pruneMetaDeclarationTree(outputDir);
    },
  };
}

const stylesBuilds = [
  // Styles - CJS
  {
    input: 'src/index.ts',
    output: {
      dir: `${stylesDir}/cjs`,
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [...commonPlugins, typescript()],
  },
  // Styles - ESM
  {
    input: 'src/index.ts',
    output: {
      dir: `${stylesDir}/esm`,
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        declaration: true,
        declarationDir: `${stylesDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src',
      }),
      generatePackageJson({
        outputFolder: stylesDir,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          sideEffects: false,
          exports: {
            '.': {
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
          },
        },
      }),
    ],
  },
];

const metaBuilds = [
  // Meta - CJS (single bundled file — all meta values inlined, no generated/ tree in output)
  {
    input: 'src/meta.ts',
    output: {
      file: `${metaDir}/cjs/meta.cjs`,
      format: 'cjs',
    },
    plugins: [...commonPlugins, typescript()],
  },
  // Meta - ESM
  {
    input: 'src/meta.ts',
    output: {
      file: `${metaDir}/esm/meta.mjs`,
      format: 'esm',
    },
    plugins: [
      ...commonPlugins,
      typescript({
        declaration: true,
        declarationDir: `${metaDir}/esm`,
        exclude: '**.spec.ts',
        rootDir: 'src',
      }),
      pruneMetaDeclarationsPlugin(path.resolve(metaDir, 'esm')),
    ],
  },
];

export default [...stylesBuilds, ...metaBuilds];
