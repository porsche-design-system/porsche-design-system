export const transformSelectorToDirectChildSelector = (selector: string): string =>
  selector
    .split(',')
    .map((part) => ':scope>' + part)
    .join();
