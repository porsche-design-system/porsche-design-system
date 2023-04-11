import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { routes } from './routes';

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  // global click handler for custom elements with href property
  const onContentClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    const { href } = e.target as any;
    if (href?.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <select
        value={selected}
        onChange={(e) => {
          const { value } = e.target;
          navigate(value);
          setSelected(value);
        }}
      >
        <option disabled value="">
          Select a page
        </option>
        {routes.map((route, i) => (
          <option key={i} disabled={route.isDisabled} value={route.path} children={route.name} />
        ))}
      </select>

      <div id="app" onClick={onContentClick}>
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
