/**
 * Splits the provided vanilla JS markup into its HTML and script sections.
 *
 * @param {string} markup - The full HTML string containing markup and a script tag.
 * @returns {{ markup: string; script: string }} An object containing the cleaned HTML markup and the extracted script (Without the <script> tag).
 *
 * @example
 * const code = `
 *   <div>Hello World</div>
 *   <script>
 *     console.log('Hello from script');
 *   </script>
 * `;
 * const { markup, script } = splitVanillaJsCode(code);
 * console.log(markup); // "<div>Hello World</div>"
 * console.log(script); // "console.log('Hello from script');"
 */
export const splitVanillaJsCode = (markup: string): { markup: string; script: string } => {
  const scriptMatch = markup.match(/<script\b[^>]*>[\s\S]*?<\/script>/);
  const script = scriptMatch ? scriptMatch[0] : '';
  const cleanedMarkup = markup.replace(script, '').trim();
  const cleanedScript = script.replace(/\n?<\/?script>\n?/g, '');

  return { markup: cleanedMarkup, script: cleanedScript };
};
