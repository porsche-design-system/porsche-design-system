import type {
  AggregatedData,
  AggregatedTagNamesForVersionsAndPrefixes,
  ConsumedTagNamesForVersionsAndPrefixes,
  TagNameData,
  TagNamesAggregated,
  TagNamesWithPropertyNames,
} from '../types';
import { getUnusedTagNames, incrementTagName } from './count-data-helper';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const getPdsTagNamesWithPropertyNames = (): TagNamesWithPropertyNames => {
  let result = {} as TagNamesWithPropertyNames;

  for (const tagName of Object.values(TAG_NAMES)) {
    const { propsMeta } = getComponentMeta(tagName);

    if (!INTERNAL_TAG_NAMES.includes(tagName)) {
      result = {
        ...result,
        [tagName]: propsMeta ? Object.keys(propsMeta) : [],
      };
    }
  }

  return result;
};

export const getConsumedPrefixesForVersions = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): { [pdsVersion: string]: string[] } =>
  Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.keys(prefixesWithData),
    }),
    {}
  );

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameData[]): TagNamesAggregated =>
  tagNamesWithProperties.reduce((result, tagNameData) => {
    const tagName = Object.keys(tagNameData)[0] as TagName;
    result[tagName] = incrementTagName(result[tagName], tagNameData);
    return result;
  }, {} as TagNamesAggregated);

export const getAggregatedConsumedTagNamesForVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): AggregatedTagNamesForVersionsAndPrefixes =>
  Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.entries(prefixesWithData).reduce(
        (result, [prefix, tagNamesWithProperties]) => ({
          ...result,
          [prefix]: getAggregatedConsumedTagNames(tagNamesWithProperties),
        }),
        {}
      ),
    }),
    {}
  );

export const getAggregatedConsumedTagNames = (rawDataWithoutVersionsAndPrefixes: TagNameData[]): AggregatedData => {
  const tagNamesWithPropertiesAggregated = getAggregatedTagNamesWithProperties(rawDataWithoutVersionsAndPrefixes);
  const unusedTagNames = getUnusedTagNames(tagNamesWithPropertiesAggregated);
  return {
    tagNames: tagNamesWithPropertiesAggregated,
    unusedTagNames,
  };
};

export const getRawDataWithoutVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): TagNameData[] =>
  Object.entries(consumedTagNamesForVersions).reduce(
    (result, [_pdsVersion, prefixesWithData]) =>
      result.concat(
        Object.entries(prefixesWithData).reduce(
          (result, [_prefix, tagNamesWithProperties]) => result.concat(tagNamesWithProperties),
          [] as TagNameData[]
        )
      ),
    [] as TagNameData[]
  );
