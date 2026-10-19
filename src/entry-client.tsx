import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { resolveRoute } from './routes';
import './styles/index.css';

const container = document.getElementById('root')!;
const route = resolveRoute(window.location.pathname);
const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
);

if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  // Development server: no prerendered markup, render from scratch.
  document.title = route.title;
  createRoot(container).render(app);
}
