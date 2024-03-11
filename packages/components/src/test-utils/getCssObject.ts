export const getCssObject = (cssString: string): object => {
  // useful for debugging
  // const mediaQueriesAndSelectors = Array.from(cssString.matchAll(/(.+) {/g)).map(([, selector]) => selector);
  // console.log(mediaQueriesAndSelectors);

  const jsonCssString = cssString
    // eslint-disable-next-line @typescript-eslint/quotes
    .replace(/"/g, "'") // replace double quotes with single quotes
    .replace(/ *(.+) {/g, '"$1": {') // wrap selectors in double quotes, but without leading spaces
    .replace(/ ([\w-:]+): /g, '"$1": ') // wrap css properties in double quotes, initial space is to skip media query values
    .replace(/: (.+);/g, ': "$1",') // wrap css values in double quotes and convert semi colon to colon
    .replace(/,(\s+})/g, '$1') // remove comma of last value
    .replace(/}(?![^\[{]*[\]}])(?!(\s*$))/g, '},') // add comma after closing bracket if not nested
    .replace(/(?<!\\)\\(?!\\)/g, '\\\\'); // escape single backslashes with another backslash

  const cssObject = JSON.parse(`{${jsonCssString}}`);
  // console.log(cssObject);

  return cssObject;
};
