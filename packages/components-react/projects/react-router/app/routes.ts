import { index, type RouteConfig, route } from '@react-router/dev/routes';

type Route = {
  name: string;
  path: string;
};

export const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Overview Components',
    path: '/overview-components',
  },
  {
    name: 'AccordionLayoutShift',
    path: '/accordion-layout-shift',
  },
  {
    name: 'SheetBasic',
    path: '/sheet-basic',
  },
  {
    name: 'SheetPrefixed',
    path: '/sheet-prefixed',
  },
  {
    name: 'BannerBasic',
    path: '/banner-basic',
  },
  {
    name: 'BannerPrefixed',
    path: '/banner-prefixed',
  },
  {
    name: 'CanvasBasic',
    path: '/canvas-basic',
  },
  {
    name: 'CanvasPrefixed',
    path: '/canvas-prefixed',
  },
  {
    name: 'FlyoutBasic',
    path: '/flyout-basic',
  },
  {
    name: 'FlyoutPrefixed',
    path: '/flyout-prefixed',
  },
  {
    name: 'DrilldownBasic',
    path: '/drilldown-basic',
  },
  {
    name: 'DrilldownPrefixed',
    path: '/drilldown-prefixed',
  },
  {
    name: 'ModalBasic',
    path: '/modal-basic',
  },
  {
    name: 'ModalPrefixed',
    path: '/modal-prefixed',
  },
  {
    name: 'ToastBasic',
    path: '/toast-basic',
  },
  {
    name: 'ToastPrefixed',
    path: '/toast-prefixed',
  },
];

export default [
  index('routes/home.tsx'),
  ...routes.filter((r) => r.path !== '/').map((r) => route(r.path, `routes${r.path}.tsx`)),
] satisfies RouteConfig;
