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

export type AggregatedTagNamesForVersionsAndPrefixes = {
  [version: string]: {
    [prefix: string]: AggregatedData[];
  };
};

export type ConsumedTagNamesForVersionsAndPrefixes = {
  [version: string]: {
    [prefix: string]: TagNameData[];
  };
};
