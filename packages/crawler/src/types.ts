import { TagName } from 'shared/src';

export type PropValue = boolean | number | string;

export type Properties = {
  [propName: string]: PropValue;
};

export type TagNameData = Record<
  TagName,
  {
    properties: Properties;
    slot?: string;
    hostPdsComponent?: TagName;
  }
>;

export type PropertyValuesAggregated = Record<number | string, number>;
export type PropertiesAggregated = {
  [propName: string]: {
    amount: number;
    values: PropertyValuesAggregated;
  };
};
export type TagNameAggregated = {
  amount: number;
  hostPdsComponent: number;
  slot: number;
  properties: PropertiesAggregated;
  unusedProperties: string[];
};
export type TagNamesAggregated = Record<TagName, TagNameAggregated>;

export type AggregatedData = {
  tagNames: TagNamesAggregated;
  unusedTagNames: TagName[];
};

type VersionsAndPrefixesMap<T> = {
  [version: string]: {
    [prefix: string]: T;
  };
};

export type AggregatedTagNamesForVersionsAndPrefixes = VersionsAndPrefixesMap<AggregatedData[]>;

export type ConsumedTagNamesForVersionsAndPrefixes = VersionsAndPrefixesMap<TagNameData[]>;
