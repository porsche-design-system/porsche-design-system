import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-react';
import { type JSX, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from './routes';

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>('light');
  const themes: Theme[] = ['light', 'dark', 'auto'];
  const { pathname } = useLocation();
  const isWithinIFrame: boolean = window.location !== window.parent.location;

  return (
    <>
      {!isWithinIFrame && (
        <>
          <select name="route" value={pathname} onChange={(e) => navigate(e.target.value)}>
            <option disabled value="/">
              Select a page
            </option>
            {routes.map((route, i) => (
              <option key={i} disabled={route.isDisabled} value={route.path} children={route.name} />
            ))}
          </select>

          <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            {themes.map((item) => (
              <option key={item} value={item} children={item} />
            ))}
          </select>
        </>
      )}

      <div id="app">
        <PorscheDesignSystemProvider cdn="auto" theme={theme}>
          <Routes>
            {routes
              .filter((route) => !route.isDisabled)
              .map((route, i) => (
                <Route key={i} {...route} />
              ))}
          </Routes>
        </PorscheDesignSystemProvider>
      </div>
    </>
  );
};
