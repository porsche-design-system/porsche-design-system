import { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { routes } from './routes';

export const App = (): JSX.Element => {
  const history = useHistory();
  const [selected, setSelected] = useState(history.location.pathname);

  return (
    <>
      <select
        value={selected}
        onChange={(e) => {
          const { value } = e.target;
          history.push(value);
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
        <Switch>
          {routes
            .filter((route) => !route.isDisabled)
            .map((route, i) => (
              <Route key={i} {...route} />
            ))}
        </Switch>
      </div>
    </>
  );
};
