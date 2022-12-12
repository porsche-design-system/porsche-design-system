import { TagName } from 'shared/src';

export type PropertiesData = {
  [propName: string]: boolean | number | string;
};
export type TagNameWithPropertiesData = Record<TagName, PropertiesData>;

export type ConsumedTagNamesForVersions = {
  [version: string]: {
    [prefix: string]: TagNameWithPropertiesData[];
  };
};

export class DataAggregator {
  consumedTagNamesForVersions: ConsumedTagNamesForVersions;

  constructor(consumedTagNamesForVersions: ConsumedTagNamesForVersions) {
    this.consumedTagNamesForVersions = consumedTagNamesForVersions;
  }

  getConsumedPdsVersions = (): string[] => {
    return Object.keys(this.consumedTagNamesForVersions);
  };

  getConsumedPrefixesForVersions = (): { [pdsVersion: string]: string[] } => {
    return Object.entries(this.consumedTagNamesForVersions).reduce(
      (result, [pdsVersion, prefixesWithData]) => ({
        ...result,
        [pdsVersion]: Object.keys(prefixesWithData),
      }),
      {}
    );
  };

  // TODO: define return styles after we clarified output format with the team
  aggregateTagNamesWithProperties = (tagNamesWithProperties: TagNameWithPropertiesData[]): any => {
    return tagNamesWithProperties.reduce((result, tagNameWithPropertiesData) => {
      const tagName = Object.keys(tagNameWithPropertiesData)[0];
      const amount = result[tagName]?.amount;
      const propertiesData = Object.entries(tagNameWithPropertiesData)[0][1];

      if (result[tagName]) {
        result[tagName].amount = amount + 1;
        // count properties
      } else {
        result[tagName] = {
          amount: 1,
          properties: {},
        };
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

  // TODO: define return styles after we clarified output format with the team
  getAggregatedConsumedTagNamesForVersionsAndPrefixes = (): any => {
    return Object.entries(this.consumedTagNamesForVersions).reduce(
      (result, [pdsVersion, prefixesWithData]) => ({
        ...result,
        [pdsVersion]: Object.entries(prefixesWithData).reduce(
          (result, [prefix, tagNamesWithProperties]) => ({
            ...result,
            [prefix]: this.aggregateTagNamesWithProperties(tagNamesWithProperties),
          }),
          {}
        ),
      }),
      {}
    );
  };

  // TODO: define return styles after we clarified output format with the team
  getAggregatedConsumedTagNames = (): any => {
    const tagNamesWithProperties = Object.entries(this.consumedTagNamesForVersions).reduce(
      (result, [pdsVersion, prefixesWithData]) =>
        result.concat(
          Object.entries(prefixesWithData).reduce(
            (result, [prefix, tagNamesWithProperties]) => result.concat(tagNamesWithProperties),
            [] as TagNameWithPropertiesData[]
          )
        ),
      [] as TagNameWithPropertiesData[]
    );
    return this.aggregateTagNamesWithProperties(tagNamesWithProperties);
  };
}
