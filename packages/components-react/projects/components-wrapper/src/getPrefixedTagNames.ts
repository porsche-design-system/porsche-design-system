import * as fromComponents from './lib/components';
import { camelCase } from 'change-case';
import { TagNameCamelCase } from '@porsche-design-system/shared';

export const getPrefixedTagNames = (): Record<TagNameCamelCase, any> => {
  return Object.entries(fromComponents).reduce(
    (res, [key, val]) => ({
      ...res,
      [camelCase(key)]: val,
    }),
    {} as Record<TagNameCamelCase, any>
  );
};
