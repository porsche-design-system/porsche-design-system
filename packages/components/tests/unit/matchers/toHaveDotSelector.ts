import { MatcherFunction } from 'expect';

export const toHaveDotSelector: MatcherFunction = (css: string): jest.CustomMatcherResult => {
  const pass = css.includes('. {');
  return {
    pass,
    message: () =>
      pass ? `Expected CSS not to contain '. {', but it did.` : `Expected CSS to contain '. {', but it didn't.`,
  };
};
