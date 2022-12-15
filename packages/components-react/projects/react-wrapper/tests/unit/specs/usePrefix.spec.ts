import { skipCheckForPorscheDesignSystemProviderDuringTests, usePrefix } from '../../../src/hooks';
import * as React from 'react';
import { PorscheDesignSystemContext } from '../../../src/provider';

// Test is in a separate file as this mocks useContext() for the whole test-suit
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: jest.fn().mockReturnValue({ prefix: 'my-prefix' }), // what you want to return when useContext get fired goes here
  };
});

describe('usePrefix()', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return tagName if process.env.NODE_ENV is set to "test" and skipCheck is true', () => {
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    skipCheckForPorscheDesignSystemProviderDuringTests();
    const tagName = 'p-text';

    expect(usePrefix(tagName)).toBe(tagName);
  });

  it('should return tagName if process.env.NODE_ENV is set to "test" and skipCheck is false', () => {
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    const tagName = 'p-text';

    expect(usePrefix(tagName)).toBe(tagName);
  });

  it('should call useContext() with correct parameter if process.env.NODE_ENV is set to !== "test"', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    usePrefix('p-text');
    expect(React.useContext).toBeCalledWith(PorscheDesignSystemContext);
  });

  it('should return prefixed tagName if process.env.NODE_ENV is set to !== "test"', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };
    const tagName = 'p-text';

    // Prefix is set in useContext() mock
    expect(usePrefix(tagName)).toBe('my-prefix-' + tagName);
  });

  // Thrown error is tested in provider spec
});
