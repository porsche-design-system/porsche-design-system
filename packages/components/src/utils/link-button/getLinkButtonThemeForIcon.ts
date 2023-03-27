import type { ButtonVariant, LinkVariant, Theme } from '../../types';
import { isThemeDark } from '../theme';

export const getLinkButtonThemeForIcon = (variant: ButtonVariant | LinkVariant, theme: Theme): Theme =>
  variant === 'primary' ? (isThemeDark(theme) ? 'light' : 'dark') : theme;
