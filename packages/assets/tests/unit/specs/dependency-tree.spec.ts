// @ts-ignore
import madge from 'madge';
import * as path from 'path';
import { main, module } from '../../../dist/package.json';

const packageDir = path.resolve(__dirname, '../../../dist');

it('should have no regression for esm dependency tree', async () => {
  const tree = await madge(`${packageDir}/${module}`);

  // visualize result
  // await tree.image('result.svg');

  expect(tree.obj()).toMatchSnapshot();
}, 30000);

it('should have no regression for cjs dependency tree', async () => {
  const tree = await madge(`${packageDir}/${main}`);

  // visualize result
  // await tree.image('result.svg')

  expect(tree.obj()).toMatchSnapshot();
});
