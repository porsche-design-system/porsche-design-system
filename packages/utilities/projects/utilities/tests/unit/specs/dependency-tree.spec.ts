// @ts-ignore
import madge from 'madge';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const entrypointCjs = require.resolve('@porsche-design-system/utilities-v2');

it('should have no regression for cjs dependency tree', async () => {
  const tree = await madge(entrypointCjs);

  // visualize result
  // await tree.image('result.svg')

  expect(tree.obj()).toMatchSnapshot();
});

it('should have no regression for esm dependency tree', async () => {
  const entrypointEsm = entrypointCjs.replace(/dist\/cjs\/.*/, 'dist/esm/index.mjs');
  const tree = await madge(entrypointEsm);

  // visualize result
  // await tree.image('result.svg')

  expect(tree.obj()).toMatchSnapshot();
});
