import { TagName } from 'shared/src';
import { componentMeta } from '@porsche-design-system/shared';
import {
  AggregatedData,
  ConsumedTagNamesForVersionsAndPrefixes,
  TagNameWithProperties,
  TagNameWithPropertiesAggregated,
} from './types';

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

export const getUnusedTagNames = (tagNamesWithPropertiesAggregated: TagNameWithPropertiesAggregated): TagName[] => {
  // "Object.keys" returns string[], therefore we need type casting here
  return (Object.keys(componentMeta) as TagName[]).filter((tagName) => !tagNamesWithPropertiesAggregated[tagName]);
};

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameWithProperties[]): any =>
  tagNamesWithProperties.reduce((result, tagNameWithProperties) => {
    const tagName = Object.keys(tagNameWithProperties)[0];
    const amount = result[tagName]?.amount;
    const componentData = Object.entries(tagNameWithProperties)[0][1];
    const propertiesData = componentData.properties;

    if (result[tagName]) {
      result[tagName].amount = amount + 1;
      // count properties
    } else {
      result[tagName] = {
        amount: 1,
        hostPdsComponent: 0,
        slot: 0,
        properties: {},
      };
    }

    if (componentData.hostPdsComponent) {
      result[tagName].hostPdsComponent = result[tagName].hostPdsComponent + 1;
    }

    if (componentData.slot) {
      result[tagName].slot = result[tagName].slot + 1;
    }

    Object.entries(propertiesData).reduce((propResult, [propName, propValue]) => {
      if (!result[tagName].properties[propName]) {
        result[tagName].properties[propName] = {
          amount: 1,
          values: {},
        };
      } else {
        result[tagName].properties[propName].amount++;
      }

      const resultProp = result[tagName].properties[propName];
      const resultPropValueName = resultProp.values[propValue as string];
      if (!resultPropValueName) {
        resultProp.values[propValue as string] = 1;
      } else {
        resultProp.values[propValue as string] = resultPropValueName + 1;
      }
    }, {} as any);

    return result;
  }, {} as { [key: string]: any });
export const getAggregatedData = (tagNamesWithProperties: TagNameWithProperties[]): AggregatedData => {
  // TODO: get rid of this "as"
  const tagNamesWithPropertiesAggregated = getAggregatedTagNamesWithProperties(
    tagNamesWithProperties
  ) as TagNameWithPropertiesAggregated;
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
export const getAggregatedConsumedTagNames = (rawDataWithoutVersionsAndPrefixes: TagNameWithProperties[]): any => {
  return getAggregatedData(rawDataWithoutVersionsAndPrefixes);
};

export const getRawDataWithoutVersionsAndPrefixes = (
  consumedTagNamesForVersions: ConsumedTagNamesForVersionsAndPrefixes
): TagNameWithProperties[] => {
  return Object.entries(consumedTagNamesForVersions).reduce(
    (result, [pdsVersion, prefixesWithData]) =>
      result.concat(
        Object.entries(prefixesWithData).reduce(
          (result, [prefix, tagNamesWithProperties]) => result.concat(tagNamesWithProperties),
          [] as TagNameWithProperties[]
        )
      ),
    [] as TagNameWithProperties[]
  );
};
