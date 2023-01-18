'use strict';

require('./validateProps-3b506a0d.js');

const isDisabledOrLoading = (disabled, loading) => {
  return disabled || loading;
};

const getButtonBaseAriaAttributes = (isDisabled, isLoading) => {
  return {
    'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    'aria-busy': isLoading ? 'true' : null,
  };
};

exports.getButtonBaseAriaAttributes = getButtonBaseAriaAttributes;
exports.isDisabledOrLoading = isDisabledOrLoading;
