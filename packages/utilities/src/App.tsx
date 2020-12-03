import { HashRouter, Switch, RouteProps, Route, Redirect } from 'react-router-dom';
import { JsFocus, JsVariables, ScssFocus, ScssVariables } from './pages';
import './styles.css';

const routes: RouteProps[] = [
  {
    path: '/js-variables',
    component: JsVariables
  },
  {
    path: '/js-focus',
    component: JsFocus
  },
  {
    path: '/scss-variables',
    component: ScssVariables
  },
  {
    path: '/scss-focus',
    component: ScssFocus
  }
];

export const App = (): JSX.Element => (
  <HashRouter>
    <Switch>
      {routes.map((route, idx) => (
        <Route key={idx} {...route} exact />
      ))}
      <Redirect path="*" to={routes[0].path as string} />
    </Switch>
  </HashRouter>
);
