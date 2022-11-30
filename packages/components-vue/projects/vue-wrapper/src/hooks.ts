import { inject, provide } from 'vue';
import { load } from '@porsche-design-system/components-js';

export const usePrefix = /*#__PURE__*/ (tagName: string): string => {
  if (process.env.NODE_ENV === 'test') {
    return tagName;
  } else {
    const prefix = inject('prefix');

    if (prefix === undefined) {
      throw new Error('It appears the porscheDesignSystemProvider hook is missing. Make sure to use it.');
    }

    return prefix ? prefix + '-' + tagName : tagName;
  }
};

export const porscheDesignSystemProvider = /*#__PURE__*/ (prefix: string = '') => {
  load({ prefix });
  provide('prefix', prefix);
};
