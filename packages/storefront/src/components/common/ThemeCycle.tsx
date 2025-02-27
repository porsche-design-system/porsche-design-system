'use client';

import { usePreferredColorScheme } from '@/hooks/usePreferredColorScheme';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import { PButton } from '@porsche-design-system/components-react/ssr';

type ThemeCycleProps = {
  slot?: string;
};

export const ThemeCycle = ({ slot }: ThemeCycleProps) => {
  const { storefrontTheme, cycleStorefrontTheme } = useStorefrontTheme();
  const isDark = usePreferredColorScheme();

  const getIcon = () => {
    if ((storefrontTheme === 'auto' && isDark) || storefrontTheme === 'dark') {
      return 'sun';
    }
    return 'moon';
  };

  return (
    <PButton
      slot={slot}
      compact={true}
      variant="ghost"
      icon={getIcon()}
      hideLabel={true}
      aria-live="polite"
      type="button"
      onClick={() => cycleStorefrontTheme()}
    >
      Switch theme
    </PButton>
  );
};
