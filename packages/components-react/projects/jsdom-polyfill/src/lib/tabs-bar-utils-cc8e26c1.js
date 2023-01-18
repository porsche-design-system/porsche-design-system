'use strict';

const setAttribute = require('./setAttribute-577f81e1.js');
const validateProps = require('./validateProps-3b506a0d.js');

const TAB_SIZES = ['small', 'medium'];
const TAB_WEIGHTS = ['regular', 'semibold'];
const ENABLE_TRANSITION_CLASS = 'bar--enable-transition';
const sanitizeActiveTabIndex = (index, tabElementsCount) => {
  if (index === undefined || index === null) {
    return undefined;
  }
  const maxIndex = tabElementsCount - 1; // can be -1 without children
  let sanitizedIndex;
  if (maxIndex < 0 || index < 0 || index > maxIndex) {
    sanitizedIndex = undefined;
  }
  else {
    sanitizedIndex = index;
  }
  return sanitizedIndex;
};
const addEnableTransitionClass = (barElement) => {
  barElement.classList.add(ENABLE_TRANSITION_CLASS);
};
const removeEnableTransitionClass = (barElement) => {
  barElement.classList.remove(ENABLE_TRANSITION_CLASS);
};
const getTransformationToInactive = ({ offsetWidth, offsetLeft } = {}) => {
  const barWidth = offsetWidth > 0 ? offsetWidth : 0;
  const barCenter = barWidth / 2;
  const barPositionLeft = offsetLeft > 0 ? offsetLeft : 0;
  const xTranslation = barPositionLeft + barCenter;
  const xTranslate = validateProps.pxToRemWithUnit(xTranslation || 0);
  return `transform: translate3d(${xTranslate},0,0); width: 0;`;
};
const getTransformationToActive = ({ offsetWidth, offsetLeft } = {}) => {
  const barWidth = validateProps.pxToRemWithUnit(offsetWidth || 0);
  const barPositionLeft = validateProps.pxToRemWithUnit(offsetLeft > 0 ? offsetLeft : 0);
  return `transform: translate3d(${barPositionLeft},0,0); width: ${barWidth};`;
};
const determineEnableTransitionClass = (activeTabIndex, prevActiveTabIndex, barElement) => {
  // initial active + inactive to active
  if (activeTabIndex !== undefined && prevActiveTabIndex === undefined) {
    removeEnableTransitionClass(barElement);
  }
  else {
    // active to active
    addEnableTransitionClass(barElement);
  }
};
const getPrevNextTabIndex = (direction, tabElementsLength, focusedTabIndex) => {
  const newTabIndex = focusedTabIndex + (direction === 'next' ? 1 : -1);
  return (newTabIndex + tabElementsLength) % tabElementsLength;
};
const getFocusedTabIndex = (tabElements) => {
  const indexOfActiveElement = tabElements.indexOf(document === null || document === void 0 ? void 0 : document.activeElement);
  return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
};
const setBarStyle = (tabElements, activeTabIndex, barElement, prevActiveTabIndex) => {
  // statusBarElement is undefined on first render
  if (!barElement) {
    return;
  }
  let transformation;
  if (activeTabIndex === undefined) {
    if (prevActiveTabIndex === undefined) {
      // handle active to removed case
      removeEnableTransitionClass(barElement);
      transformation = getTransformationToInactive();
    }
    else {
      // handle initial inactive + active to inactive cases
      addEnableTransitionClass(barElement);
      transformation = getTransformationToInactive(tabElements[prevActiveTabIndex]);
    }
  }
  else {
    // handle initial active + active to active + inactive to active cases
    determineEnableTransitionClass(activeTabIndex, prevActiveTabIndex, barElement);
    transformation = getTransformationToActive(tabElements[activeTabIndex]);
  }
  setAttribute.setAttribute(barElement, 'style', transformation);
};
// TODO: Better approach for keyboard handling?
// export const getKeydownedSegmentedControlItem = (
//   { key }: KeyboardEvent,
//   value: string | number,
//   childrenCollection: HTMLCollection
// ): HTMLElement & SegmentedControlItem => {
//   const prevOrNext =
//     ((key === 'ArrowLeft' || key === 'Left') && -1) || ((key === 'ArrowRight' || key === 'Right') && 1);
//   if (prevOrNext) {
//     const children = Array.from(childrenCollection) as (HTMLElement & SegmentedControlItem)[];
//     const selectedIndex = children.findIndex((item) => item.value === value);
//
//     const validIndexes = children.map((item, i) => !item.disabled && i).filter((x: number | boolean) => x !== false);
//     const maxValidIndex = validIndexes.length - 1;
//
//     const selectedValidIndex = validIndexes.findIndex((i) => i === selectedIndex);
//     let newValidIndex = selectedValidIndex + prevOrNext;
//     newValidIndex = newValidIndex < 0 ? maxValidIndex : newValidIndex > maxValidIndex ? 0 : newValidIndex;
//
//     return children[validIndexes[newValidIndex]];
//   }
// };

exports.TAB_SIZES = TAB_SIZES;
exports.TAB_WEIGHTS = TAB_WEIGHTS;
exports.getFocusedTabIndex = getFocusedTabIndex;
exports.getPrevNextTabIndex = getPrevNextTabIndex;
exports.sanitizeActiveTabIndex = sanitizeActiveTabIndex;
exports.setBarStyle = setBarStyle;
