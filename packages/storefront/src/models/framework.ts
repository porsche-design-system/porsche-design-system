export const FRAMEWORK_TYPES = ['angular', 'react', 'vue', 'vanilla-js', 'next'] as const;
export type Framework = (typeof FRAMEWORK_TYPES)[number];

export type FrameworkMarkup = { [key in Framework]?: string };
export type FrameworkConfiguratorMarkup = {
  [key in Exclude<Framework, 'next'>]: {
    imports?: string;
    states: string | undefined; // Can be useState, ref or const
    eventHandlers: string | undefined; // Can be functions or eventListeners
    markup: string | undefined; // The actual markup
  };
};

export const frameworkNameMap: Record<Framework, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
  next: 'Next',
};
