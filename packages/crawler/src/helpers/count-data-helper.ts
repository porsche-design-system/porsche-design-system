import {
  Properties,
  PropertiesAggregated,
  PropertyValuesAggregated,
  PropValue,
  TagNameAggregated,
  TagNameData,
  TagNamesAggregated,
} from '../types';
import { TagName, TAG_NAMES, INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

export const getUnusedTagNames = (tagNamesWithPropertiesAggregated: TagNamesAggregated): TagName[] =>
  // "Object.keys" returns string[], therefore we need type casting here
  (Object.values(TAG_NAMES) as TagName[]).filter(
    (tagName) => !tagNamesWithPropertiesAggregated[tagName] && !INTERNAL_TAG_NAMES.includes(tagName)
  );

export const getUnusedProperties = (propertiesAggregated: PropertiesAggregated, tagName: TagName): string[] =>
  Object.keys(getComponentMeta(tagName).props || {}).filter((property) => !propertiesAggregated[property]);

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
  propertiesAggregated: PropertiesAggregated,
  properties: Properties
): PropertiesAggregated =>
  Object.entries(properties).reduce(
    (result, [propName, propValue]) => {
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
    },
    { ...propertiesAggregated } as PropertiesAggregated
  );

export const incrementTagName = (tagNameAggregated: TagNameAggregated, tagNameData: TagNameData): TagNameAggregated => {
  let tagNameAggregatedNew = { ...tagNameAggregated };
  const componentData = Object.values(tagNameData)[0];

  if (tagNameAggregated) {
    tagNameAggregatedNew.amount = tagNameAggregatedNew.amount + 1;
  } else {
    tagNameAggregatedNew = {
      amount: 1,
      hostPdsComponent: null,
      children: null,
      properties: {},
      unusedProperties: [],
    };
  }

  if (componentData.hostPdsComponent) {
    tagNameAggregatedNew.hostPdsComponent =
      (tagNameAggregatedNew.hostPdsComponent ? tagNameAggregatedNew.hostPdsComponent : 0) + 1;
  }

  if (componentData.children) {
    tagNameAggregatedNew.children = (tagNameAggregatedNew.children ? tagNameAggregatedNew.children : 0) + 1;
  }

  tagNameAggregatedNew.properties = incrementProperties(tagNameAggregatedNew.properties, componentData.properties);
  tagNameAggregatedNew.unusedProperties = getUnusedProperties(
    tagNameAggregatedNew.properties,
    Object.keys(tagNameData)[0] as TagName
  );

  return tagNameAggregatedNew;
};
