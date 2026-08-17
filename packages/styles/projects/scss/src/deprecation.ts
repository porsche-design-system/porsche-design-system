import { kindOf } from './kind';
import type { DeprecatedScssNode, ScssDeclaration } from './types';

// Deprecation wording and identity, owned by this package so the generated SCSS comments and every
// consumer of `scssDeprecationsMeta` (the knowledge skill's audit index) say the same thing. Nothing
// downstream re-derives a fallback message or re-spells an identifier.

/** The lifecycle message used when a node authors no `message` of its own. */
const DEFAULT_MESSAGE = 'This API will be removed with the next major release.';
const DEFAULT_MESSAGE_WITHOUT_REPLACEMENT =
  'This API will be removed with the next major release and has no replacement.';

/**
 * The canonical consumer-facing spelling of a declaration: a variable keeps its `$`-prefixed name, a
 * mixin gains `()`. Authored `replacement` values are derived from a current node through this, so a
 * rename of the recommended API cannot leave a deprecation pointing at a name that no longer exists.
 */
export const scssIdentifier = (node: ScssDeclaration): string =>
  kindOf(node) === 'token' ? node.name : `${node.name}()`;

/** The lifecycle sentence of a deprecated node: its authored `message`, or the default for its replacement state. */
export const scssDeprecationMessage = ({ deprecation }: DeprecatedScssNode): string =>
  deprecation.message ?? (deprecation.replacement ? DEFAULT_MESSAGE : DEFAULT_MESSAGE_WITHOUT_REPLACEMENT);

/** The complete generated text: the replacement sentence, when there is one, followed by the lifecycle message. */
export const scssDeprecationText = (node: DeprecatedScssNode): string =>
  [node.deprecation.replacement && `Use ${node.deprecation.replacement} instead.`, scssDeprecationMessage(node)]
    .filter(Boolean)
    .join(' ');

/** Whether a node carries the deprecation lifecycle marker. */
export const isDeprecated = (node: object): node is DeprecatedScssNode => 'deprecation' in node;
