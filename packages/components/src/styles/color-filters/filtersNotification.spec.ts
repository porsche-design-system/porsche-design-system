import * as filtersNotification from './filtersNotification';

it.each(Object.keys(filtersNotification))('should have correct filter for %s', (filterKey) => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: ok
  expect(filtersNotification[filterKey]).toMatchSnapshot();
});
