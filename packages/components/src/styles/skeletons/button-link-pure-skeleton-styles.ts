import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_DIMENSION,
  extendPseudoWithThemeJssStyle,
  getBaseSkeletonJssStyle,
  getSkeletonPropertyNames,
  getThemedPseudoJssStyle,
  PDS_SKELETON_CLASS_PREFIX,
} from './base-skeleton-styles';
import { Styles } from 'jss';
import {
  ButtonPureSkeletonProperties,
  LinkPureSkeletonProperties,
} from '@porsche-design-system/shared-src/scripts/generateComponentMeta';

export const getButtonLinkPureSkeletonStyles = (): Styles<'@global'> => {
  const skeletonPropertyNames = getSkeletonPropertyNames('p-button-pure');

  const getSkeletonClass = (property: ButtonPureSkeletonProperties | LinkPureSkeletonProperties): string =>
    skeletonPropertyNames[property];

  return {
    '@global': {
      'p-button-pure, p-link-pure': {
        '&:not(.hydrated)': {
          ...extendPseudoWithThemeJssStyle({
            styleFunction: () => getBaseSkeletonJssStyle(false, ELEMENT_SKELETON_DIMENSION / 2),
          }),
          display: 'inline-block',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          ...getThemedPseudoJssStyle(),

          [`&[${getSkeletonClass('hideLabel')}=true], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('hideLabel')}`]:
            {
              minWidth: pxToRemWithUnit(ELEMENT_SKELETON_DIMENSION),
            },
          [`&[${getSkeletonClass('stretch')}=true], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('stretch')}`]: {
            display: 'block',
          },
          [`&[${getSkeletonClass('size')}=medium], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('size')}-medium`]: {
            minHeight: pxToRemWithUnit(36),
          },
          [`&[${getSkeletonClass('size')}=x-small], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('size')}-x-small`]:
            {
              minHeight: pxToRemWithUnit(20),
            },
          [`&[${getSkeletonClass('size')}=large], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('size')}-large`]: {
            minHeight: pxToRemWithUnit(48),
          },
          [`&[${getSkeletonClass('size')}=x-large], &.${PDS_SKELETON_CLASS_PREFIX}${getSkeletonClass('size')}-x-large`]:
            {
              minHeight: pxToRemWithUnit(64),
            },
        },
      },
    },
  };
};
