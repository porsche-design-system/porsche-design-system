import * as fromGrid from './';

it('should provide all exports', () => {
  expect(Object.keys(fromGrid).length).toBe(39);
});

it.each<keyof typeof fromGrid>(Object.keys(fromGrid) as (keyof typeof fromGrid)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromGrid[item]).toMatchSnapshot();
  }
);
