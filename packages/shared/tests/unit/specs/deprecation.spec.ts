import { describe, expect, it } from 'vitest';
import { getDeprecationComment, isDeprecated } from '../../../src/deprecation';

/**
 * The deprecation contract every metadata-producing package builds on: one marker, one sentence, one
 * comment generator. The wording is asserted here and nowhere else, so no package can restate it.
 */

describe('getDeprecationComment', () => {
  it('states the lifecycle for an empty marker', () => {
    expect(getDeprecationComment({}, 'line')).toBe(
      '// @deprecated This API will be removed with the next major release.'
    );
  });

  it('prefixes the replacement sentence when there is one', () => {
    expect(getDeprecationComment({ replacement: '$radius-sm' }, 'line')).toBe(
      '// @deprecated Use $radius-sm instead. This API will be removed with the next major release.'
    );
  });

  it('appends the note instead of replacing the lifecycle sentence', () => {
    expect(
      getDeprecationComment({ replacement: '--default-border-width', note: 'The default is now 1px.' }, 'line')
    ).toBe(
      '// @deprecated Use --default-border-width instead. This API will be removed with the next major release. The default is now 1px.'
    );
  });

  it('appends a note that has no replacement beside it', () => {
    expect(getDeprecationComment({ note: 'Use individual variables instead.' }, 'line')).toBe(
      '// @deprecated This API will be removed with the next major release. Use individual variables instead.'
    );
  });

  it.each([
    ['line', '// @deprecated This API will be removed with the next major release.'],
    ['block', '/* @deprecated This API will be removed with the next major release. */'],
    ['jsdoc', '/** @deprecated This API will be removed with the next major release. */'],
  ] as const)('wraps the text in %s syntax', (style, expected) => {
    expect(getDeprecationComment({}, style)).toBe(expected);
  });
});

describe('isDeprecated', () => {
  it('recognises a node by the mere presence of the marker', () => {
    expect(isDeprecated({ deprecation: {} })).toBe(true);
  });

  it.each([{}, null, undefined, 'string'])('rejects %s', (node) => {
    expect(isDeprecated(node)).toBe(false);
  });
});
