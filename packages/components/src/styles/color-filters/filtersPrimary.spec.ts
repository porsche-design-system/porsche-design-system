import * as filtersPrimary from './filtersPrimary';

it.each(Object.keys(filtersPrimary))('should have correct filter for %s', (filterKey) => {
  expect(filtersPrimary[filterKey]).toMatchSnapshot();
});
