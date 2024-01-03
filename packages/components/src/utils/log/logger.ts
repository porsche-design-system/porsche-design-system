const prefix =
  process.env.NODE_ENV === 'production'
    ? `[Porsche Design System v${ROLLUP_REPLACE_VERSION}]` // this part isn't covered by unit tests
    : '[Porsche Design System]';

export const consoleWarn = (...messages: (string | object)[]): void => {
  console.warn(prefix, ...messages); // eslint-disable-line no-console
};

export const consoleError = (...messages: (string | object)[]): void => {
  console.error(prefix, ...messages); // eslint-disable-line no-console
};

export const throwException = (message: string): void => {
  throw new Error(`${prefix} ${message}`); // eslint-disable-line fp/no-throw
};
