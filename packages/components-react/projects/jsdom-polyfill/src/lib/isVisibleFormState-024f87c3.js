'use strict';

const isParentOfKind = require('./isParentOfKind-9c1048fd.js');
require('./validateProps-3b506a0d.js');

const isRequired = (el) => !!(el === null || el === void 0 ? void 0 : el.required);

const isParentFieldsetWrapperRequired = (element) => {
  return (isParentOfKind.isParentOfKind(element, 'p-fieldset-wrapper') && isRequired(element.parentElement));
};

const isRequiredAndParentNotRequired = (element, child) => {
  return isRequired(child) && !isParentFieldsetWrapperRequired(element);
};

const isVisibleFormState = (state) => state === 'success' || state === 'error';

exports.isRequiredAndParentNotRequired = isRequiredAndParentNotRequired;
exports.isVisibleFormState = isVisibleFormState;
