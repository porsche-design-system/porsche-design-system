import * as fromGrid from './';

it('should provide all grid exports', () => {
  expect(Object.keys(fromGrid).length).toBe(10);
});

it.each<keyof typeof fromGrid>(Object.keys(fromGrid) as (keyof typeof fromGrid)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromGrid[item]).toMatchSnapshot();
  }
);
