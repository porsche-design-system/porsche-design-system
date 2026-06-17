import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const outputDir = 'meta';

const commonPlugins = [
  resolve({
    resolveOnly: [/^@porsche-design-system\/tokens$/],
  }),
];

const ts = (format, declarationDir, { include } = {}) =>
  format === 'esm'
    ? typescript({ declaration: true, declarationDir, rootDir: 'src', ...(include ? { include } : {}) })
    : typescript();

const entryFileNames = (entryName, ext) => (chunk) => (chunk.name === entryName ? `index.${ext}` : `[name].${ext}`);

const isStyleModule = (id) =>
  id.includes('/src/') && !id.endsWith('.meta.ts') && !id.endsWith('/meta.types.ts') && !id.endsWith('/index.meta.ts');

// paths is resolved relative to the meta output dir (meta/{format}/)
// meta files sit 2 levels below that dir, rollup adds those 2 levels automatically
// so ../../dist/{format}/styles/{category}/index.{ext} resolves correctly from the output file
const metaStylePath = (id, ext, format) => {
  const match = id.replace(/\/index\.tsx?$/, '').match(/\/src\/([^/]+)$/);
  return match ? `../../dist/${format}/${match[1]}/index.${ext}` : id;
};

const metaBuild = (format, ext) => ({
  input: 'src/index.meta.ts',
  external: isStyleModule,
  output: {
    dir: `${outputDir}/${format}`,
    format,
    entryFileNames: entryFileNames('index.meta', ext),
    preserveModules: true,
    preserveModulesRoot: 'src',
    paths: (id) => metaStylePath(id, ext, format),
  },
  plugins: [
    ...commonPlugins,
    ts(format, `${outputDir}/esm`, {
      include: ['**/*.meta.ts', '**/src/index.meta.ts', '**/src/meta.types.ts'],
    }),
  ],
});

export default [metaBuild('cjs', 'cjs'), metaBuild('esm', 'mjs')];
