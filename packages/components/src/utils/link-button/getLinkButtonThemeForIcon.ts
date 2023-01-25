import type { ButtonVariant, LinkVariant, Theme } from '../../types';

export const getLinkButtonThemeForIcon = (variant: ButtonVariant | LinkVariant, theme: Theme): Theme =>
  variant === 'primary' ? (theme === 'light' ? 'dark' : 'light') : theme;
