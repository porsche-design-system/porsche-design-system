import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';

/** Values available to a template. Anything JSON can express, so loops can iterate over arrays of objects. */
export type IncludeProps = Record<string, unknown>;

export type ExpandIncludesOptions = {
  /** Directory that root-relative include paths (e.g. `_partials/header.html`) are resolved from. */
  rootDir: string;
  /** Absolute path of the file being expanded – used for `./`-relative includes and error messages. */
  filePath: string;
  /** Scope inherited from the including file. Omit at top level to start from `_data.json`. */
  props?: IncludeProps;
  /** Every partial and data file pulled in is collected here, so the dev server knows what to watch. */
  dependencies?: Set<string>;
  /** Internal: the include chain, used for cycle detection. */
  stack?: string[];
};

type TextNode = { type: 'text'; value: string };
type IfNode = { type: 'if'; test: string; consequent: TemplateNode[]; alternate: TemplateNode[] };
type EachNode = { type: 'each'; itemName: string; listPath: string; body: TemplateNode[] };
type TemplateNode = TextNode | IfNode | EachNode;

type RenderContext = {
  rootDir: string;
  filePath: string;
  scope: IncludeProps;
  dependencies?: Set<string>;
  stack: string[];
};

// <!-- @props { "basePath": "../" } -->
const propsPattern = /[ \t]*<!--\s*@props\s+(\{[\s\S]*?})\s*-->[ \t]*\n?/g;
// <!-- @include _partials/header.html { "title": "Home" } -->
const includePattern = /([ \t]*)<!--\s*@include\s+([^\s{}]+)\s*(\{[\s\S]*?})?\s*-->/g;
// <!-- @if … --> <!-- @else --> <!-- @endif --> <!-- @each item in items --> <!-- @endeach -->
const blockPattern = /[ \t]*<!--\s*@(endeach|endif|each|else|if)\b([\s\S]*?)-->[ \t]*\n?/g;
// {{ item.label }}
const placeholderPattern = /\{\{\s*([\w.-]+)\s*}}/g;
// "text" | 42 | true | false | null
const literalPattern = /^(?:"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true|false|null)$/;
const eachPattern = /^\s*([A-Za-z_][\w-]*)\s+in\s+([\w.-]+)\s*$/;
const comparisonPattern = /^(.+?)\s*(===?|!==?)\s*(.+)$/;

const maxDepth = 10;
const dataFileName = '_data.json';

const parseProps = (raw: string, filePath: string): IncludeProps => {
  try {
    return JSON.parse(raw) as IncludeProps;
  } catch {
    throw new Error(`[html-include] Props must be valid JSON (double quotes!) in "${filePath}":\n  ${raw}`);
  }
};

/** Shared data available to every page, so lists like the main navigation are defined exactly once. */
const readRootData = (rootDir: string, dependencies?: Set<string>): IncludeProps => {
  const dataPath = path.join(rootDir, dataFileName);
  if (!fs.existsSync(dataPath)) {
    return {};
  }
  dependencies?.add(dataPath);
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as IncludeProps;
  } catch {
    throw new Error(`[html-include] "${dataFileName}" is not valid JSON`);
  }
};

/** Resolves a dotted path such as `item.label` against the current scope. */
const resolvePath = (expression: string, scope: IncludeProps): unknown =>
  expression.split('.').reduce<unknown>((value, key) => {
    if (value === null || value === undefined) {
      return undefined;
    }
    return (value as Record<string, unknown>)[key];
  }, scope);

/** Empty arrays count as falsy, everything else follows JavaScript truthiness. */
const isTruthy = (value: unknown): boolean => (Array.isArray(value) ? value.length > 0 : Boolean(value));

const resolveOperand = (token: string, scope: IncludeProps): unknown =>
  literalPattern.test(token) ? JSON.parse(token) : resolvePath(token, scope);

/**
 * Supports `key`, `!key`, `a == b` and `a != b`, where each side is either a dotted path or a JSON literal.
 * Deliberately not a general expression language – anything more complex belongs in the data file.
 */
const evaluateCondition = (expression: string, scope: IncludeProps, filePath: string): boolean => {
  const test = expression.trim();
  if (!test) {
    throw new Error(`[html-include] Empty @if condition in "${filePath}"`);
  }

  const comparison = comparisonPattern.exec(test);
  if (comparison) {
    const [, left, operator, right] = comparison;
    const isEqual = resolveOperand(left.trim(), scope) === resolveOperand(right.trim(), scope);
    return operator.startsWith('!') ? !isEqual : isEqual;
  }

  if (test.startsWith('!')) {
    return !isTruthy(resolvePath(test.slice(1).trim(), scope));
  }
  return isTruthy(resolvePath(test, scope));
};

/**
 * Turns the block directives into a node tree. A tree is required because `@if` and `@each` nest,
 * which a flat regex replacement cannot express correctly.
 */
const parseBlocks = (html: string, filePath: string): TemplateNode[] => {
  const root: TemplateNode[] = [];
  const open: (IfNode | EachNode)[] = [];
  const branches = new Map<IfNode, 'consequent' | 'alternate'>();

  const target = (): TemplateNode[] => {
    const node = open[open.length - 1];
    if (!node) {
      return root;
    }
    if (node.type === 'each') {
      return node.body;
    }
    return branches.get(node) === 'alternate' ? node.alternate : node.consequent;
  };

  let cursor = 0;
  blockPattern.lastIndex = 0;
  let match = blockPattern.exec(html);

  while (match !== null) {
    const [raw, keyword, rest] = match;
    const text = html.slice(cursor, match.index);
    if (text) {
      target().push({ type: 'text', value: text });
    }
    cursor = match.index + raw.length;

    if (keyword === 'if') {
      const node: IfNode = { type: 'if', test: rest, consequent: [], alternate: [] };
      target().push(node);
      open.push(node);
      branches.set(node, 'consequent');
    } else if (keyword === 'else') {
      const node = open[open.length - 1];
      if (node?.type !== 'if') {
        throw new Error(`[html-include] @else without matching @if in "${filePath}"`);
      }
      branches.set(node, 'alternate');
    } else if (keyword === 'endif') {
      const node = open.pop();
      if (node?.type !== 'if') {
        throw new Error(`[html-include] @endif without matching @if in "${filePath}"`);
      }
    } else if (keyword === 'each') {
      const parsed = eachPattern.exec(rest);
      if (!parsed) {
        throw new Error(
          `[html-include] Invalid @each in "${filePath}": expected "@each item in items", got "${rest.trim()}"`
        );
      }
      const node: EachNode = { type: 'each', itemName: parsed[1], listPath: parsed[2], body: [] };
      target().push(node);
      open.push(node);
    } else {
      const node = open.pop();
      if (node?.type !== 'each') {
        throw new Error(`[html-include] @endeach without matching @each in "${filePath}"`);
      }
    }

    match = blockPattern.exec(html);
  }

  const tail = html.slice(cursor);
  if (tail) {
    target().push({ type: 'text', value: tail });
  }

  const unclosed = open[open.length - 1];
  if (unclosed) {
    throw new Error(`[html-include] Unclosed @${unclosed.type} in "${filePath}"`);
  }

  return root;
};

const substitutePlaceholders = (html: string, context: RenderContext): string =>
  html.replace(placeholderPattern, (match, key: string) => {
    const value = resolvePath(key, context.scope);

    if (value === undefined) {
      console.warn(
        `[html-include] Unknown placeholder ${match} in "${context.filePath}" – replaced with an empty string.`
      );
      return '';
    }
    if (value === null) {
      return '';
    }
    if (typeof value === 'object') {
      throw new Error(
        `[html-include] Placeholder ${match} in "${context.filePath}" resolves to an object. Use a loop or a concrete property.`
      );
    }
    return String(value);
  });

/** Re-indents an inlined partial so the generated markup stays readable. */
const indentBlock = (block: string, indent: string): string => indent + block.split('\n').join(`\n${indent}`);

const expandIncludeDirectives = (html: string, context: RenderContext): string =>
  html.replace(includePattern, (_match, indent: string, includePath: string, rawProps?: string) => {
    const resolvedPath = includePath.startsWith('.')
      ? path.resolve(path.dirname(context.filePath), includePath)
      : path.resolve(context.rootDir, includePath);

    if ([...context.stack, context.filePath].includes(resolvedPath)) {
      throw new Error(
        `[html-include] Circular include:\n  ${[...context.stack, context.filePath, resolvedPath].join('\n  ')}`
      );
    }
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`[html-include] Cannot find "${includePath}" referenced in "${context.filePath}"`);
    }

    context.dependencies?.add(resolvedPath);

    const partial = expandIncludes(fs.readFileSync(resolvedPath, 'utf8').trim(), {
      rootDir: context.rootDir,
      filePath: resolvedPath,
      props: { ...context.scope, ...(rawProps ? parseProps(rawProps, context.filePath) : {}) },
      dependencies: context.dependencies,
      stack: [...context.stack, context.filePath],
    });

    return indentBlock(partial, indent);
  });

const renderNodes = (nodes: TemplateNode[], context: RenderContext): string =>
  nodes.map((node) => renderNode(node, context)).join('');

const renderNode = (node: TemplateNode, context: RenderContext): string => {
  if (node.type === 'text') {
    // Includes are expanded per render pass, so a partial inside a loop sees the scope of its iteration.
    return substitutePlaceholders(expandIncludeDirectives(node.value, context), context);
  }

  if (node.type === 'if') {
    const branch = evaluateCondition(node.test, context.scope, context.filePath) ? node.consequent : node.alternate;
    return renderNodes(branch, context);
  }

  const list = resolvePath(node.listPath, context.scope);
  if (!Array.isArray(list)) {
    throw new Error(
      `[html-include] @each expects an array at "${node.listPath}" in "${context.filePath}", got ${JSON.stringify(list)}`
    );
  }

  return list
    .map((item, index) =>
      renderNodes(node.body, {
        ...context,
        scope: {
          ...context.scope,
          [node.itemName]: item,
          // `loop` is reserved inside @each blocks.
          loop: {
            index,
            number: index + 1,
            first: index === 0,
            last: index === list.length - 1,
            length: list.length,
          },
        },
      })
    )
    .join('');
};

/**
 * Expands `@props`, `@include`, `@if`/`@else`, `@each` and `{{ placeholders }}`.
 * Works purely on strings, so it is shared between the dev server plugin and the build script.
 */
export const expandIncludes = (html: string, options: ExpandIncludesOptions): string => {
  const { rootDir, filePath, props, dependencies, stack = [] } = options;

  if (stack.length >= maxDepth) {
    throw new Error(`[html-include] More than ${maxDepth} nested includes:\n  ${[...stack, filePath].join('\n  ')}`);
  }

  // Pages start from the shared data file, partials inherit the scope of their caller.
  let scope: IncludeProps = { ...(props ?? readRootData(rootDir, dependencies)) };

  const withoutPropsDirective = html.replace(propsPattern, (_match, raw: string) => {
    scope = { ...scope, ...parseProps(raw, filePath) };
    return '';
  });

  return renderNodes(parseBlocks(withoutPropsDirective, filePath), {
    rootDir,
    filePath,
    scope,
    dependencies,
    stack,
  });
};

/** Dev server counterpart: expands templates on the fly and triggers a full reload when an input changes. */
export const htmlInclude = (): Plugin => {
  let rootDir = '';
  const watched = new Set<string>();

  const sendFullReload = (server: ViteDevServer): void => server.hot.send({ type: 'full-reload', path: '*' });

  return {
    name: 'html-include',
    enforce: 'pre',
    configResolved(config) {
      rootDir = config.root;
    },
    configureServer(server) {
      // Partials and the data file are not part of the module graph, so they need an explicit watcher.
      server.watcher.on('change', (file) => {
        if (watched.has(path.normalize(file))) {
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
          if (!watched.has(normalized)) {
            watched.add(normalized);
            ctx.server?.watcher.add(normalized);
          }
        }

        return result;
      },
    },
  };
};
