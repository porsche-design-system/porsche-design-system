import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { compile } from '@mdx-js/mdx';
import { remarkPlugins } from '../mdx-options.mjs';

/**
 * Node module hooks for the Markdown build:
 *
 * - `resolve`: a component folder (`Notification/index.ts`) resolves to the Markdown implementation next to its React
 *   one (`Notification/Notification.markdown.ts`). MDX imports components as the Storefront does, from their folder in
 *   `components/mdx/`, and gets the implementation for the target it is rendered for. A folder there without a Markdown
 *   implementation resolves to a stub of the same name, which fails the build as unregistered where MDX uses it – so
 *   neither the React implementation nor the wrapper it imports is ever loaded.
 * - `load`: compiles `.mdx` against the Markdown JSX runtime, with the remark plugins the Storefront uses too
 *   (`mdx-options.mjs`), and marks the result as MDX content so composed MDX renders like any other part of the page.
 *   The development runtime passes each element's position, so a build error names the line in the MDX file.
 */

const MARK_MDX_CONTENT = "\nMDXContent[Symbol.for('@porsche-design-system/docs-components/mdx-content')] = true;\n";

/** `…/Notification/index.ts` → `Notification`; the folder of a component, named like it. */
const COMPONENT_INDEX = /\/([A-Z][A-Za-z0-9]*)\/index\.tsx?$/;
/** Where the components MDX imports live; a folder elsewhere without a Markdown implementation is left alone. */
const MDX_COMPONENTS_DIR = '/components/mdx/';
const UNREGISTERED = 'docs-components:unregistered/';

const remarkPluginFunctions = await Promise.all(remarkPlugins.map(async (name) => (await import(name)).default));

export async function resolve(specifier, context, nextResolve) {
  const resolved = await nextResolve(specifier, context);
  if (!resolved.url.startsWith('file:')) {
    return resolved;
  }
  const file = fileURLToPath(resolved.url);
  const name = file.split(path.sep).join('/').match(COMPONENT_INDEX)?.[1];
  if (!name) {
    return resolved;
  }
  const markdown = path.join(path.dirname(file), `${name}.markdown.ts`);
  if (existsSync(markdown)) {
    return { url: pathToFileURL(markdown).href, shortCircuit: true };
  }
  return file.split(path.sep).join('/').includes(MDX_COMPONENTS_DIR)
    ? { url: `${UNREGISTERED}${name}`, shortCircuit: true }
    : resolved;
}

export async function load(url, context, nextLoad) {
  if (url.startsWith(UNREGISTERED)) {
    const name = url.slice(UNREGISTERED.length);
    return {
      format: 'module',
      source: `export const ${name} = Object.defineProperty(() => null, 'name', { value: '${name}' });`,
      shortCircuit: true,
    };
  }
  if (!url.startsWith('file:') || !new URL(url).pathname.endsWith('.mdx')) {
    return nextLoad(url, context);
  }
  const filePath = fileURLToPath(url);
  const compiled = await compile(
    { value: await readFile(filePath, 'utf8'), path: filePath },
    {
      development: true,
      jsxImportSource: '@porsche-design-system/docs-components/markdown',
      remarkPlugins: remarkPluginFunctions,
    }
  );
  return { format: 'module', source: `${String(compiled)}${MARK_MDX_CONTENT}`, shortCircuit: true };
}
