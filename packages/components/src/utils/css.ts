import { type Breakpoint, getMediaQueryMin } from '@porsche-design-system/emotion';
import { type BreakpointCustomizable, parseJSON } from './breakpoint-customizable';

export const css = (strings: TemplateStringsArray, ...values: (string | number)[]): string =>
  strings
    .reduce((out, str, i) => out + str + (values[i] ?? ''), '')
    .replace(/^[ \t]*\/\*[\s\S]*?\*\/[ \t]*\r?\n/gm, '') // drop comment-only / block-comment lines entirely
    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // drop trailing inline comments
    .replace(/[ \t]+$/gm, ''); // tidy any trailing whitespace left behind

// css`` counterpart to `buildResponsiveStyles` (jss.ts). A string can't be spread into a selector like the JSS object,
// so it returns the `base` value's declarations to inline in `selector { … }` plus one `@media (min-width:…)` block per
// breakpoint.
export const buildResponsiveStylesCss = <T>(
  selector: string,
  rawValue: BreakpointCustomizable<T>,
  getDeclarations: (value: T) => string
): { base: string; mediaQueries: string } => {
  const value = parseJSON(rawValue as any);

  if (typeof value !== 'object') {
    return { base: getDeclarations(value as T), mediaQueries: '' };
  }

  const { base, ...breakpoints } = value as { base: T } & Record<Breakpoint, T>;
  const mediaQueries = Object.entries(breakpoints)
    .map(
      ([breakpoint, breakpointValue]) =>
        `${getMediaQueryMin(breakpoint as any)} {\n  ${selector} {\n    ${getDeclarations(breakpointValue as T)}\n  }\n}`
    )
    .join('\n');

  return { base: getDeclarations(base), mediaQueries };
};
