import { componentMeta } from '@porsche-design-system/shared';
import { TagNamesWithPropertyNames } from './types';

export const getPdsTagNamesNamesWithPropertyNames = (): TagNamesWithPropertyNames =>
  Object.entries(componentMeta).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.props ? Object.keys(value.props) : [],
    }),
    {} as TagNamesWithPropertyNames
  );
