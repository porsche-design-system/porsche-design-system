import type { AriaAttributes } from '../../../types';
import { isDisabledOrLoading } from '../../dom';

export const getButtonBaseAriaAttributes = (
  isDisabled: boolean,
  isLoading: boolean
): Pick<AriaAttributes, 'aria-disabled' | 'aria-busy'> => {
  return {
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
  };
};
