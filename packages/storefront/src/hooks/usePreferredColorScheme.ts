'use client';

import { useEffect, useState } from 'react';

export const isPreferredColorSchemeDark = () =>
  global?.window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const handlersSet: Set<() => void> = new Set();

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => handlersSet.forEach((cb) => cb());
  mediaQuery.addEventListener('change', handleChange);
}

export const onPrefersColorSchemeChange = (cb: () => void): void => {
  handlersSet.add(cb);
};

export const removeOnPrefersColorSchemeChange = (cb: () => void): void => {
  handlersSet.delete(cb);
};

export const usePreferredColorScheme = (): boolean => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(isPreferredColorSchemeDark());

    update(); // run once immediately
    onPrefersColorSchemeChange(update);

    return () => {
      removeOnPrefersColorSchemeChange(update);
    };
  }, []);

  return isDark;
};
