import * as filtersContrast from './filtersContrast';

it.each(Object.keys(filtersContrast))('should have correct filter for %s', (filterKey) => {
  expect(filtersContrast[filterKey]).toMatchSnapshot();
});
