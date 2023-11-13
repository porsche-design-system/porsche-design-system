import { type JSX, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>('light');
  const themes: Theme[] = ['light', 'dark', 'auto'];

  return (
    <>
      <select
        name="route"
        value={useLocation().pathname}
        onChange={(e) => {
          const { value } = e.target;
          navigate(value);
        }}
      >
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
