import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router';
import { emotionTheme } from './app/emotion/emotionTheme.ts';
import { vanillaExtractTheme } from './app/vanilla-extract/theme.css';
import { RouteSelect } from './components/RouteSelect.tsx';
import { ThemeSelect } from './components/ThemeSelect.tsx';
import { useTheme } from './hooks/useTheme.ts';
import type { LightDarkTheme } from './providers/ThemeProvider.tsx';

export function App() {
  const { theme, setTheme } = useTheme();

  return (
    <EmotionThemeProvider theme={emotionTheme}>
      <header className="flex gap-fluid-sm p-static-md">
        <RouteSelect />
        <ThemeSelect value={theme} onChange={(e) => setTheme(e.target.value as LightDarkTheme)} />
      </header>
      <main className={vanillaExtractTheme}>
        <Outlet />
      </main>
    </EmotionThemeProvider>
  );
}
