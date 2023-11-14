// TODO: The replacement currently doesn't work when there are empty lines between closing brackets, thus we manually replace where this is the case
export const stripFocusAndHoverStyles = (css: string): string =>
  css
    .replace(
      /@media screen and \(-webkit-min-device-pixel-ratio: 0\) and \(min-resolution: 0.001dpcm\) {[\s\S]+?}\n\n/g,
      ''
    )
    .replace(/\n.*(?::focus|hover:hover)[\s\S]+?\n}/g, '');
