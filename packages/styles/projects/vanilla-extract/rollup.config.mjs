import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export const outputDir = 'dist';

export const categories = [
  'blur',
  'border',
  'color',
  'focus',
  'font',
  'gradient',
  'grid',
  'mediaQuery',
  'motion',
  'shadow',
  'skeleton',
  'spacing',
  'typography',
];

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/tokens$/],
  }),
];

const ts = (format, declarationDir, { include, exclude = '**.spec.ts' } = {}) =>
  format === 'esm'
    ? typescript({ declaration: true, declarationDir, exclude, rootDir: 'src', ...(include ? { include } : {}) })
    : typescript();

const entryFileNames = (entryName, ext) => (chunk) => (chunk.name === entryName ? `index.${ext}` : `[name].${ext}`);

const isStyleModule = (id) =>
  id.includes('/src/') && !id.endsWith('.meta.ts') && !id.endsWith('/meta.types.ts') && !id.endsWith('/index.meta.ts');

const metaStylePath = (id, ext) => {
  const match = id.replace(/\/index\.tsx?$/, '').match(/\/src\/([^/]+)$/);
  return match ? `../styles/${match[1]}/index.${ext}` : id;
};

export const stylesBuild = (format, ext) => ({
  input: ['src/index.styles.ts', ...categories.map((category) => `src/${category}/index.ts`)],
  output: {
    dir: `${outputDir}/${format}/styles`,
    format,
    entryFileNames: entryFileNames('index.styles', ext),
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    ...commonPlugins,
    ts(format, `${outputDir}/esm/styles`, {
      exclude: ['**/*.spec.ts', '**/*.meta.ts', '**/src/index.meta.ts', '**/src/index.ts', '**/src/meta.types.ts'],
    }),
  ],
});

export const metaBuild = (format, ext) => ({
  input: 'src/index.meta.ts',
  external: isStyleModule,
  output: {
    dir: `${outputDir}/${format}/meta`,
    format,
    entryFileNames: entryFileNames('index.meta', ext),
    preserveModules: true,
    preserveModulesRoot: 'src',
    paths: (id) => metaStylePath(id, ext),
  },
  plugins: [
    ...commonPlugins,
    ts(format, `${outputDir}/esm/meta`, {
      include: ['**/*.meta.ts', '**/src/index.meta.ts', '**/src/meta.types.ts'],
    }),
  ],
});

export const rootBuild = (format, ext) => ({
  input: 'src/index.ts',
  external: (id) => /(^|\/)index\.(styles|meta)(\.tsx?)?$/.test(id),
  output: {
    dir: `${outputDir}/${format}`,
    format,
    entryFileNames: `index.${ext}`,
    paths: (id) =>
      /index\.styles/.test(id) ? `./styles/index.${ext}` : /index\.meta/.test(id) ? `./meta/index.${ext}` : id,
  },
  plugins: [
    ...commonPlugins,
    typescript(),
    ...(format === 'esm'
      ? [
          generatePackageJson({
            outputFolder: outputDir,
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
        ]
      : []),
  ],
});
