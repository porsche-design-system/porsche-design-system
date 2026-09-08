/**
 * Splits the provided vanilla JS markup into its HTML and script sections.
 *
 * @param {string} markup - The full HTML string containing markup and a script tag.
 * @returns {{ markup: string; script: string; scriptAttributes: string }} An object containing the cleaned HTML markup, the extracted script (Without the <script> tag) and the attributes of that tag (e.g. `type="module"`) so they can be restored when the script is wrapped again.
 *
 * @example
 * const code = `
 *   <div>Hello World</div>
 *   <script type="module">
 *     console.log('Hello from script');
 *   </script>
 * `;
 * const { markup, script, scriptAttributes } = splitVanillaJsCode(code);
 * console.log(markup); // "<div>Hello World</div>"
 * console.log(script); // "console.log('Hello from script');"
 * console.log(scriptAttributes); // 'type="module"'
 */
export const splitVanillaJsCode = (markup: string): { markup: string; script: string; scriptAttributes: string } => {
  const scriptMatch = markup.match(/<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/i);

  return {
    markup: markup.replace(scriptMatch?.[0] ?? '', '').trim(),
    script: (scriptMatch?.[2] ?? '').replace(/^\n/, '').replace(/\n$/, ''),
    scriptAttributes: (scriptMatch?.[1] ?? '').trim(),
  };
};
