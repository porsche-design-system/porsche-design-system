import { describe, expect, it } from 'vitest';
import { buildVanillaExtractDeprecationsMeta } from '../../../scripts/deprecations';
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
import { vanillaExtractDeprecationsMeta } from '../../../vanillaExtractMeta/deprecations';
import { vanillaExtractMeta } from '../../../vanillaExtractMeta/meta';

/**
 * The knowledge skill's deprecation index is built from this catalog, so a legacy export missing
 * here is one an audit would never flag — and a private helper appearing here is one it would tell a
 * project to migrate off. The expectation is the barrels' own runtime exports, never a hand-written
 * list; the catalog is generated, so it is also compared with a fresh extraction.
 */

const nodes = Object.values(vanillaExtractDeprecationsMeta).flat();

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

describe('vanillaExtractDeprecationsMeta', () => {
  it('reports every published deprecated export exactly once, and no private helper', () => {
    expect(nodes.map(({ name }) => name).sort()).toStrictEqual([...published].sort());
  });

  it('annotates every one of them', () => {
    expect(nodes.filter(({ deprecation }) => !deprecation.message.trim())).toStrictEqual([]);
  });

  it('is keyed by every vanillaExtractMeta domain, in catalog order', () => {
    expect(Object.keys(vanillaExtractDeprecationsMeta)).toStrictEqual(Object.keys(vanillaExtractMeta));
  });

  it('is up to date with the annotations it is generated from', () => {
    expect(vanillaExtractDeprecationsMeta).toStrictEqual(buildVanillaExtractDeprecationsMeta());
  });

  it('matches snapshot', () => {
    expect(vanillaExtractDeprecationsMeta).toMatchSnapshot();
  });
});
