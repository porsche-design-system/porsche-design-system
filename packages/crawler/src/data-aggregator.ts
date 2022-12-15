import { TagName } from 'shared/src';
import { componentMeta } from '@porsche-design-system/shared';

export type PropValue = boolean | number | string;
export type Properties = {
  [propName: string]: PropValue;
};
export type TagNameWithProperties = Record<
  TagName,
  {
    properties: Properties;
    slot?: string;
    hostPdsComponent?: TagName;
  }
>;

export type PropertiesAggregated = {
  [propName: string]: {
    amount: number;
    values: Record<number | string, number>;
  };
};

export type TagNameWithPropertiesAggregated = Record<
  TagName,
  {
    amount: number;
    hostPdsComponent: number;
    slot: number;
    properties: PropertiesAggregated;
    unusedProperties: string[];
  }
>;

export type AggregatedData = {
  tagNames: TagNameWithPropertiesAggregated;
  unusedTagNames: TagName[];
};

export type ConsumedTagNamesForVersionsAndPrefixes = {
  [version: string]: {
    [prefix: string]: TagNameWithProperties[];
  };
};

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
  const allPdsTagNames = Object.keys(componentMeta) as TagName[];
  return allPdsTagNames.filter((tagName) => !tagNamesWithPropertiesAggregated[tagName]);
};

export const getAggregatedTagNamesWithProperties = (tagNamesWithProperties: TagNameWithProperties[]): any => {
  return tagNamesWithProperties.reduce((result, tagNameWithProperties) => {
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
};
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
