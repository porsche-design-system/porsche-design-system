export const TILE_BACKGROUNDS = ['surface', 'canvas', 'frosted'] as const;
export type TileBackground = (typeof TILE_BACKGROUNDS)[number];

export const TILE_GRADIENTS = ['none', 'top', 'bottom', 'start', 'end', 'block', 'inline', 'all'] as const;
export type TileGradient = (typeof TILE_GRADIENTS)[number];

export const TILE_EDGES = ['top', 'start', 'end', 'bottom'] as const;
export type TileEdge = (typeof TILE_EDGES)[number];

export const anchorSlot = 'anchor';
export const backgroundSlot = 'background';

export type TileSlotState = Record<TileEdge | typeof anchorSlot | typeof backgroundSlot, boolean>;

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
