const prefix = '[Porsche Design System]';

export const consoleWarn = (...messages: string[]): void => {
  console.warn(prefix, ...messages); // eslint-disable-line no-console
};

export const consoleError = (...messages: string[]): void => {
  console.error(prefix, ...messages); // eslint-disable-line no-console
};
