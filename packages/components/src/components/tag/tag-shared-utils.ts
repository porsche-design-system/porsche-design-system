import { colors } from '../../styles';
import type { TagColor } from './tag-utils';

const {
  canvasColor,
  surfaceColor,
  frostedColor,
  frostedSoftColor,
  primaryColor,
  infoFrostedColor,
  infoFrostedSoftColor,
  successFrostedColor,
  successFrostedSoftColor,
  errorFrostedColor,
  errorFrostedSoftColor,
  warningFrostedColor,
  warningFrostedSoftColor,
} = colors;

export const getThemedTextColor = (tagColor: TagColor): string => {
  const colorMap: Record<TagColor, string> = {
    'background-base': primaryColor,
    'background-surface': primaryColor,
    'background-frosted': primaryColor,
    primary: canvasColor,
    'notification-info-soft': primaryColor,
    'notification-warning-soft': primaryColor,
    'notification-success-soft': primaryColor,
    'notification-error-soft': primaryColor,
  };

  return colorMap[tagColor];
};

export const getThemedBackgroundColor = (tagColor: TagColor): string => {
  const colorMap: Record<TagColor, string> = {
    'background-base': canvasColor,
    'background-surface': surfaceColor,
    'background-frosted': frostedColor,
    primary: primaryColor,
    'notification-info-soft': infoFrostedColor,
    'notification-warning-soft': warningFrostedColor,
    'notification-success-soft': successFrostedColor,
    'notification-error-soft': errorFrostedColor,
  };

  return colorMap[tagColor];
};

export const getThemedBackgroundHoverColor2 = (tagColor: TagColor): string => {
  const colorMap: Record<TagColor, string> = {
    'background-base': primaryColor,
    'background-surface': primaryColor,
    'background-frosted': frostedSoftColor,
    primary: canvasColor,
    'notification-info-soft': infoFrostedSoftColor,
    'notification-warning-soft': warningFrostedSoftColor,
    'notification-success-soft': successFrostedSoftColor,
    'notification-error-soft': errorFrostedSoftColor,
  };

  return colorMap[tagColor];
};
