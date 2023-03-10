import type { Theme } from '../../utils/theme';
import type { ButtonType, ButtonVariant, LinkButtonIconName } from '../../types';

export type ButtonProps = {
  theme: Theme;
  variant: ButtonVariant;
  icon: LinkButtonIconName;
  iconSource: string;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
};
