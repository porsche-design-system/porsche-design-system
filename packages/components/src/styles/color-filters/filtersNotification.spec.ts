import * as filtersNotification from './filtersNotification';

it.each(Object.keys(filtersNotification))('should have correct filter for %s', (filterKey) => {
  expect(filtersNotification[filterKey]).toMatchSnapshot();
});
