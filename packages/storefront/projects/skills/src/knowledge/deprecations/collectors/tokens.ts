import { tokenDeprecations } from '@porsche-design-system/tokens-meta';
import { type DeprecationSource, publicWrapperExport } from '../types';
import { publishedSource } from './published';

/**
 * Adapts the token package's own published deprecations into index entries.
 *
 * `tokenDeprecations` is generated from the `@deprecated` annotations the token declarations carry,
 * beside the `tokensMeta` catalog the tokens reference is rendered from, so a token is either
 * documented or indexed here and cannot be both. That replaces the marker scan this collector used
 * to run over the metadata package's source directory — a grep that could only ever report a file
 * path, never a token name, and that reported "nothing deprecated" for the one reason it also
 * reports it when a package moves its sources.
 *
 * It is empty today, which is a generated result rather than a declaration: the day a token
 * declaration gains an annotation, the entry appears here with the replacement its `{@link}` names.
 */
export const collectTokenDeprecations = (): DeprecationSource =>
  publishedSource({
    category: 'tokens',
    origin: (framework) => `the design-token API exposed by ${publicWrapperExport(framework, '/tokens')}`,
    reference: 'references/tokens.md',
    deprecations: tokenDeprecations,
  });
