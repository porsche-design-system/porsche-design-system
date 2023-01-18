'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const getOnlyChildOfKindHTMLElementOrThrow = require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');

const throwIfInvalidLinkUsage = (host, hrefValue) => {
  let isInvalid = hrefValue && host.children.length > 0;
  if (!isInvalid || !hrefValue) {
    try {
      if (!hrefValue) {
        getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(host, 'a');
      }
    }
    catch (_a) {
      isInvalid = true;
    }
  }
  if (isInvalid) {
    throw new Error(`Usage of ${validateProps.getTagName(host)} is not valid. Please provide a href property or a single and direct 'a' child element.`);
  }
};

exports.throwIfInvalidLinkUsage = throwIfInvalidLinkUsage;
