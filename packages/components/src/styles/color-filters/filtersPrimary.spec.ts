import * as filtersPrimary from './filtersPrimary';

it.each(Object.keys(filtersPrimary))('should have correct filter for %s', (filterKey) => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: ok
  expect(filtersPrimary[filterKey]).toMatchSnapshot();
});
