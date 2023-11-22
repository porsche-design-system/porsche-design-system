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
    name: 'Overview',
    path: '/overview',
  },
  {
    name: 'Accordion Layout Shift',
    path: '/accordion-layout-shift',
  },
  {
    name: 'Modal Page',
    path: '/modal-standalone',
  },
];
