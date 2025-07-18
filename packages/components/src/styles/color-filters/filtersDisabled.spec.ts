import * as filtersDisabled from './filtersDisabled';

it.each(Object.keys(filtersDisabled))('should have correct filter for %s', (filterKey) => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: ok
  expect(filtersDisabled[filterKey]).toMatchSnapshot();
});
