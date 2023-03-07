import { Theme } from '../../utils/theme';
import { ButtonVariant, LinkButtonIconName } from '../../types';

export type ButtonProps = {
  theme: Theme;
  variant: ButtonVariant;
  AriaAttributes?;
  icon: LinkButtonIconName;
  iconSource: string;
};
