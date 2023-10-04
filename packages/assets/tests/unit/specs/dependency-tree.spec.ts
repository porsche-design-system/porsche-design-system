// @ts-ignore
import madge from 'madge';
import * as path from 'path';
import { main, module } from '../../../dist/package.json';

it('should have no regression for dependency tree', async () => {
  const packageDir = path.resolve(__dirname, '../../../dist');
  const treeCjs = await madge(`${packageDir}/${main}`);
  const treeEsm = await madge(`${packageDir}/${module}`);

  // visualize result
  // await tree.image('result.svg')

  expect(treeCjs.obj()).toMatchSnapshot();
  expect(treeEsm.obj()).toMatchSnapshot();
});
