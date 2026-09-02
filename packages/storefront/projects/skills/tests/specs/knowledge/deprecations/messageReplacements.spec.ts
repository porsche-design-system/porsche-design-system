import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { describe, expect, it } from 'vitest';

/**
 * Whether a replacement parses out of an `@deprecated` message decides an effort grade.
 *
 * The rendered cell opens with the replacement, and the audit skill reads exactly that position to
 * decide whether a replacement is documented — so a message shape that fails to parse silently
 * grades every finding built on it one level dearer. `Use the \`summary\` slot instead` used to fail,
 * because the quotes were made to bound the captured phrase and so stopped it at "summary" before
 * the trailing " instead" could match. Two fixture runs graded the three `p-accordion` prop rows
 * `small` and `medium`.
 */
const COMPONENT_ENTRIES = collectDeprecations()
  .flatMap((source) => source.entries)
  .filter((entry) => entry.source === 'components' && entry.usageKind !== 'propValue');

const byId = (id: string) => {
  const entry = COMPONENT_ENTRIES.find((candidate) => candidate.id === id);
  if (!entry) {
    throw new Error(`no deprecation entry ${id}`);
  }
  return entry;
};

describe('replacements parsed from deprecation messages', () => {
  it('parses a successor whose quoting covers only part of the phrase', () => {
    for (const id of ['prop/p-accordion/heading', 'prop/p-accordion/headingTag', 'prop/p-accordion/size']) {
      expect(byId(id).replacement, `${id} names a successor its message states`).toBe('summary slot');
    }
  });

  it('still parses the shapes that already worked', () => {
    expect(byId('component/p-display').replacement).toBe('p-heading');
    expect(byId('prop/p-scroller/scrollToPosition').replacement).toBe('scrollIntoView()');
    expect(byId('slot/p-banner/description').replacement).toBe('default slot');
  });

  it('claims nothing where the message names no successor', () => {
    // "has no effect anymore" and a slot described but never redirected: one level dearer is correct
    // here, and a guess would be rendered as authoritative remediation.
    for (const id of ['prop/p-scroller/alignScrollIndicator', 'prop/p-tabs-bar/weight', 'slot/p-accordion/heading']) {
      expect(byId(id).replacement, `${id} should claim no replacement`).toBeFalsy();
    }
  });
});
