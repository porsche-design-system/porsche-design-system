import { COLOR_SCHEMES, type ColorScheme } from '@porsche-design-system/shared';
import { type JSX } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext.tsx';
import { routes } from './routes';

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
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

          <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value as ColorScheme)}>
            {COLOR_SCHEMES.map((item) => (
              <option key={item} value={item} children={item} />
            ))}
          </select>
        </>
      )}

      <div id="app" className={theme}>
        <Routes>
          {routes
            .filter((route) => !route.isDisabled)
            .map((route, i) => (
              <Route key={i} {...route} />
            ))}
        </Routes>
      </div>
    </>
  );
};
