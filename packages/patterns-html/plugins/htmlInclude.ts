import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

/** Values that can be substituted into a partial via `{{ placeholder }}`. */
export type IncludeProps = Record<string, string | number | boolean>;

export type ExpandIncludesOptions = {
  /** Directory that root-relative include paths (e.g. `_partials/header.html`) are resolved from. */
  rootDir: string;
  /** Absolute path of the file being expanded – used for `./`-relative includes and error messages. */
  filePath: string;
  /** Values inherited from the including file, available as `{{ key }}`. */
  props?: IncludeProps;
  /** Every partial that gets pulled in is collected here, so the dev server knows what to watch. */
  dependencies?: Set<string>;
  /** Internal: the include chain, used for cycle detection. */
  stack?: string[];
};

// <!-- @props { "basePath": "../" } -->
const propsPattern = /[ \t]*<!--\s*@props\s+(\{[\s\S]*?\})\s*-->[ \t]*\n?/g;
// <!-- @include _partials/header.html { "title": "Home" } -->
const includePattern = /([ \t]*)<!--\s*@include\s+([^\s{}]+)\s*(\{[\s\S]*?\})?\s*-->/g;
// {{ title }}
const placeholderPattern = /\{\{\s*([\w-]+)\s*\}\}/g;

const maxDepth = 10;

const parseProps = (raw: string, filePath: string): IncludeProps => {
  try {
    return JSON.parse(raw) as IncludeProps;
  } catch {
    throw new Error(`[html-include] Props must be valid JSON (double quotes!) in "${filePath}":\n  ${raw}`);
  }
};

/** Re-indents an inlined partial so the generated markup stays readable. */
const indentBlock = (block: string, indent: string): string => indent + block.split('\n').join(`\n${indent}`);

/**
 * Replaces every `@include` directive with the referenced partial and substitutes `{{ placeholders }}`.
 * Works purely on strings, so it is shared between the dev server plugin and the build script.
 */
export const expandIncludes = (html: string, options: ExpandIncludesOptions): string => {
  const { rootDir, filePath, props = {}, dependencies, stack = [] } = options;

  if (stack.length >= maxDepth) {
    throw new Error(`[html-include] More than ${maxDepth} nested includes:\n  ${[...stack, filePath].join('\n  ')}`);
  }

  // 1. Collect file level props and strip the directive from the output.
  let localProps: IncludeProps = { ...props };
  const withoutPropsDirective = html.replace(propsPattern, (_match, raw: string) => {
    localProps = { ...localProps, ...parseProps(raw, filePath) };
    return '';
  });

  // 2. Inline every partial, recursively.
  const withPartials = withoutPropsDirective.replace(
    includePattern,
    (_match, indent: string, includePath: string, rawProps?: string) => {
      const resolvedPath = includePath.startsWith('.')
        ? path.resolve(path.dirname(filePath), includePath)
        : path.resolve(rootDir, includePath);

      if ([...stack, filePath].includes(resolvedPath)) {
        throw new Error(`[html-include] Circular include:\n  ${[...stack, filePath, resolvedPath].join('\n  ')}`);
      }
      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`[html-include] Cannot find "${includePath}" referenced in "${filePath}"`);
      }

      dependencies?.add(resolvedPath);

      const partial = expandIncludes(fs.readFileSync(resolvedPath, 'utf8').trim(), {
        rootDir,
        filePath: resolvedPath,
        props: { ...localProps, ...(rawProps ? parseProps(rawProps, filePath) : {}) },
        dependencies,
        stack: [...stack, filePath],
      });

      return indentBlock(partial, indent);
    }
  );

  // 3. Substitute the remaining placeholders of this file.
  return withPartials.replace(placeholderPattern, (match, key: string) => {
    if (key in localProps) {
      return String(localProps[key]);
    }
    console.warn(`[html-include] Unknown placeholder ${match} in "${filePath}" – replaced with an empty string.`);
    return '';
  });
};

/** Dev server counterpart: expands includes on the fly and triggers a full reload when a partial changes. */
export const htmlInclude = (): Plugin => {
  let rootDir = '';
  const partials = new Set<string>();

  const sendFullReload = (server: ViteDevServer): void => server.hot.send({ type: 'full-reload', path: '*' });

  return {
    name: 'html-include',
    enforce: 'pre',
    configResolved(config) {
      rootDir = config.root;
    },
    configureServer(server) {
      // Partials are not part of the module graph, so they need an explicit watcher.
      server.watcher.on('change', (file) => {
        if (partials.has(path.normalize(file))) {
          sendFullReload(server);
        }
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const dependencies = new Set<string>();
        const result = expandIncludes(html, { rootDir, filePath: ctx.filename, dependencies });

        for (const dependency of dependencies) {
          const normalized = path.normalize(dependency);
          if (!partials.has(normalized)) {
            partials.add(normalized);
            ctx.server?.watcher.add(normalized);
          }
        }

        return result;
      },
    },
  };
};
