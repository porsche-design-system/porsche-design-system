// TODO: shared should be removed from Framework type
export type Framework = 'vanilla-js' | 'angular' | 'react' | 'shared' | 'vue';

export type FrameworkMarkup = { [key in Framework]?: string };
