import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [index('routes/home.tsx'), route('foo', './routes/foo.tsx')] satisfies RouteConfig;
