export const FRAMEWORK_TYPES = ['angular', 'react', 'vue', 'vanilla-js', 'next'] as const;
export type Framework = (typeof FRAMEWORK_TYPES)[number];

export type FrameworkMarkup = { [key in Framework]?: string };

export const frameworkNameMap: Record<Framework, string> = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
  next: 'Next',
};
