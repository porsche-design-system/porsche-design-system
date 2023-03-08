import { Theme } from '../../utils/theme';
import { ButtonVariant, LinkButtonIconName } from '../../types';

export type ButtonTileProps = {
  theme: Theme;
  variant: ButtonVariant;
  icon: LinkButtonIconName;
  iconSource: string;
};
