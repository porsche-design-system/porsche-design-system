import { describe, expect, it } from 'vitest';
import { buildVanillaExtractDeprecations } from '../../../scripts/deprecations';
import * as blurDeprecated from '../../../src/blur/deprecated';
import * as borderDeprecated from '../../../src/border/deprecated';
import * as colorDeprecated from '../../../src/color/deprecated';
import * as focusDeprecated from '../../../src/focus/deprecated';
import * as fontDeprecated from '../../../src/font/deprecated';
import * as gradientDeprecated from '../../../src/gradient/deprecated';
import * as motionDeprecated from '../../../src/motion/deprecated';
import * as shadowDeprecated from '../../../src/shadow/deprecated';
import * as spacingDeprecated from '../../../src/spacing/deprecated';
import * as typographyDeprecated from '../../../src/typography/deprecated';
import { vanillaExtractDeprecations } from '../../../vanillaExtractMeta/deprecations';

/**
 * The knowledge skill's deprecation index is built from this list, so a legacy export missing here is
 * one an audit would never flag — and a private helper appearing here is one it would tell a project
 * to migrate off. The expectation is the barrels' own runtime exports, never a hand-written list; the
 * list is generated, so it is also compared with a fresh extraction, which is what pins its order.
 */

const published = [
  blurDeprecated,
  borderDeprecated,
  colorDeprecated,
  focusDeprecated,
  fontDeprecated,
  gradientDeprecated,
  motionDeprecated,
  shadowDeprecated,
  spacingDeprecated,
  typographyDeprecated,
].flatMap((module) => Object.keys(module));

describe('vanillaExtractDeprecations', () => {
  it('reports every published deprecated export exactly once, and no private helper', () => {
    expect(vanillaExtractDeprecations.map(({ identifier }) => identifier).sort()).toStrictEqual([...published].sort());
  });

  it('structures every marker, carrying no field the contract does not define', () => {
    // The extractor throws on an annotation it cannot structure, so reaching here already proves
    // every one conformed; this pins the shape it produced.
    const malformed = vanillaExtractDeprecations.filter(
      ({ deprecation }) =>
        Object.keys(deprecation).some((key) => !['replacement', 'note'].includes(key)) ||
        Object.values(deprecation).some((value) => !value.trim())
    );
    expect(malformed).toStrictEqual([]);
  });

  it('is up to date with the annotations it is generated from, in domain then barrel order', () => {
    expect(vanillaExtractDeprecations).toStrictEqual(buildVanillaExtractDeprecations());
  });

  it('matches snapshot', () => {
    expect(vanillaExtractDeprecations).toMatchSnapshot();
  });
});
