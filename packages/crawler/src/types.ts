import { type TagName } from '@porsche-design-system/shared';
import { type ViewportSize } from 'playwright';

/* Generics */

type VersionsAndPrefixesMap<T> = {
  [version: string]: {
    [prefix: string]: T;
  };
};

/* Crawler Config Type */

export type CrawlerConfig = {
  reportFolderName: string;
  dateSplitter: string;
  jsonSpace: number;
  viewport: ViewportSize;
};

/* PDS Components info */

export type TagNamesWithPropertyNames = Record<TagName, string[]>;

/* Raw Data */

export type PropValue = boolean | number | string | object;

export type Properties = {
  [propName: string]: PropValue;
};

export type TagNameData = Record<
  TagName,
  {
    properties: Properties;
    children: string | null;
    hostPdsComponent: TagName | null;
  }
>;

export type ConsumedTagNamesForVersionsAndPrefixes = VersionsAndPrefixesMap<TagNameData[]>;

/* Aggregated Data */

export type PropertyValuesAggregated = Record<number | string, number>;

export type PropertiesAggregated = {
  [propName: string]: {
    amount: number;
    values: PropertyValuesAggregated;
  };
};

export type TagNameAggregated = {
  amount: number;
  hostPdsComponent: number | null;
  children: number | null;
  properties: PropertiesAggregated;
  unusedProperties: string[];
};

export type TagNamesAggregated = Record<TagName, TagNameAggregated>;

export type AggregatedData = {
  tagNames: TagNamesAggregated;
  unusedTagNames: TagName[];
};

export type AggregatedTagNamesForVersionsAndPrefixes = VersionsAndPrefixesMap<AggregatedData[]>;
