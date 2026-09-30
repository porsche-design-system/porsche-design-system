/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// Bundled into every record with a slot at publish; `figma.selectedInstance` is the instance whose template runs.
const instance = figma.selectedInstance;

/**
 * A slot's content: its instances with a record, then its text layers (`__containingSlotName__`, marked internal).
 * `marker` names a named slot, because a child's markup cannot carry `slot="…"`.
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
