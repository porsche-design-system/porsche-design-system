const prefix =
  process.env.NODE_ENV === 'production'
    ? `[Porsche Design System v${ROLLUP_REPLACE_VERSION}]`
    : '[Porsche Design System]';

export const consoleWarn = (...messages: string[]): void => {
  console.warn(prefix, ...messages); // eslint-disable-line no-console
};

export const consoleError = (...messages: string[]): void => {
  console.error(prefix, ...messages); // eslint-disable-line no-console
};

export const throwException = (message: string): void => {
  throw new Error(`${prefix} ${message}`);
};
