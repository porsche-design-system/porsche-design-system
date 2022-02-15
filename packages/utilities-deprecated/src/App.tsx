import { HashRouter, Routes, RouteProps, Route, Navigate } from 'react-router-dom';
import { JsFocus, JsVariables, JsHelper, ScssFocus, ScssVariables, ScssHelper } from './pages';
import './styles.css';

const routes: RouteProps[] = [
  {
    path: '/js-variables',
    element: <JsVariables />,
  },
  {
    path: '/js-focus',
    element: <JsFocus />,
  },
  {
    path: '/js-helper',
    element: <JsHelper />,
  },
  {
    path: '/scss-variables',
    element: <ScssVariables />,
  },
  {
    path: '/scss-focus',
    element: <ScssFocus />,
  },
  {
    path: '/scss-helper',
    element: <ScssHelper />,
  },
];

export const App = (): JSX.Element => (
  <HashRouter>
    <Routes>
      {routes.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
      <Route path="*" element={<Navigate replace to={routes[0].path as string} />} />
    </Routes>
  </HashRouter>
);
