/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// Imported by every template with a slot. The Figma CLI bundles it into each record at publish, so it runs in Figma's
// template runtime. There, `figma.selectedInstance` is the instance whose template runs.
const instance = figma.selectedInstance;

/**
 * The content of a slot: first its instances with a record, each rendered through its own template, then its text
 * layers. Text layers are found by `__containingSlotName__`, which Figma sets but does not document. Without it, only
 * the text is lost. A hidden slot yields nothing. `marker` names the slot for a named slot, because a child's markup
 * cannot carry `slot="…"`.
 */
export const slotted = (slot: ReturnType<typeof instance.getSlot>, name: string, marker = '') => {
  const content = [
    ...(slot?.connectedInstances.map((c) => c.executeTemplate().example) ?? []),
    ...instance
      .findLayers((n) => n.type === 'TEXT' && n.__containingSlotName__ === name)
      .flatMap((n) => (n.type === 'TEXT' ? [figma.code`${n.textContent}`] : [])),
  ];
  return content.length ? figma.code`${marker}${content}` : '';
};
