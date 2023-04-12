// TODO: shared should be removed from Framework type
export type Framework = 'angular' | 'react' | 'vue' | 'vanilla-js' | 'shared';

export type FrameworkMarkup = { [key in Framework]?: string };
