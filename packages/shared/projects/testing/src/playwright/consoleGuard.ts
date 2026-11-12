export type CollectedMessage = { type: string; text: string; url: string };

/** `info` messages a browser logs for a request the test aborted. Index 0 is WebKit. */
export const abortedRequestPatterns: RegExp[] = [/^Web Inspector blocked .+ from loading$/];

const isGuarded = ({ type, text }: CollectedMessage): boolean =>
  type === 'error' ||
  type === 'warning' ||
  (type === 'info' && abortedRequestPatterns.some((pattern) => pattern.test(text)));

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
