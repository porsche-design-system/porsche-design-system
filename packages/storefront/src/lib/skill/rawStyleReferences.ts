import type { Framework } from './support/skillTree';

/** Every wrapper ships a real copy of the generated Tailwind stylesheet. */
export const rawTailwindcssReference = (): string => '../tailwindcss/index.css';

/** Only the js wrapper ships the real SCSS partials; framework wrappers expose re-export shims. */
export const rawScssReference = (framework: Framework): string =>
  framework === 'js' ? '../scss' : '@porsche-design-system/components-js/scss';
