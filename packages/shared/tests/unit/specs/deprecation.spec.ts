import { describe, expect, it } from 'vitest';
import {
  type Deprecation,
  deprecationMessage,
  deprecationText,
  isDeprecated,
  publishDeprecations,
} from '../../../src/deprecation';

/**
 * The deprecation contract every metadata-producing package builds on: one marker, one set of
 * lifecycle sentences, one projection. These used to be asserted twice over — once in the SCSS
 * package and once in Tailwind — which tested two copies of wording that only ever had one source.
 */

const node = (deprecation: Deprecation) => ({ deprecation });

describe('deprecationMessage', () => {
  it('defaults an empty marker to the no-replacement lifecycle sentence', () => {
    expect(deprecationMessage(node({}))).toBe(
      'This API will be removed with the next major release and has no replacement.'
    );
  });

  it('defaults to the plain lifecycle sentence when a replacement is authored', () => {
    expect(deprecationMessage(node({ replacement: '$radius-sm' }))).toBe(
      'This API will be removed with the next major release.'
    );
  });

  it('lets an authored message replace the default', () => {
    expect(deprecationMessage(node({ message: 'Gone already.' }))).toBe('Gone already.');
  });
});

describe('deprecationText', () => {
  it('prefixes the lifecycle message with a replacement sentence when there is one', () => {
    expect(deprecationText(node({ replacement: '$radius-sm' }))).toBe(
      'Use $radius-sm instead. This API will be removed with the next major release.'
    );
  });

  it('is the lifecycle message alone when there is no replacement', () => {
    expect(deprecationText(node({}))).toBe(deprecationMessage(node({})));
  });

  it('prefixes an authored message just the same, so guidance is never duplicated', () => {
    expect(deprecationText(node({ replacement: '$radius-sm', message: 'Gone already.' }))).toBe(
      'Use $radius-sm instead. Gone already.'
    );
  });
});

describe('isDeprecated', () => {
  it('recognises a node by the mere presence of the marker', () => {
    expect(isDeprecated(node({}))).toBe(true);
    expect(isDeprecated({ name: '$radius-sm' })).toBe(false);
  });
});

describe('publishDeprecations', () => {
  const catalog = {
    border: [{ name: 'a', deprecation: { replacement: 'b' } }],
    // Nested groups and empty domains are both part of the shape a package may author.
    typography: { heading: [{ name: 'c', deprecation: {} }] },
    blur: [],
  };

  it('flattens every domain in catalog order, spelling identifiers through the package helper', () => {
    expect(publishDeprecations(catalog, ({ name }) => `${name}()`)).toStrictEqual([
      { identifier: 'a()', deprecation: { replacement: 'b' } },
      { identifier: 'c()', deprecation: {} },
    ]);
  });

  it('carries the marker through untouched, so wording is resolved once downstream', () => {
    expect(publishDeprecations(catalog, ({ name }) => name).map(deprecationMessage)).toStrictEqual([
      'This API will be removed with the next major release.',
      'This API will be removed with the next major release and has no replacement.',
    ]);
  });
});
