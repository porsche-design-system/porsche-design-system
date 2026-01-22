import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwindcss.css';
import './scss.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './Layout.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { routes } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
