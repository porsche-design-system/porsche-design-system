type IntlFromAria = {
  [key: string]: string;
  root?: string;
};

type IntlFromAriaOutput<T> = (T & IntlFromAria) | Record<string, never>;

export const getIntlFromAria = <T>(aria?: T): IntlFromAriaOutput<T> => {
  if (!aria) {
    return {};
  }

  const intlObj: Partial<IntlFromAria> = {};
  const translationKey = 'aria-label';

  for (const key of Object.keys(aria)) {
    const value = aria[key];

    if (key === translationKey) {
      // Direct 'aria-label' key at the root
      intlObj.root = value;
    } else if (typeof value === 'object' && value !== null && translationKey in value) {
      // Nested object with 'aria-label'
      intlObj[key] = value[translationKey];
    }
  }

  return intlObj as IntlFromAriaOutput<T>;
};
