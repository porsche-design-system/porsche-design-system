export type CollectedMessage = { type: string; text: string; url: string };

/** `info` messages a browser logs for a request the test aborted. Index 0 is WebKit. */
export const abortedRequestPatterns: RegExp[] = [/^Web Inspector blocked .+ from loading$/];

const isGuarded = ({ type, text }: CollectedMessage): boolean =>
  type === 'error' ||
  type === 'warning' ||
  (type === 'info' && abortedRequestPatterns.some((pattern) => pattern.test(text)));

export const findUnexpectedConsole = (messages: CollectedMessage[], expected: RegExp[]): CollectedMessage[] =>
  messages.filter(
    (message) => isGuarded(message) && !expected.some((pattern) => pattern.test(`${message.text} ${message.url}`))
  );

export const formatUnexpectedConsole = (messages: CollectedMessage[], pageErrors: string[]): string =>
  [
    ...messages.map(({ type, text, url }) => `[${type}] ${text} (${url})`),
    ...pageErrors.map((error) => `[pageerror] ${error}`),
  ].join('\n');
