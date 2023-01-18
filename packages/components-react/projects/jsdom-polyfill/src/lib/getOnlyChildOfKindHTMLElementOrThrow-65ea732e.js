'use strict';

const getHTMLElements = require('./getHTMLElements-d3d6e3ec.js');
const transformSelectorToDirectChildSelector = require('./transformSelectorToDirectChildSelector-f570e779.js');
const validateProps = require('./validateProps-3b506a0d.js');

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getDirectChildHTMLElements(element, selector) {
  // querySelector(All) doesn't work with :scope pseudo class and comma separator in jsdom, yet
  // https://github.com/jsdom/jsdom/issues/3141
  // therefore we got a workaround so it works nicely when consumed from jsdom-polyfill package
  return transformSelectorToDirectChildSelector.transformSelectorToDirectChildSelector(selector)
    .split(',')
    .map((sel) => getHTMLElements.getHTMLElements(element, sel))
    .flat(); // might contain duplicates
}

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getOnlyChildOfKindHTMLElementOrThrow(element, selector) {
  // we need to support named slots for label/description or message, hence we can't verify element.children.length
  const directChildren = getDirectChildHTMLElements(element, selector);
  if (directChildren.length !== 1) {
    throw new Error(`${validateProps.getTagName(element)} has to contain a single direct child of: ${selector}`);
  }
  return directChildren[0];
}

exports.getOnlyChildOfKindHTMLElementOrThrow = getOnlyChildOfKindHTMLElementOrThrow;
