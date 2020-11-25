import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { routes } from './routes';
import { componentsReady } from '@porsche-design-system/components-js';

export const App = (): JSX.Element => {
  const history = useHistory();
  const [selected, setSelected] = useState(history.location.pathname);

  useEffect(() => {
    console.log(new Date().toISOString(), 'useEffect');
    (async function ready() {
      await componentsReady();
    })();
    console.log(new Date().toISOString(), 'ready');
  }, []);

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
        {routes.map((route) => (
          <option key={route.path} value={route.path} children={route.name} />
        ))}
      </select>

      <div id="app">
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    </>
  );
};
