import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('crypto/:id', './routes/crypto.tsx'),
] satisfies RouteConfig;
