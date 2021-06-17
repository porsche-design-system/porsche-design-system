const PANEL_SIZE = ['small', 'medium'] as const;
export type PanelSize = typeof PANEL_SIZE[number];
export type PanelChangeEvent = { open: boolean };
