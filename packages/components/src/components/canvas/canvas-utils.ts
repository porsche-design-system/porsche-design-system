export type CanvasSidebarStartUpdateEventDetail = { open: boolean };

export const CANVAS_BACKGROUNDS = ['canvas', 'surface'] as const;
export type CanvasBackground = (typeof CANVAS_BACKGROUNDS)[number];
