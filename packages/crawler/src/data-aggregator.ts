import { TagName } from 'shared/src';
import { componentMeta } from '@porsche-design-system/shared';
import {
  AggregatedData,
  AggregatedTagNamesForVersionsAndPrefixes,
  ConsumedTagNamesForVersionsAndPrefixes,
  TagNameData,
  TagNamesAggregated,
} from './types';
import { incrementTagName } from './helper';

export const getConsumedPrefixesForVersions = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): { [pdsVersion: string]: string[] } => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.keys(prefixesWithData),
    }),
    {}
  );
};

export const getUnusedTagNames = (tagNamesWithPropertiesAggregated: TagNamesAggregated): TagName[] => {
  // "Object.keys" returns string[], therefore we need type casting here
  return (Object.keys(componentMeta) as TagName[]).filter((tagName) => !tagNamesWithPropertiesAggregated[tagName]);
};

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameData[]): TagNamesAggregated =>
  tagNamesWithProperties.reduce((result, tagNameData) => {
    const tagName = Object.keys(tagNameData)[0] as TagName;
    result[tagName] = incrementTagName(result[tagName], tagNameData);
    return result;
  }, {} as TagNamesAggregated);

export const getAggregatedConsumedTagNamesForVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): AggregatedTagNamesForVersionsAndPrefixes => {
  return Object.entries(consumedTagNamesForVersions).reduce(
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
};

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
): TagNameData[] => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) =>
      result.concat(
        Object.entries(prefixesWithData).reduce(
          (result, [prefix, tagNamesWithProperties]) => result.concat(tagNamesWithProperties),
          [] as TagNameData[]
        )
      ),
    [] as TagNameData[]
  );
};
