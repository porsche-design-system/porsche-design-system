import type { FormState } from '../../types';
export * from './dom-advanced-selectors';
export * from './dom-attributes';
export * from './dom-base-selectors';
export * from './dom-events';
export * from './dom-validation';

// TODO: wrong location? 🤷
export const getRole = (state: FormState): string => {
  return state === 'error' ? 'alert' : state === 'success' ? 'status' : null;
};
