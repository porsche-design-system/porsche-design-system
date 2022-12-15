import { TagName } from 'shared/src';
import { componentMeta } from '@porsche-design-system/shared';
import { AggregatedData, ConsumedTagNamesForVersionsAndPrefixes, TagNameData, TagNamesAggregated } from './types';
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

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameData[]): any =>
  tagNamesWithProperties.reduce((result, tagNameData) => {
    const tagName = Object.keys(tagNameData)[0];
    result[tagName] = incrementTagName(result[tagName], tagNameData);
    return result;
  }, {} as { [key: string]: any });
export const getAggregatedData = (tagNamesWithProperties: TagNameData[]): AggregatedData => {
  // TODO: get rid of this "as"
  const tagNamesWithPropertiesAggregated = getAggregatedTagNamesWithProperties(
    tagNamesWithProperties
  ) as TagNamesAggregated;
  const unusedTagNames = getUnusedTagNames(tagNamesWithPropertiesAggregated);
  return {
    tagNames: tagNamesWithPropertiesAggregated,
    unusedTagNames,
  };
};

// TODO: define return styles after we clarified output format with the team
export const getAggregatedConsumedTagNamesForVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): any => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) => ({
      ...result,
      [pdsVersion]: Object.entries(prefixesWithData).reduce(
        (result, [prefix, tagNamesWithProperties]) => ({
          ...result,
          [prefix]: getAggregatedData(tagNamesWithProperties),
        }),
        {}
      ),
    }),
    {}
  );
};

// TODO: define return styles after we clarified output format with the team
export const getAggregatedConsumedTagNames = (rawDataWithoutVersionsAndPrefixes: TagNameData[]): any => {
  return getAggregatedData(rawDataWithoutVersionsAndPrefixes);
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
