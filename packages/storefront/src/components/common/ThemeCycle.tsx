'use client';

import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import { useTheme } from '@/hooks/useTheme';
import { PButton } from '@porsche-design-system/components-react/ssr';

export const ThemeCycle = () => {
  const { theme, cycleStorefrontTheme } = useTheme();
  const isDark = usePreferredColorScheme();

  const getIcon = () => {
    if ((theme === 'auto' && isDark) || theme === 'dark') {
      return 'sun';
    }
    return 'moon';
  };

  return (
    <PButton
      compact={true}
      variant="ghost"
      icon={getIcon()}
      hideLabel={true}
      aria-live="polite"
      type="button"
      onClick={() => cycleStorefrontTheme()}
    />
  );
};
