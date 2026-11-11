/// <reference types="@figma/code-connect/figma-types-no-require" />

import type { ResultSection } from 'figma';
import figma from 'figma';
import { escapeText } from './escape';

// Bundled into every record with a slot at publish; `figma.selectedInstance` is the instance whose template runs.
const instance = figma.selectedInstance;

/** A child's example with `slot="…"` on its own tag, which every template's example starts with (`<p-heading`). */
const assigned = (example: ResultSection[], pdsSlot: string): ResultSection[] =>
  example.map((section, i) =>
    i === 0 && section.type === 'CODE'
      ? { ...section, code: section.code.replace(/^<([\w-]+)/, `<$1 slot="${pdsSlot}"`) }
      : section
  );

/**
 * A slot's content: its instances with a record, then its text layers (`__containingSlotName__`, marked internal).
 * `pdsSlot` names a named slot: only an element carrying `slot="…"` lands in one, so each instance carries it on its
 * own tag and each text layer goes into a `<span>` carrying it.
 */
export const slotted = (slot: ReturnType<typeof instance.getSlot>, name: string, pdsSlot = '') => {
  const content = [
    ...(slot?.connectedInstances.map((c) =>
      pdsSlot ? assigned(c.executeTemplate().example, pdsSlot) : c.executeTemplate().example
    ) ?? []),
    ...instance
      .findLayers((n) => n.type === 'TEXT' && n.__containingSlotName__ === name)
      .flatMap((n) =>
        n.type === 'TEXT'
          ? [
              pdsSlot
                ? figma.code`<span slot="${pdsSlot}">${escapeText(n.textContent)}</span>`
                : figma.code`${escapeText(n.textContent)}`,
            ]
          : []
      ),
  ];
  return content.length ? figma.code`${content}` : '';
};
