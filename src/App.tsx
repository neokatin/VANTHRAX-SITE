import { Layout } from './components/layout/Layout';
import type { Route } from './routes';

export function App({ route }: { route: Route }) {
  return <Layout isHome={!!route.isHome}>{route.render()}</Layout>;
}
