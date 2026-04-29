export const TABS_SIZES = ['small', 'medium'] as const;
export type TabsSize = (typeof TABS_SIZES)[number];

export const TABS_BACKGROUNDS = ['canvas', 'surface', 'frosted', 'none'] as const;
export type TabsBackground = (typeof TABS_BACKGROUNDS)[number];

/** @deprecated */
export const TABS_WEIGHTS = ['regular', 'semi-bold'] as const;
/** @deprecated */
export type TabsWeight = (typeof TABS_WEIGHTS)[number];

export type TabsUpdateEventDetail = { activeTabIndex: number };
