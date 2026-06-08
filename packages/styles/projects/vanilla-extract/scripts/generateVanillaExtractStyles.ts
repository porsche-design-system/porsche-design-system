/**
 * generateVanillaExtractStyles.ts
 *
 * Reads every *.meta.ts file under src/ and generates a standalone TypeScript file
 * for each style entry, plus barrel index.ts files.
 *
 * Each meta file exports `xxxMeta` / `deprecatedXxxMeta` objects whose leaf nodes
 * have the shape: { name: string, value: any, description: string }.
 * Entries may be grouped in nested objects (e.g. `fluid: { spacingFluidXs: {...} }`).
 *
 * For each leaf entry the script writes:
 *   generated/{group?}/{name}.ts  — re-exports entry.value with a JSDoc comment
 *   generated/index.ts            — barrel file that re-exports everything
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');

type Entry = {
  name: string; // export name, e.g. 'spacingFluidXs'
  valueNode: ts.Node; // AST node of the value expression in the meta file
  description: string;
  group?: string; // optional subdir group, e.g. 'fluid' → generated/fluid/
  deprecated: boolean;
  handWritten?: boolean; // true when a hand-written fallback file exists; the generator skips these
};

// For each locally-named import: which module it came from and what it's called
// in that module. Needed for aliased imports like `colorCanvas as _colorCanvas`,
// where localName='_colorCanvas' and exportedAs='colorCanvas'.
type Import = {
  module: string;
  exportedAs: string; // same as localName unless the import was aliased
};

type ParsedMetaFile = {
  source: ts.SourceFile;
  dir: string; // directory of the meta file
  imports: Map<string, Import>; // localName → Import
  localObjects: Map<string, ts.ObjectLiteralExpression>; // top-level const objects
  inlinableScalars: Map<string, ts.Expression>; // local scalar const name → its value expression
  entryDirs: Map<string, string>; // entry name → its output dir (for cross-entry imports)
  regular: Entry[];
  deprecated: Entry[];
};

function findMetaFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findMetaFiles(fullPath));
    else if (entry.name.endsWith('.meta.ts')) results.push(fullPath);
  }
  return results;
}

/** Returns the ObjectLiteralExpression even if wrapped in `... as const`. */
function asObjectLiteral(node: ts.Expression): ts.ObjectLiteralExpression | undefined {
  if (ts.isObjectLiteralExpression(node)) return node;
  if (ts.isAsExpression(node) && ts.isObjectLiteralExpression(node.expression)) return node.expression;
  return undefined;
}

/** Returns the string value of a `key: 'literal'` property, or undefined. */
function getStringProperty(obj: ts.ObjectLiteralExpression, key: string): string | undefined {
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === key) {
      if (ts.isStringLiteral(prop.initializer)) return prop.initializer.text;
    }
  }
  return undefined;
}

/** Returns the boolean value of a `key: true` / `key: false` property, or undefined. */
function getBooleanProperty(obj: ts.ObjectLiteralExpression, key: string): boolean | undefined {
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === key) {
      if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) return true;
      if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) return false;
    }
  }
  return undefined;
}

/** A leaf entry has a `name: 'string'` property; a non-leaf is a nested group. */
function isLeafEntry(obj: ts.ObjectLiteralExpression): boolean {
  return getStringProperty(obj, 'name') !== undefined;
}

/** Gets the AST node of the `value` property from a leaf entry object. */
function getValueNode(obj: ts.ObjectLiteralExpression): ts.Node | undefined {
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'value') {
      return prop.initializer;
    }
  }
  return undefined;
}

/** Reads the raw source text of any AST node. */
function nodeText(node: ts.Node, source: ts.SourceFile): string {
  return source.text.slice(node.getStart(source), node.getEnd());
}

function buildImportMap(source: ts.SourceFile): Map<string, Import> {
  const imports = new Map<string, Import>();
  ts.forEachChild(source, (node) => {
    if (!ts.isImportDeclaration(node)) return;
    const module = (node.moduleSpecifier as ts.StringLiteral).text;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const spec of bindings.elements) {
        const localName = spec.name.text;
        const exportedAs = (spec.propertyName ?? spec.name).text;
        imports.set(localName, { module, exportedAs });
      }
    }
  });
  return imports;
}

function buildLocalObjectMap(source: ts.SourceFile): Map<string, ts.ObjectLiteralExpression> {
  const objects = new Map<string, ts.ObjectLiteralExpression>();
  ts.forEachChild(source, (node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const obj = asObjectLiteral(decl.initializer as ts.Expression);
      if (obj) objects.set(decl.name.text, obj);
    }
  });
  return objects;
}

/**
 * Collects local scalar consts whose values can be safely inlined into generated
 * files. Example: `const gridGap = spacingFluidMd` → 'gridGap' → 'spacingFluidMd'.
 * These are needed because value expressions may reference local names that won't
 * exist in the output file's scope.
 */
function buildInlinableScalars(
  source: ts.SourceFile,
  imports: Map<string, Import>,
  localObjects: Map<string, ts.ObjectLiteralExpression>
): Map<string, ts.Expression> {
  const scalars = new Map<string, ts.Expression>();
  ts.forEachChild(source, (node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const name = decl.name.text;
      if (imports.has(name) || localObjects.has(name)) continue; // already tracked elsewhere
      const init = decl.initializer as ts.Expression;
      if (ts.isArrowFunction(init) || ts.isFunctionExpression(init) || asObjectLiteral(init)) continue;
      if (isSimpleExpression(init, imports)) {
        scalars.set(name, init);
      }
    }
  });
  return scalars;
}

/**
 * Returns true if an expression resolves entirely to string/number literals and
 * imported identifiers. Used to decide if a local const is safe to inline.
 */
function isSimpleExpression(node: ts.Expression, imports: Map<string, Import>): boolean {
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return true;
  if (ts.isIdentifier(node)) return imports.has(node.text);
  if (ts.isAsExpression(node)) return isSimpleExpression(node.expression, imports);
  if (ts.isTemplateExpression(node)) {
    return node.templateSpans.every((span) => isSimpleExpression(span.expression as ts.Expression, imports));
  }
  return false;
}

// ─── Extracting entries from *Meta exports ────────────────────────────────────

/**
 * Walks a meta object and returns all leaf entries, recursing into nested groups.
 * Entry objects are either inline `{ name, value, description }` or a reference
 * to a top-level const (e.g. `motionDurationShort: deprecatedMotionDurationShortMeta`).
 */
function extractEntries(
  metaObj: ts.ObjectLiteralExpression,
  localObjects: Map<string, ts.ObjectLiteralExpression>,
  source: ts.SourceFile,
  inlinableScalars: Map<string, ts.Expression>,
  deprecated: boolean,
  group?: string
): Entry[] {
  const entries: Entry[] = [];
  for (const prop of metaObj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;

    // Resolve the entry: may be an inline object literal or a reference to a local const.
    let entryObj = asObjectLiteral(prop.initializer);
    if (!entryObj && ts.isIdentifier(prop.initializer)) {
      entryObj = localObjects.get(prop.initializer.text);
    }
    if (!entryObj) continue;

    if (isLeafEntry(entryObj)) {
      const name = getStringProperty(entryObj, 'name')!;
      const description = resolveDescription(entryObj, source, inlinableScalars) ?? '';
      const valueNode = getValueNode(entryObj);
      const handWritten = getBooleanProperty(entryObj, 'handWritten');
      if (valueNode) entries.push({ name, valueNode, description, group, deprecated, handWritten });
    } else {
      // Nested group — recurse with the property key as the group name.
      const groupKey = ts.isIdentifier(prop.name) ? prop.name.text : undefined;
      if (groupKey) {
        entries.push(...extractEntries(entryObj, localObjects, source, inlinableScalars, deprecated, groupKey));
      }
    }
  }
  return entries;
}

/**
 * Resolves the `description` property of a leaf entry to a plain string.
 * Handles template literals that reference local scalar consts.
 */
function resolveDescription(
  obj: ts.ObjectLiteralExpression,
  source: ts.SourceFile,
  inlinableScalars: Map<string, ts.Expression>
): string | undefined {
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name) || prop.name.text !== 'description') continue;
    const init = prop.initializer;
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return init.text;
    if (ts.isTemplateExpression(init)) {
      let text = init.head.text;
      for (const span of init.templateSpans) {
        text += describeTemplateSpanExpression(span.expression, source, inlinableScalars) + span.literal.text;
      }
      return text;
    }
  }
  return undefined;
}

/** Resolves a `${...}` placeholder in a description template to plain text, unwrapping inlinable scalar references. */
function describeTemplateSpanExpression(
  expr: ts.Expression,
  source: ts.SourceFile,
  inlinableScalars: Map<string, ts.Expression>
): string {
  if (!ts.isIdentifier(expr)) return `\${...}`;
  const scalar = inlinableScalars.get(expr.text);
  if (!scalar) return `\${${expr.text}}`;
  // Plain string scalars (e.g. `const mdLink = '...'`) inline as their decoded text content.
  return ts.isStringLiteral(scalar) || ts.isNoSubstitutionTemplateLiteral(scalar)
    ? scalar.text
    : nodeText(scalar, source);
}

/** Finds all exported *Meta variables and returns their entries split by deprecated flag. */
function collectAllEntries(
  source: ts.SourceFile,
  localObjects: Map<string, ts.ObjectLiteralExpression>,
  inlinableScalars: Map<string, ts.Expression>
): { regular: Entry[]; deprecated: Entry[] } {
  const regular: Entry[] = [];
  const deprecated: Entry[] = [];
  ts.forEachChild(source, (node) => {
    if (!ts.isVariableStatement(node)) return;
    if (!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.name.text.endsWith('Meta')) continue;
      const metaObj = decl.initializer ? asObjectLiteral(decl.initializer as ts.Expression) : undefined;
      if (!metaObj) continue;
      const isDeprecated = /^deprecated/i.test(decl.name.text);
      const entries = extractEntries(metaObj, localObjects, source, inlinableScalars, isDeprecated);
      (isDeprecated ? deprecated : regular).push(...entries);
    }
  });
  return { regular, deprecated };
}

/** Converts camelCase group key to a kebab-case directory name: 'lightDark' → 'light-dark'. */
function toKebabDir(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function getOutputDir(categoryDir: string, entry: Entry): string {
  const generatedDir = path.join(categoryDir, 'generated');
  if (entry.deprecated) return path.join(generatedDir, 'deprecated');
  return entry.group ? path.join(generatedDir, toKebabDir(entry.group)) : generatedDir;
}

/** True for identifier nodes that are *references* — not property names, declaration names, or import specifier names. */
function isReferenceIdentifier(node: ts.Identifier): boolean {
  const parent = node.parent;
  return !(
    (ts.isPropertyAssignment(parent) && parent.name === node) ||
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isVariableDeclaration(parent) && parent.name === node) ||
    (ts.isImportSpecifier(parent) && (parent.name === node || parent.propertyName === node))
  );
}

/** Collects all identifier nodes used as *references* within an expression, skipping type positions. */
function collectReferenceIdentifierNodes(node: ts.Node): ts.Identifier[] {
  const result: ts.Identifier[] = [];
  const walk = (n: ts.Node) => {
    if (ts.isTypeNode(n)) return;
    if (ts.isIdentifier(n) && isReferenceIdentifier(n)) result.push(n);
    ts.forEachChild(n, walk);
  };
  walk(node);
  return result;
}

/**
 * Renders the source text for a value expression with references to local scalar consts
 * replaced by their literal source — they won't exist in the output file's scope, e.g.
 * `gridGap` (-> `const gridGap = spacingFluidMd`) becomes `spacingFluidMd` in the output.
 *
 * Also returns every token import the rendered text ends up depending on, whether
 * referenced directly in the value or pulled in through an inlined scalar's own expression.
 */
function renderValueText(valueNode: ts.Node, parsed: ParsedMetaFile): { text: string; neededImports: Set<string> } {
  const neededImports = new Set<string>();
  const replacements: { start: number; end: number; text: string }[] = [];

  for (const node of collectReferenceIdentifierNodes(valueNode)) {
    const scalar = parsed.inlinableScalars.get(node.text);
    if (scalar) {
      replacements.push({
        start: node.getStart(parsed.source),
        end: node.getEnd(),
        text: nodeText(scalar, parsed.source),
      });
      for (const id of collectReferenceIdentifierNodes(scalar)) {
        if (parsed.imports.has(id.text)) neededImports.add(id.text);
      }
    } else if (parsed.imports.has(node.text)) {
      neededImports.add(node.text);
    }
  }

  const valueStart = valueNode.getStart(parsed.source);
  let text = nodeText(valueNode, parsed.source);
  for (const { start, end, text: replacementText } of replacements.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, start - valueStart) + replacementText + text.slice(end - valueStart);
  }
  return { text, neededImports };
}

/** Strips TypeScript type assertions, but keeps `as const` (meaningful in output). */
function stripTypeAssertions(node: ts.Node): ts.Node {
  if (ts.isAsExpression(node)) {
    const isConstAssertion =
      ts.isTypeReferenceNode(node.type) && ts.isIdentifier(node.type.typeName) && node.type.typeName.text === 'const';
    return isConstAssertion ? node : stripTypeAssertions(node.expression);
  }
  if (ts.isTypeAssertionExpression(node)) return stripTypeAssertions(node.expression);
  return node;
}

/** Adjusts a relative import path so it's valid from outputDir instead of metaDir. */
function adjustImportPath(importPath: string, metaDir: string, outputDir: string): string {
  if (!importPath.startsWith('.')) return importPath; // package imports are not relative
  const resolved = path.resolve(metaDir, importPath);
  const rel = path.relative(outputDir, resolved);
  if (rel === '') return '.';
  return rel.startsWith('.') ? rel : `./${rel}`;
}

/**
 * Generates the TypeScript source for a single entry file.
 * Returns null when the meta entry is declared `handWritten: true` — a hand-written
 * fallback file already exists at the target location and is wired up manually.
 */
function generateEntryFile(entry: Entry, parsed: ParsedMetaFile): string | null {
  if (entry.handWritten) return null;

  const outputDir = getOutputDir(parsed.dir, entry);

  // If the value is a reference to a same-named local object const, expand it inline
  // so the generated file contains the full object, not just the identifier.
  let valueNode = entry.valueNode;
  if (ts.isIdentifier(valueNode) && valueNode.text === entry.name && parsed.localObjects.has(valueNode.text)) {
    valueNode = parsed.localObjects.get(valueNode.text)!;
  }
  valueNode = stripTypeAssertions(valueNode);

  const referencedNames = collectReferenceIdentifierNodes(valueNode).map((n) => n.text);

  // Render the value, inlining local scalars, and learn which token imports it now needs
  // (directly, or via an inlined scalar's own expression).
  let { text: valueText, neededImports } = renderValueText(valueNode, parsed);

  // If the value is just the same-named imported identifier, we must alias the import
  // to avoid a name collision: `export const spacingFluidXs = _spacingFluidXs`.
  if (ts.isIdentifier(valueNode) && valueNode.text === entry.name && parsed.imports.has(valueNode.text)) {
    valueText = `_${entry.name}`;
  }

  // Group needed imports by module.
  const importsByModule = new Map<string, string[]>();

  for (const localName of [...neededImports].sort()) {
    const info = parsed.imports.get(localName)!;
    const adjusted = adjustImportPath(info.module, parsed.dir, outputDir);
    const bucket = importsByModule.get(adjusted) ?? [];
    bucket.push(localName);
    importsByModule.set(adjusted, bucket);
  }

  // Local object consts referenced by name become imports from their sibling generated files.
  for (const localName of new Set(referencedNames.filter((name) => parsed.localObjects.has(name)))) {
    const siblingDir = parsed.entryDirs.get(localName);
    if (!siblingDir) continue;
    const rel = path.relative(outputDir, path.join(siblingDir, localName));
    const mod = rel.startsWith('.') ? rel : `./${rel}`;
    const bucket = importsByModule.get(mod) ?? [];
    bucket.push(localName);
    importsByModule.set(mod, bucket);
  }

  // Build import lines.
  const importLines = [...importsByModule.entries()]
    .map(([module, names]) => {
      const specifiers = names
        .sort()
        .map((localName) => {
          if (localName === entry.name) return `${localName} as _${localName}`; // avoid name collision
          const info = parsed.imports.get(localName);
          return info && info.exportedAs !== localName ? `${info.exportedAs} as ${localName}` : localName;
        })
        .join(', ');
      return `import { ${specifiers} } from '${module}';`;
    })
    .join('\n');

  const jsdoc = entry.deprecated
    ? `/** @deprecated ${entry.description.replace(/^deprecated\s+/i, '')} */`
    : `/** ${entry.description} */`;

  const parts: string[] = [];
  if (importLines) parts.push(importLines, '');
  parts.push(jsdoc, `export const ${entry.name} = ${valueText};`, '');
  return parts.join('\n');
}

function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function writeEntries(entries: Entry[], parsed: ParsedMetaFile): Set<string> {
  const written = new Map<string, { filePath: string; content: string }>();
  for (const entry of entries) {
    const content = generateEntryFile(entry, parsed);
    if (content === null) continue;
    const filePath = path.join(getOutputDir(parsed.dir, entry), `${entry.name}.ts`);
    writeFile(filePath, content);
    written.set(entry.name, { filePath, content });
  }

  // Verify after all writes: on case-insensitive filesystems a later sibling
  // may silently overwrite an earlier one.
  const verified = new Set<string>();
  for (const [name, { filePath, content }] of written) {
    if (fs.readFileSync(filePath, 'utf-8') === content) verified.add(name);
  }
  return verified;
}

function writeIndexFiles(categoryDir: string, regular: Entry[], deprecated: Entry[]): void {
  const generatedDir = path.join(categoryDir, 'generated');

  // Write per-group index files (e.g. generated/fluid/index.ts).
  const byGroup = new Map<string, Entry[]>();
  for (const entry of regular) {
    if (!entry.group) continue;
    const bucket = byGroup.get(entry.group) ?? [];
    bucket.push(entry);
    byGroup.set(entry.group, bucket);
  }
  for (const [group, entries] of byGroup) {
    const lines = [...entries]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((e) => `export { ${e.name} } from './${e.name}';`);
    writeFile(path.join(generatedDir, toKebabDir(group), 'index.ts'), `${lines.join('\n')}\n`);
  }

  // Write deprecated/index.ts.
  if (deprecated.length > 0) {
    const lines = [...deprecated]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((e) => `export { ${e.name} } from './${e.name}';`);
    writeFile(path.join(generatedDir, 'deprecated', 'index.ts'), `${lines.join('\n')}\n`);
  }

  // Write generated/index.ts (root barrel).
  const hasGroups = regular.some((e) => e.group);
  const rootLines: string[] = [];
  if (hasGroups) {
    if (deprecated.length > 0) rootLines.push(`export * from './deprecated';`);
    const groups = [...new Set(regular.map((e) => e.group).filter(Boolean) as string[])].sort();
    for (const g of groups) rootLines.push(`export * from './${toKebabDir(g)}';`);
    // Non-grouped entries go directly in generated/
    for (const e of regular.filter((e) => !e.group).sort((a, b) => a.name.localeCompare(b.name))) {
      rootLines.push(`export { ${e.name} } from './${e.name}';`);
    }
  } else {
    for (const e of [...regular].sort((a, b) => a.name.localeCompare(b.name))) {
      rootLines.push(`export { ${e.name} } from './${e.name}';`);
    }
    if (deprecated.length > 0) rootLines.push(`export * from './deprecated';`);
  }
  writeFile(path.join(generatedDir, 'index.ts'), `${rootLines.join('\n')}\n`);
}

function processMetaFile(metaFilePath: string): void {
  const source = ts.createSourceFile(
    metaFilePath,
    fs.readFileSync(metaFilePath, 'utf-8'),
    ts.ScriptTarget.Latest,
    true
  );
  const dir = path.dirname(metaFilePath);

  const imports = buildImportMap(source);
  const localObjects = buildLocalObjectMap(source);
  const inlinableScalars = buildInlinableScalars(source, imports, localObjects);
  const { regular, deprecated } = collectAllEntries(source, localObjects, inlinableScalars);

  // Wipe generated/ before writing so stale files from renamed/removed entries don't linger.
  const generatedDir = path.join(dir, 'generated');
  if (fs.existsSync(generatedDir)) fs.rmSync(generatedDir, { recursive: true });

  // Pre-compute each entry's output directory so cross-entry imports can be resolved.
  // For example, `theme.ts` needs to import `themeLight` and `themeDark` from sibling files.
  const entryDirs = new Map<string, string>();
  for (const entry of [...regular, ...deprecated]) {
    entryDirs.set(entry.name, getOutputDir(dir, entry));
  }

  const parsed: ParsedMetaFile = {
    source,
    dir,
    imports,
    localObjects,
    inlinableScalars,
    entryDirs,
    regular,
    deprecated,
  };

  const writtenRegular = writeEntries(regular, parsed);
  const writtenDeprecated = writeEntries(deprecated, parsed);
  writeIndexFiles(
    dir,
    regular.filter((e) => writtenRegular.has(e.name)),
    deprecated.filter((e) => writtenDeprecated.has(e.name))
  );
}

const startTime = performance.now();
for (const metaFile of findMetaFiles(SRC_DIR)) {
  processMetaFile(metaFile);
}

console.log(`Generated Vanilla Extract style files in ${(performance.now() - startTime).toFixed(2)}ms`);
