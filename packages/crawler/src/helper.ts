import fs from 'fs';
import { crawlerConfig as config } from '../constants';
import { componentMeta, TagName } from '@porsche-design-system/shared';
import { Properties, PropertiesAggregated, PropertyValuesAggregated, PropValue } from './types';

export type TagNamesWithProperties = Record<TagName, string[]>;

export const incrementPropertyValues = (
  propValuesAggregated: PropertyValuesAggregated,
  propValue: PropValue
): PropertyValuesAggregated => {
  const propValueAsKey = propValue as number | string;
  const propValueAmount = propValuesAggregated[propValueAsKey];
  const propValuesAggregatedNew = { ...propValuesAggregated };
  if (!propValueAmount) {
    propValuesAggregatedNew[propValueAsKey] = 1;
  } else {
    propValuesAggregatedNew[propValueAsKey] = propValueAmount + 1;
  }
  return propValuesAggregatedNew;
};

export const incrementProperties = (
  propertiesAgregated: PropertiesAggregated,
  properties: Properties
): PropertiesAggregated => {
  return Object.entries(properties).reduce((result, [propName, propValue]) => {
    if (!result[propName]) {
      result[propName] = {
        amount: 1,
        values: {},
      };
    } else {
      result[propName].amount++;
    }
    result[propName].values = incrementPropertyValues(result[propName].values, propValue);

    return result;
  }, propertiesAgregated as any);
};

export const getTagNamesWithProperties = (): TagNamesWithProperties =>
  Object.entries(componentMeta).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.props ? Object.keys(value.props) : [],
    }),
    {} as TagNamesWithProperties
  );

export const removeOutdatedReports = (): void => {
  fs.readdirSync(config.reportFolderName)
    .filter(
      (fileName: string) => Date.parse(fileName.split(config.dateSplitter)[0]) < Date.now() - config.reportsMaxAge
    )
    .map((fileName: string) => {
      fs.unlinkSync(`${config.reportFolderName}/${fileName}`);
    });
};
