import madge from 'madge';

it('should have no regression for dependency tree', async () => {
  const entrypoint = require.resolve('@porsche-design-system/utilities-v2');
  const tree = await madge(entrypoint);

  // visualize result
  // await tree.image('result.svg')

  expect(tree.obj()).toMatchSnapshot();
});
