import type { ButtonVariant, LinkVariant, Theme } from '../../types';
import { isThemeDark } from '../theme';

// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
export const getLinkButtonThemeForIcon = (variant: ButtonVariant | LinkVariant, theme: Theme): Theme =>
  variant === 'primary' ? (isThemeDark(theme) ? 'light' : 'dark') : theme;
