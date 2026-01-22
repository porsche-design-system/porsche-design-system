import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { Theme } from '@porsche-design-system/emotion';
import { Outlet } from 'react-router';
import { RouteSelect } from './components/RouteSelect.tsx';
import { ThemeSelect } from './components/ThemeSelect.tsx';
import { emotionThemes } from './emotion/color.ts';
import { useTheme } from './hooks/useTheme.ts';
import { darkTheme, lightTheme } from './vanilla-extract/theme.css.ts';

export function Layout() {
  const { theme, setTheme } = useTheme();
  return (
    <EmotionThemeProvider theme={emotionThemes[theme]}>
      <header className="flex gap-fluid-sm p-4">
        <RouteSelect />
        <ThemeSelect value={theme} onChange={(e) => setTheme(e.target.value as Theme)} />
      </header>
      <main className={theme === 'dark' || theme === 'auto' ? darkTheme : lightTheme}>
        <Outlet />
      </main>
    </EmotionThemeProvider>
  );
}
