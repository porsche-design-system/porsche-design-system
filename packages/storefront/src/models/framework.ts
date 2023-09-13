// TODO: shared should be removed from Framework type
export const FRAMEWORK_TYPES = ['angular', 'react', 'vue', 'vanilla-js', 'shared'] as const;
export type Framework = (typeof FRAMEWORK_TYPES)[number];

export type FrameworkMarkup = { [key in Framework]?: string };
