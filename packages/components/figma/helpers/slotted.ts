/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// Imported by every generated template that has a slot (scripts/figmaGenerate.ts). The Figma CLI bundles it into each
// record at publish time, so it runs in Figma's template runtime, where `figma.selectedInstance` is the instance whose
// template is executing.
const instance = figma.selectedInstance;

/**
 * A slot's content: its code-connected instances, each through its own template so its code is inline, then its text
 * layers, which `connectedInstances` omits. Text is found by `__containingSlotName__`, which Figma's runtime sets to the
 * slot's property name but does not document; without it only the text is lost. Hidden slots yield neither (measured
 * 2026-09-23). `marker` names the slot for a named slot, because a child's markup arrives as opaque sections that cannot
 * carry `slot="…"`.
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
