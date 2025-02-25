import type { TagName } from '@porsche-design-system/shared';

export const formatTagName = (tagName: TagName) => {
  return tagName
    .replace(/^p-/, '') // Remove the `p-` prefix
    .replace(/-/g, ' ') // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
