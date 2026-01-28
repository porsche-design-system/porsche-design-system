import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import type { Theme } from '@porsche-design-system/emotion';
import { Outlet } from 'react-router';
import { emotionThemes } from './app/emotion/emotionTheme.ts';
import { darkTheme, lightTheme } from './app/vanilla-extract/theme.css';
import { RouteSelect } from './components/RouteSelect.tsx';
import { ThemeSelect } from './components/ThemeSelect.tsx';
import { useTheme } from './hooks/useTheme.ts';

export function App() {
  const { theme, setTheme } = useTheme();
  // TODO: Emotion and Vanilla-extract don't seem to have a good concept for 'auto' theme, so we resolve it here for demonstration purposes (Does not support dynamic changes)
  const resolvedTheme =
    theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

  return (
    <EmotionThemeProvider theme={emotionThemes[resolvedTheme]}>
      <header className="flex gap-fluid-sm p-static-md">
        <RouteSelect />
        <ThemeSelect value={theme} onChange={(e) => setTheme(e.target.value as Theme)} />
      </header>
      <main className={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
        <Outlet />
      </main>
    </EmotionThemeProvider>
  );
}
