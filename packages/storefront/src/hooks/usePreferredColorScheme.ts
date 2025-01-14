import { useEffect, useState } from 'react';

export const isPreferredColorSchemeDark = () =>
  global?.window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const handlersSet: Set<() => void> = new Set();

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  // biome-ignore lint/complexity/noForEach: <explanation>
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
  const [isDark, setIsDark] = useState(isPreferredColorSchemeDark());

  useEffect(() => {
    const handleChange = () => setIsDark(isPreferredColorSchemeDark());
    onPrefersColorSchemeChange(handleChange);

    return () => {
      removeOnPrefersColorSchemeChange(handleChange);
    };
  }, []);

  return isDark;
};
