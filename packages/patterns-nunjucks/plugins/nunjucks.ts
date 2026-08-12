import fs from 'node:fs';
import path from 'node:path';
import type { Environment } from 'nunjucks';
import nunjucks from 'nunjucks';
import type { Plugin } from 'vite';

/** Values available to a template. Anything JSON can express, so loops can iterate over arrays of objects. */
export type TemplateContext = Record<string, unknown>;

export type RenderTemplateOptions = {
  /** Directory that template paths (e.g. `_layouts/base.njk`) are resolved from. */
  rootDir: string;
  /** Absolute path of the file being rendered – used for error messages only. */
  filePath: string;
  /** Values merged on top of `_data.json`. Pages usually declare theirs with `{% set %}` instead. */
  context?: TemplateContext;
  /** Reuse one environment across many files (the build does, the dev server does not). */
  environment?: Environment;
};

const dataFileName = '_data.json';

/** Shared data available to every page, so lists like the main navigation are defined exactly once. */
export const readRootData = (rootDir: string): TemplateContext => {
  const dataPath = path.join(rootDir, dataFileName);
  if (!fs.existsSync(dataPath)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as TemplateContext;
  } catch {
    throw new Error(`[nunjucks] "${dataFileName}" is not valid JSON`);
  }
};

/**
 * The options are the contract of this package, so they are set in exactly one place:
 * - `autoescape` – values are escaped by default; opt out per value with `| safe`.
 * - `throwOnUndefined` – a typo in `{{ tilte }}` fails the build instead of rendering an empty string.
 * - `trimBlocks` / `lstripBlocks` – a `{% … %}` tag on its own line leaves no blank line behind.
 * - `noCache` – the dev server has to see edited partials without a restart.
 */
export const createEnvironment = (rootDir: string): Environment =>
  new nunjucks.Environment(new nunjucks.FileSystemLoader(rootDir, { noCache: true }), {
    autoescape: true,
    throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true,
  });

/**
 * Renders a template source string. Works purely on strings, so it is shared between the dev server
 * plugin and the build script – one implementation, so dev and build cannot drift apart.
 */
export const renderTemplate = (source: string, options: RenderTemplateOptions): string => {
  const { rootDir, filePath, context, environment } = options;
  const scope = { ...readRootData(rootDir), ...context };

  try {
    return (environment ?? createEnvironment(rootDir)).renderString(source, scope);
  } catch (error) {
    throw new Error(
      `[nunjucks] Failed to render "${path.relative(rootDir, filePath)}":\n  ${(error as Error).message}`
    );
  }
};

/** Files and folders starting with an underscore (layouts, partials, data) are inputs only, never pages. */
export const isTemplateInput = (rootDir: string, filePath: string): boolean =>
  path
    .relative(rootDir, filePath)
    .split(path.sep)
    .some((segment) => segment.startsWith('_'));

/** Dev server counterpart: renders templates on the fly and triggers a full reload when an input changes. */
export const nunjucksHtml = (): Plugin => {
  let rootDir = '';

  return {
    name: 'nunjucks-html',
    enforce: 'pre',
    configResolved(config) {
      rootDir = config.root;
    },
    configureServer(server) {
      // Layouts, partials and the data file are not part of the module graph, so they need an explicit watcher.
      // Nunjucks does not report which templates a page pulled in, so everything underscore-prefixed is watched.
      server.watcher.add(path.join(rootDir, '_*'));
      server.watcher.on('change', (file) => {
        if (isTemplateInput(rootDir, file)) {
          server.hot.send({ type: 'full-reload', path: '*' });
        }
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        return renderTemplate(html, { rootDir, filePath: ctx.filename });
      },
    },
  };
};
