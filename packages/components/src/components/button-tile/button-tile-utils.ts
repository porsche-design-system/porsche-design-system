import type { Theme } from '../../utils/theme';
import type { ButtonAriaAttribute, ButtonType, ButtonVariant, LinkButtonIconName } from '../../types';

export type ButtonTileAriaAttribute = ButtonAriaAttribute;
export type ButtonTileIcon = LinkButtonIconName;
export type ButtonTileType = ButtonType;

export type ButtonProps = {
  theme: Theme;
  variant: ButtonVariant;
  icon: LinkButtonIconName;
  iconSource: string;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
};
