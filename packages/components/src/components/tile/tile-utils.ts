import { getPrefixedTagNames } from '../../utils';

export const TILE_BACKGROUNDS = ['surface', 'canvas', 'frosted', 'none'] as const;
export type TileBackground = (typeof TILE_BACKGROUNDS)[number];

export const TILE_GRADIENTS = ['none', 'top', 'bottom', 'start', 'end', 'block', 'inline', 'all'] as const;
export type TileGradient = (typeof TILE_GRADIENTS)[number];

export const TILE_HOVER_EFFECT_TOKENS = ['zoom', 'offset', 'highlight'] as const;
export type TileHoverEffectToken = (typeof TILE_HOVER_EFFECT_TOKENS)[number];
// combinations are listed in a fixed order, so they can be validated and documented like any other enum
export const TILE_HOVER_EFFECTS = [
  'none',
  'zoom',
  'offset',
  'highlight',
  'zoom offset',
  'zoom highlight',
  'offset highlight',
  'zoom offset highlight',
] as const;
export type TileHoverEffect = (typeof TILE_HOVER_EFFECTS)[number];

export const hasHoverEffectToken = (hoverEffect: TileHoverEffect, token: TileHoverEffectToken): boolean =>
  hoverEffect.split(' ').includes(token);

// set on the root while the link of the tile is hovered, so the hover effect can be applied via css
export const tileLinkHoverAttribute = 'data-link-hover';

export const TILE_EDGES = ['top', 'start', 'end', 'bottom'] as const;
export type TileEdge = (typeof TILE_EDGES)[number];

export const tileAnchorSlot = 'anchor';
export const tileBackgroundSlot = 'background';

export type TileSlotState = Record<TileEdge | typeof tileAnchorSlot | typeof tileBackgroundSlot, boolean>;

/**
 * Checks whether the event originates from the link of the tile, i.e. the slotted `anchor` or a `p-link` with `cover`,
 * so independent interactive elements don't trigger the hover effect.
 */
export const isTileLinkEvent = (host: HTMLElement, event: Event): boolean => {
  const linkTagName = getPrefixedTagNames(host).pLink;
  for (const target of event.composedPath()) {
    if (target === host) {
      break;
    }
    // the path contains shadow roots and slots of nested components, e.g. the slotted anchor of a `p-link`
    if (!(target instanceof HTMLElement)) {
      continue;
    }
    if (
      (target.parentElement === host && target.slot === tileAnchorSlot) ||
      (target.tagName.toLowerCase() === linkTagName && (target as HTMLElement & { cover?: boolean }).cover)
    ) {
      return true;
    }
  }
  return false;
};

export const isGradientActiveForEdge = (gradient: TileGradient, edge: TileEdge): boolean => {
  switch (gradient) {
    case 'all':
      return true;
    case 'block':
      return edge === 'top' || edge === 'bottom';
    case 'inline':
      return edge === 'start' || edge === 'end';
    default:
      return gradient === edge;
  }
};
