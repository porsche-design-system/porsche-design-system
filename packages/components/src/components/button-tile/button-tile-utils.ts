import type { Theme } from '../../utils/theme';
import type { ButtonVariant, LinkButtonIconName } from '../../types';

export type ButtonTileProps = {
  theme: Theme;
  variant: ButtonVariant;
  icon: LinkButtonIconName;
  iconSource: string;
};
