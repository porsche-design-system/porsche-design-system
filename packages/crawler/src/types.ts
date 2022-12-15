import { TagName } from 'shared/src';

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
