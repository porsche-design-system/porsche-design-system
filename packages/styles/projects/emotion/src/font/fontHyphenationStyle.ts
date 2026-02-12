export const fontHyphenationStyle: {
  readonly overflowWrap: 'break-word';
  readonly hyphens: 'auto'; // Fix typing issues in react when 'var(--p-hyphens, auto)' is emitted in d.ts
} = {
  overflowWrap: 'break-word',
  // @ts-ignore
  hyphens: 'var(--p-hyphens, auto)',
} as const;
