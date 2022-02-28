import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { getInitialStyles } from '@porsche-design-system/components-react/partials';

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(useLocation().pathname);

  return (
    <>
      {/* Needs to be called to test treeshaking in bundle */}
      {getInitialStyles({ format: 'jsx' })}
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

      <div id="app">
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
