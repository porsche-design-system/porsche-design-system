import * as filtersDisabled from './filtersDisabled';

it.each(Object.keys(filtersDisabled))('should have correct filter for %s', (filterKey) => {
  expect(filtersDisabled[filterKey]).toMatchSnapshot();
});
