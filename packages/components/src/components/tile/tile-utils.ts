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

export const TILE_EDGES = ['top', 'start', 'end', 'bottom'] as const;
export type TileEdge = (typeof TILE_EDGES)[number];

export const tileAnchorSlot = 'anchor';
export const tileBackgroundSlot = 'background';

export type TileSlotState = Record<TileEdge | typeof tileAnchorSlot | typeof tileBackgroundSlot, boolean>;

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
