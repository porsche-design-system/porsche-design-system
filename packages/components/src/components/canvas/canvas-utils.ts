export const CANVAS_SIDEBAR_WIDTHS = ['medium', 'large'] as const;
export type CanvasSidebarWidth = (typeof CANVAS_SIDEBAR_WIDTHS)[number];
export type CanvasSidebarStartWidth = CanvasSidebarWidth;
export type CanvasSidebarEndWidth = CanvasSidebarWidth;
