import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { Theme } from '@porsche-design-system/emotion';
import { Outlet } from 'react-router';
import { emotionThemes } from './app/emotion/color.ts';
import { darkTheme, lightTheme } from './app/vanilla-extract/theme.css.ts';
import { RouteSelect } from './components/RouteSelect.tsx';
import { ThemeSelect } from './components/ThemeSelect.tsx';
import { useTheme } from './hooks/useTheme.ts';

export function App() {
  const { theme, setTheme } = useTheme();
  return (
    <EmotionThemeProvider theme={emotionThemes[theme]}>
      <header className="flex gap-fluid-sm p-static-md">
        <RouteSelect />
        <ThemeSelect value={theme} onChange={(e) => setTheme(e.target.value as Theme)} />
      </header>
      <main className={theme === 'dark' || theme === 'auto' ? darkTheme : lightTheme}>
        <Outlet />
      </main>
    </EmotionThemeProvider>
  );
}
