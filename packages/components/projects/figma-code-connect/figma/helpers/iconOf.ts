/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';

// Bundled into every record with an icon swap at publish, so it runs in Figma's template runtime.

/** The swapped icon's PDS name from its own record; an icon without one renders no `name` prop and is left out. */
export const iconOf = (swap: ReturnType<InstanceHandle['getInstanceSwap']>): string | undefined => {
  if (swap?.type !== 'INSTANCE') return undefined;
  const name = swap.executeTemplate().metadata?.props?.name;
  return typeof name === 'string' ? name : undefined;
};
