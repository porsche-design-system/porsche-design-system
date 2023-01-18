'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
];
const HEADLINE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const isVariantType = (variant) => {
  return HEADLINE_VARIANTS.includes(variant);
};
const hasSlottedHeadlineTag = (host) => {
  // TODO: needs to be direct and only child
  const el = validateProps.getHTMLElement(host, ':first-child');
  return el === null || el === void 0 ? void 0 : el.matches('h1, h2, h3, h4, h5, h6');
};
const variantToTagMap = {
  'large-title': 'h1',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};
const getHeadlineTagName = (host, variant, tag) => {
  if (hasSlottedHeadlineTag(host)) {
    return 'div';
  }
  else if (tag) {
    return tag;
  }
  else if (!isVariantType(variant)) {
    return 'h1';
  }
  else {
    return variantToTagMap[variant];
  }
};

exports.HEADLINE_TAGS = HEADLINE_TAGS;
exports.getHeadlineTagName = getHeadlineTagName;
exports.isVariantType = isVariantType;
