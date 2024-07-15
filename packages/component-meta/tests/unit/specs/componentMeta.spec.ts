import { componentMeta } from '../../../src';

it('should match snapshot', () => {
  expect(componentMeta).toMatchSnapshot();
});

it('should not contain comments', () => {
  expect(JSON.stringify(componentMeta)).not.toMatch(/[^:]\/\//); // Allow urls e.g. https://www...
  expect(JSON.stringify(componentMeta)).not.toMatch(/\/\*/);
});

it('should not contain prettier-ignore annotations', () => {
  expect(JSON.stringify(componentMeta)).not.toMatch(/prettier-ignore/);
});

it('should not contain eslint annotations', () => {
  expect(JSON.stringify(componentMeta)).not.toMatch(/eslint/);
});
