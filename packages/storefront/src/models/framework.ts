export type Framework = 'vanilla-js' | 'angular' | 'react' | 'next-js' | 'shared';

export type FrameworkMarkup = { [key in Framework]?: string };
