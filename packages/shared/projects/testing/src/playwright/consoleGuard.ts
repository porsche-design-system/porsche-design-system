export type CollectedMessage = { type: string; text: string; url: string };

const isGuarded = ({ type }: CollectedMessage): boolean => type === 'error' || type === 'warning';

const matchesAny = (patterns: RegExp[], value: string): boolean =>
  patterns.some((pattern) => {
    // A g or y flag makes test() resume from lastIndex, so every check starts over.
    pattern.lastIndex = 0;
    return pattern.test(value);
  });

export const findUnexpectedConsole = (messages: CollectedMessage[], expected: RegExp[]): CollectedMessage[] =>
  messages.filter((message) => isGuarded(message) && !matchesAny(expected, `${message.text} ${message.url}`));

export const findUnexpectedPageErrors = (pageErrors: string[], expected: RegExp[]): string[] =>
  pageErrors.filter((error) => !matchesAny(expected, error));

export const formatUnexpectedConsole = (messages: CollectedMessage[], pageErrors: string[]): string =>
  [
    ...messages.map(({ type, text, url }) => `[${type}] ${text} (${url})`),
    ...pageErrors.map((error) => `[pageerror] ${error}`),
  ].join('\n');
