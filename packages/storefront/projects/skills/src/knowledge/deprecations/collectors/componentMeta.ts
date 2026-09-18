import { componentMeta } from '@porsche-design-system/component-meta';
import { type DeprecationEntry, type DeprecationSource, publicWrapperExport } from '../types';
import { valueReplacement } from '../valueReplacements';

/**
 * Collects every deprecated entity `component-meta` knows about — components, props, prop values,
 * events, slots and CSS variables. `component-meta` is the authoritative component API source, so
 * this collector reads it directly rather than the rendered references, which exist to be read by a
 * human or an agent and would have to be parsed back.
 *
 * The deprecation *message* is taken verbatim. Only the replacement hint is derived, and only by
 * looking for the shapes the codebase actually writes (`Use X instead`, `use native X on …`), where
 * X may be a multi-word phrase with only part of it quoted; when none matches, no replacement is
 * claimed rather than a guess being rendered.
 *
 * Whether a replacement parses is not cosmetic: the rendered cell opens with it, and the audit skill
 * reads that position to decide whether a replacement is documented at all — which sets the finding's
 * effort. A shape that fails to parse therefore grades every finding built on it one level dearer.
 */

/** The component reference documenting a tag, relative to the skill root. */
const componentReference = (tag: string): string => `references/components/${tag}/${tag}.md`;

/**
 * The replacement an `@deprecated` message names, if it names one in a shape we recognise.
 *
 * Deliberately conservative. This is the one place a message is inspected at all, and a wrong guess
 * here would be rendered as authoritative remediation — so an unrecognised shape yields nothing and
 * the reader falls back to the verbatim message, which is always carried alongside.
 */
const parseReplacement = (message: string): string | undefined => {
  // The successor may be several words with only part of it quoted — `Use the \`summary\` slot
  // instead` names "summary slot", the same shape as the already-handled `Use the default slot
  // instead`. So the phrase is captured whole and its quoting stripped afterwards, rather than the
  // quotes bounding the capture: bounding them stopped this shape at "summary" and then failed to
  // find " instead", yielding no replacement at all. Sentence punctuation still bounds the phrase,
  // so a message offering a choice ("Use X, or Y instead") matches nothing and stays unparsed.
  const match = message.match(/\b[Uu]se (?:the )?(?:native )?([^.,;]+?)(?: instead| on )/);
  return match?.[1]?.replace(/[`']/g, '').trim() || undefined;
};

/** Strip the `@deprecated` marker and surrounding whitespace, keeping the message itself verbatim. */
const cleanMessage = (raw: string | undefined): string =>
  (raw ?? '')
    .replace(/^\s*@deprecated\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

const entry = (parts: Omit<DeprecationEntry, 'source'> & { message: string }): DeprecationEntry => ({
  ...parts,
  source: 'components',
  replacement: parts.replacement ?? parseReplacement(parts.message),
});

export const collectComponentDeprecations = (): DeprecationSource => {
  const entries: DeprecationEntry[] = [];

  for (const [tag, meta] of Object.entries(componentMeta)) {
    const reference = componentReference(tag);

    if (meta.isDeprecated) {
      entries.push(
        entry({
          id: `component/${tag}`,
          usageKind: 'component',
          identifier: tag,
          message: cleanMessage(meta.deprecationMessage),
          reference,
        })
      );
    }

    for (const [name, prop] of Object.entries(meta.propsMeta ?? {})) {
      if (prop.isDeprecated) {
        entries.push(
          entry({
            id: `prop/${tag}/${name}`,
            usageKind: 'prop',
            owner: tag,
            identifier: name,
            message: cleanMessage(prop.description),
            reference,
          })
        );
      }
      // Deprecated *values* survive their prop: `weight` on `p-text` is current, but its `'regular'`
      // and `'semi-bold'` values are not. They are collected even when the prop itself is deprecated,
      // since a project may use both and each has its own remediation.
      const deprecatedValues = new Set((prop.deprecatedValues ?? []).map(String));
      // `component-meta` records which values are deprecated but not what replaced them.
      // `valueReplacement` derives the successor from the remaining allowed values where the
      // deprecation was a renaming.
      const currentValues = (Array.isArray(prop.allowedValues) ? prop.allowedValues : [])
        .map(String)
        .filter((value) => !deprecatedValues.has(value));
      for (const value of deprecatedValues) {
        entries.push(
          entry({
            id: `propValue/${tag}/${name}/${value}`,
            usageKind: 'propValue',
            owner: tag,
            prop: name,
            identifier: value,
            message: '',
            replacement: valueReplacement(value, currentValues) ?? '',
            reference,
          })
        );
      }
    }

    for (const [name, event] of Object.entries(meta.eventsMeta ?? {})) {
      if (event.isDeprecated) {
        entries.push(
          entry({
            id: `event/${tag}/${name}`,
            usageKind: 'event',
            owner: tag,
            identifier: name,
            message: cleanMessage(event.description),
            reference,
          })
        );
      }
    }

    for (const [name, slot] of Object.entries(meta.slotsMeta ?? {})) {
      if (slot.isDeprecated) {
        entries.push(
          entry({
            id: `slot/${tag}/${name || '(default)'}`,
            usageKind: 'slot',
            owner: tag,
            identifier: name,
            message: cleanMessage(slot.description),
            reference,
          })
        );
      }
    }

    for (const [name, cssVariable] of Object.entries(meta.cssVariablesMeta ?? {})) {
      if (cssVariable.isDeprecated) {
        entries.push(
          entry({
            id: `cssCustomProperty/${tag}/${name}`,
            usageKind: 'cssCustomProperty',
            owner: tag,
            identifier: name,
            message: cleanMessage(cssVariable.description),
            reference,
          })
        );
      }
    }
  }

  entries.sort((a, b) => a.id.localeCompare(b.id));

  return {
    category: 'components',
    origin: (framework) => `the component API exposed by ${publicWrapperExport(framework)}`,
    entries,
  };
};
