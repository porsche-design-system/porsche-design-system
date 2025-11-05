// TODO: following types should be re-exported from tabs-bar but causes component-meta generator to fail currently
export const TABS_SIZES = ['small', 'medium'] as const;
export type TabsSize = (typeof TABS_SIZES)[number];

export const TABS_WEIGHTS = ['regular', 'semi-bold'] as const;
export type TabsWeight = (typeof TABS_WEIGHTS)[number];

export type TabsUpdateEventDetail = { activeTabIndex: number };
