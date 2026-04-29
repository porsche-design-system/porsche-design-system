import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwindcss.css';
import './scss.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { App } from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { routes } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<App />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
