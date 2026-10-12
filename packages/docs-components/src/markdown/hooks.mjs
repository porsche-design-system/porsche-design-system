import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';

/**
 * Node module hook: compiles `.mdx` against the Markdown JSX runtime, with the same remark plugins the Storefront uses
 * (`next.config.ts`), and marks the result as MDX content so composed MDX renders like any other part of the page.
 * The development runtime passes each element's position, so a build error names the line in the MDX file.
 */

const MARK_MDX_CONTENT = "\nMDXContent[Symbol.for('@porsche-design-system/docs-components/mdx-content')] = true;\n";

export async function load(url, context, nextLoad) {
  if (!url.startsWith('file:') || !new URL(url).pathname.endsWith('.mdx')) {
    return nextLoad(url, context);
  }
  const filePath = fileURLToPath(url);
  const compiled = await compile(
    { value: await readFile(filePath, 'utf8'), path: filePath },
    {
      development: true,
      jsxImportSource: '@porsche-design-system/docs-components/markdown',
      remarkPlugins: [remarkGfm],
    }
  );
  return { format: 'module', source: `${String(compiled)}${MARK_MDX_CONTENT}`, shortCircuit: true };
}
