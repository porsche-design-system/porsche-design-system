import { MatcherFunction } from 'expect';

export const toHaveVisibleStyle: MatcherFunction = (css: string): jest.CustomMatcherResult => {
  const pass = css.includes('visibility: visible');
  return {
    pass,
    message: () =>
      pass
        ? `Expected CSS not to contain 'visibility: visible', but it did.`
        : `Expected CSS to contain 'visibility: visible', but it didn't.`,
  };
};
