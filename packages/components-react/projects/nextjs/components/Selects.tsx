'use client';

import { routes } from '../routes';
import { useRouter, usePathname } from 'next/navigation';
import { type JSX } from 'react';
import { type Theme } from '@porsche-design-system/components-react/ssr';

type Props = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const Selects = ({ theme, setTheme }: Props): JSX.Element => {
  const router = useRouter();
  const themes: Theme[] = ['light', 'dark', 'auto'];

  return (
    <>
      <select name="route" value={usePathname()!} onChange={(e) => router.push(e.target.value)}>
        <option disabled value="">
          Select a page
        </option>
        {routes.map((route) => (
          <option key={route.path} value={route.path} children={route.name} />
        ))}
      </select>

      <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
        {themes.map((item) => (
          <option key={item} value={item} children={item} />
        ))}
      </select>
    </>
  );
};
