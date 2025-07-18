import * as filtersContrast from './filtersContrast';

it.each(Object.keys(filtersContrast))('should have correct filter for %s', (filterKey) => {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: ok
  expect(filtersContrast[filterKey]).toMatchSnapshot();
});
