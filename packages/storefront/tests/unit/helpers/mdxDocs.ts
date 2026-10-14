import fs from 'node:fs';
import path from 'node:path';
import type { Expression } from 'estree';
import type { Nodes, Root } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { toString as mdastToString } from 'mdast-util-to-string';
import { gfm } from 'micromark-extension-gfm';
import { mdxjs } from 'micromark-extension-mdxjs';
import ts from 'typescript';
import { getHeadingAnchorId } from '@/links';

/**
 * Reads the Storefront's MDX the way it is rendered, without executing it: which fragments a page renders (imported
 * MDX and `*.meta.ts` members such as `<buttonMeta.accessibility.overview />`), which `##` headings and anchors that
 * gives the page, and which links each file contains. Expressions are resolved statically from the TypeScript source
 * of the meta files, e.g. `## {selectMeta.examples.setValue.name}` → `Set Value`.
 */

const srcDir = path.resolve(__dirname, '../../../src');
export const appDir = path.join(srcDir, 'app');
export const publicDir = path.resolve(__dirname, '../../../public');

/** Components that render an `##` heading of their own. */
const COMPONENT_HEADINGS: Record<string, string[]> = {
  A11yIntegrationExamples: ['Integration examples'],
};

export type Location = { file: string; line: number };

export type MdxLink = Location & {
  href: string;
  /** `markdown` for `[text](href)`, else the name of the JSX element with the `href` */
  element: string;
};

export type DocsPage = {
  route: string;
  file: string;
  /** Where a page that only redirects sends its visitors */
  redirect?: string;
  /** The anchors of the page's `##` headings, in order, duplicates included */
  anchors: string[];
  tableOfContents: (Location & { heading: string })[];
  /** The page and every fragment it renders */
  renderedFiles: string[];
};

/** `/…/packages/storefront/src/app/…` → `src/app/…`, for messages. */
export const toRelativePath = (file: string): string => path.relative(path.resolve(srcDir, '..'), file);

/** `src/app/(main)/components/button/usage/page.mdx` → `/components/button/usage`; route groups are no part of the URL. */
const toRoute = (file: string): string =>
  `/${path
    .relative(appDir, path.dirname(file))
    .split(path.sep)
    .filter((segment) => segment && !/^\(.*\)$/.test(segment))
    .join('/')}`;

const resolveModule = (specifier: string, fromFile: string): string | undefined => {
  const base = specifier.startsWith('@/')
    ? path.join(srcDir, specifier.slice(2))
    : specifier.startsWith('.')
      ? path.resolve(path.dirname(fromFile), specifier)
      : undefined;
  return base
    ? ['', '.ts', '.tsx', '.mdx']
        .map((extension) => base + extension)
        .find((file) => fs.statSync(file, { throwIfNoEntry: false })?.isFile())
    : undefined;
};

type Import = { file: string; name: string };

const mdxCache = new Map<string, { tree: Root; imports: Map<string, Import> }>();

const parseMdx = (file: string) => {
  const cached = mdxCache.get(file);
  if (cached) {
    return cached;
  }
  const tree = fromMarkdown(fs.readFileSync(file, 'utf8'), {
    extensions: [mdxjs(), gfm()],
    mdastExtensions: [mdxFromMarkdown(), gfmFromMarkdown()],
  });
  const imports = new Map<string, Import>();
  for (const node of tree.children) {
    if (node.type !== 'mdxjsEsm') {
      continue;
    }
    for (const statement of node.data?.estree?.body ?? []) {
      if (statement.type !== 'ImportDeclaration') {
        continue;
      }
      const target = resolveModule(String(statement.source.value), file);
      for (const specifier of target ? statement.specifiers : []) {
        const name =
          specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier'
            ? specifier.imported.name
            : 'default';
        imports.set(specifier.local.name, { file: target as string, name });
      }
    }
  }
  const parsed = { tree, imports };
  mdxCache.set(file, parsed);
  return parsed;
};

const tsCache = new Map<string, ts.SourceFile>();

const parseTs = (file: string): ts.SourceFile => {
  const cached = tsCache.get(file);
  if (cached) {
    return cached;
  }
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  tsCache.set(file, source);
  return source;
};

/** A statically known value: a string, or the MDX file an identifier was imported from. */
type Value = { string: string } | { file: string };

const unwrap = (node: ts.Expression): ts.Expression =>
  ts.isSatisfiesExpression(node) || ts.isAsExpression(node) || ts.isParenthesizedExpression(node)
    ? unwrap(node.expression)
    : node;

const resolveIdentifier = (source: ts.SourceFile, file: string, identifier: string): Value | undefined => {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    const target = resolveModule(statement.moduleSpecifier.text, file);
    const clause = statement.importClause;
    if (target && clause?.name?.text === identifier) {
      return resolveExport(target, 'default', []);
    }
    const named =
      clause?.namedBindings && ts.isNamedImports(clause.namedBindings)
        ? clause.namedBindings.elements.find((element) => element.name.text === identifier)
        : undefined;
    if (target && named) {
      return resolveExport(target, (named.propertyName ?? named.name).text, []);
    }
  }
  return undefined;
};

/** Follows `exportName.a.b` through the object literals of a TypeScript module. */
function resolveExport(file: string, exportName: string, members: string[]): Value | undefined {
  if (file.endsWith('.mdx')) {
    return exportName === 'default' && members.length === 0 ? { file } : undefined;
  }
  const source = parseTs(file);
  let node: ts.Expression | undefined;
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      const declaration = statement.declarationList.declarations.find(
        (d) => ts.isIdentifier(d.name) && d.name.text === exportName
      );
      node = declaration?.initializer ?? node;
    }
  }
  for (const member of members) {
    const object = node && unwrap(node);
    if (!object || !ts.isObjectLiteralExpression(object)) {
      return undefined;
    }
    const property = object.properties.find((p) => p.name && ts.isIdentifier(p.name) && p.name.text === member);
    node = !property
      ? undefined
      : ts.isPropertyAssignment(property)
        ? property.initializer
        : ts.isShorthandPropertyAssignment(property)
          ? property.name
          : undefined;
  }
  const value = node && unwrap(node);
  if (!value) {
    return undefined;
  }
  if (ts.isStringLiteralLike(value)) {
    return { string: value.text };
  }
  return ts.isIdentifier(value) ? resolveIdentifier(source, file, value.text) : undefined;
}

/** `selectMeta.examples.setValue.name` → its value, read from the module `selectMeta` is imported from. */
const resolveName = (name: string, file: string): Value | undefined => {
  const [root, ...members] = name.split('.');
  const imported = parseMdx(file).imports.get(root);
  return imported && resolveExport(imported.file, imported.name, members);
};

const memberName = (expression: Expression): string | undefined => {
  if (expression.type === 'Identifier') {
    return expression.name;
  }
  if (expression.type === 'MemberExpression' && !expression.computed && expression.property.type === 'Identifier') {
    const object = memberName(expression.object as Expression);
    return object && `${object}.${expression.property.name}`;
  }
  return undefined;
};

const evaluateString = (expression: Expression, file: string): string | undefined => {
  if (expression.type === 'Literal' && typeof expression.value === 'string') {
    return expression.value;
  }
  const name = memberName(expression);
  const value = name ? resolveName(name, file) : undefined;
  return value && 'string' in value ? value.string : undefined;
};

type WithEstree = { data?: { estree?: { body: unknown[] } | null } };

const expressionOf = (node: WithEstree): Expression | undefined => {
  const [statement] = (node.data?.estree?.body ?? []) as { type: string; expression?: Expression }[];
  return statement?.type === 'ExpressionStatement' ? statement.expression : undefined;
};

const lineOf = (node: Nodes): number => node.position?.start.line ?? 0;

const visit = (node: Nodes, callback: (node: Nodes) => void): void => {
  callback(node);
  if ('children' in node) {
    for (const child of node.children) {
      visit(child, callback);
    }
  }
};

/** The links written in an MDX file: Markdown links and `href` attributes with a string value. */
export const getLinks = (file: string): MdxLink[] => {
  const links: MdxLink[] = [];
  visit(parseMdx(file).tree, (node) => {
    if (node.type === 'link' || node.type === 'definition') {
      links.push({ file: toRelativePath(file), line: lineOf(node), href: node.url, element: 'markdown' });
    }
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      for (const attribute of node.attributes) {
        if (attribute.type === 'mdxJsxAttribute' && attribute.name === 'href' && typeof attribute.value === 'string') {
          links.push({
            file: toRelativePath(file),
            line: lineOf(node),
            href: attribute.value,
            element: node.name ?? '',
          });
        }
      }
    }
  });
  return links;
};

const getHeadingText = (node: Nodes & { type: 'heading' }, file: string): string => {
  const [child] = node.children;
  const expression = node.children.length === 1 && child.type === 'mdxTextExpression' ? expressionOf(child) : undefined;
  const text = expression
    ? evaluateString(expression, file)
    : node.children.some((c) => c.type === 'mdxTextExpression')
      ? undefined
      : mdastToString(node);
  if (text === undefined) {
    throw new Error(`Can't resolve the heading at ${toRelativePath(file)}:${lineOf(node)}`);
  }
  return text;
};

const getTableOfContents = (node: Nodes & { attributes: unknown[] }, file: string): string[] => {
  const attribute = (node.attributes as { type: string; name?: string; value?: unknown }[]).find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === 'headings'
  );
  const value = attribute?.value;
  const expression = value && typeof value === 'object' ? expressionOf(value as WithEstree) : undefined;
  const headings =
    expression?.type === 'ArrayExpression'
      ? expression.elements.map((element) =>
          element && element.type !== 'SpreadElement' ? evaluateString(element, file) : undefined
        )
      : [undefined];
  if (headings.includes(undefined)) {
    throw new Error(`Can't resolve the table of contents at ${toRelativePath(file)}:${lineOf(node)}`);
  }
  return headings as string[];
};

/** Collects the headings and the table of contents of an MDX file, following the fragments it renders. */
const render = (file: string, page: DocsPage): void => {
  if (page.renderedFiles.includes(toRelativePath(file))) {
    return;
  }
  page.renderedFiles.push(toRelativePath(file));
  visit(parseMdx(file).tree, (node) => {
    if (node.type === 'heading' && node.depth === 2) {
      page.anchors.push(getHeadingAnchorId(getHeadingText(node, file)));
    }
    if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name) {
      for (const heading of COMPONENT_HEADINGS[node.name] ?? []) {
        page.anchors.push(getHeadingAnchorId(heading));
      }
      if (node.name === 'TableOfContents') {
        for (const heading of getTableOfContents(node, file)) {
          page.tableOfContents.push({ file: toRelativePath(file), line: lineOf(node), heading });
        }
      }
      const fragment = resolveName(node.name, file);
      if (fragment && 'file' in fragment) {
        render(fragment.file, page);
      }
    }
  });
};

const toPage = (file: string): DocsPage => {
  const page: DocsPage = {
    route: toRoute(file),
    file: toRelativePath(file),
    anchors: [],
    tableOfContents: [],
    renderedFiles: [],
  };
  if (file.endsWith('.tsx')) {
    page.redirect = fs.readFileSync(file, 'utf8').match(/\bredirect\(\s*['"`]([^'"`$]+)['"`]\s*\)/)?.[1];
  } else {
    render(file, page);
  }
  return page;
};

const findFiles = (predicate: (name: string) => boolean): string[] =>
  fs
    .readdirSync(appDir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && predicate(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();

/** Every page in `src/app`, with what it renders. */
export const getDocsPages = (): DocsPage[] => findFiles((name) => /^page\.(mdx|tsx)$/.test(name)).map(toPage);

/** Every MDX file in `src/app`, pages and the fragments they render alike. */
export const getMdxFiles = (): string[] => findFiles((name) => name.endsWith('.mdx'));
