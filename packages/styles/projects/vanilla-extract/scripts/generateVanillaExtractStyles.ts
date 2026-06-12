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
 *   generated/{group?}/{name}.ts    — re-exports entry.value with a JSDoc comment
 *   generated/deprecated/{name}.ts  — entries from `deprecatedXxxMeta` exports
 *   generated/index.ts              — barrel files (root + one per subdir)
 *
 * Entries marked `handWritten: true` are skipped — their files are written and
 * wired up by hand (see src/META_FILES.md).
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

/** Returns the initializer expression of an object's `key:` property, or undefined. */
function getProp(obj: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
  const prop = obj.properties.find(
    (p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === key
  );
  return prop?.initializer;
}

/** Returns the string value of a `key: 'literal'` property, or undefined. */
function getStringProperty(obj: ts.ObjectLiteralExpression, key: string): string | undefined {
  const init = getProp(obj, key);
  return init && ts.isStringLiteral(init) ? init.text : undefined;
}

/** Returns the boolean value of a `key: true` / `key: false` property, or undefined. */
function getBooleanProperty(obj: ts.ObjectLiteralExpression, key: string): boolean | undefined {
  const init = getProp(obj, key);
  if (init?.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (init?.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
}

/** A leaf entry has a `name: 'string'` property; a non-leaf is a nested group. */
function isLeafEntry(obj: ts.ObjectLiteralExpression): boolean {
  return getStringProperty(obj, 'name') !== undefined;
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
      const obj = asObjectLiteral(decl.initializer);
      if (obj) objects.set(decl.name.text, obj);
    }
  });
  return objects;
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
      const description = resolveDescription(entryObj) ?? '';
      const valueNode = getProp(entryObj, 'value');
      const handWritten = getBooleanProperty(entryObj, 'handWritten');
      if (valueNode) entries.push({ name, valueNode, description, group, deprecated, handWritten });
    } else {
      // Nested group — recurse with the property key as the group name.
      const groupKey = ts.isIdentifier(prop.name) ? prop.name.text : undefined;
      if (groupKey) {
        entries.push(...extractEntries(entryObj, localObjects, deprecated, groupKey));
      }
    }
  }
  return entries;
}

/** Resolves the `description` property of a leaf entry to a plain string. */
function resolveDescription(obj: ts.ObjectLiteralExpression): string | undefined {
  const init = getProp(obj, 'description');
  return init && (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) ? init.text : undefined;
}

/** Finds all exported *Meta variables and returns their entries split by deprecated flag. */
function collectAllEntries(
  source: ts.SourceFile,
  localObjects: Map<string, ts.ObjectLiteralExpression>
): { regular: Entry[]; deprecated: Entry[] } {
  const regular: Entry[] = [];
  const deprecated: Entry[] = [];
  ts.forEachChild(source, (node) => {
    if (!ts.isVariableStatement(node)) return;
    if (!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.name.text.endsWith('Meta')) continue;
      const metaObj = decl.initializer ? asObjectLiteral(decl.initializer) : undefined;
      if (!metaObj) continue;
      const isDeprecated = /^deprecated/i.test(decl.name.text);
      const entries = extractEntries(metaObj, localObjects, isDeprecated);
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

/** True for identifier nodes that are *references* — not property names (`frosted:`) or property access names (`.foo`). */
function isReferenceIdentifier(node: ts.Identifier): boolean {
  const parent = node.parent;
  return !(
    (ts.isPropertyAssignment(parent) && parent.name === node) ||
    (ts.isPropertyAccessExpression(parent) && parent.name === node)
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
  const valueNode = entry.valueNode;

  // The value expression is copied into the generated file verbatim; per the golden rule
  // (see src/META_FILES.md) every identifier it references is an import and must be
  // re-imported by the generated file.
  const referencedNames = [...new Set(collectReferenceIdentifierNodes(valueNode).map((n) => n.text))];
  let valueText = nodeText(valueNode, parsed.source);

  // If the value is just the same-named imported identifier, we must alias the import
  // to avoid a name collision: `export const spacingFluidXs = _spacingFluidXs`.
  if (ts.isIdentifier(valueNode) && valueNode.text === entry.name && parsed.imports.has(valueNode.text)) {
    valueText = `_${entry.name}`;
  }

  // Group needed imports by module.
  const importsByModule = new Map<string, string[]>();

  for (const localName of referencedNames.filter((name) => parsed.imports.has(name)).sort()) {
    const info = parsed.imports.get(localName)!;
    const adjusted = adjustImportPath(info.module, parsed.dir, outputDir);
    const bucket = importsByModule.get(adjusted) ?? [];
    bucket.push(localName);
    importsByModule.set(adjusted, bucket);
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

function writeEntries(entries: Entry[], parsed: ParsedMetaFile): void {
  for (const entry of entries) {
    const content = generateEntryFile(entry, parsed);
    if (content === null) continue;
    writeFile(path.join(getOutputDir(parsed.dir, entry), `${entry.name}.ts`), content);
  }
}

/** Sorted `export { name } from './name';` lines for a list of entries. */
function exportLines(entries: Entry[]): string[] {
  return [...entries]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => `export { ${e.name} } from './${e.name}';`);
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
    writeFile(path.join(generatedDir, toKebabDir(group), 'index.ts'), `${exportLines(entries).join('\n')}\n`);
  }

  // Write deprecated/index.ts.
  if (deprecated.length > 0) {
    writeFile(path.join(generatedDir, 'deprecated', 'index.ts'), `${exportLines(deprecated).join('\n')}\n`);
  }

  // Write generated/index.ts (root barrel). The deprecated re-export comes first when
  // groups exist and last otherwise — kept that way so existing output stays stable.
  const groupLines = [...byGroup.keys()].sort().map((g) => `export * from './${toKebabDir(g)}';`);
  const ungroupedLines = exportLines(regular.filter((e) => !e.group));
  const deprecatedLines = deprecated.length > 0 ? [`export * from './deprecated';`] : [];
  const rootLines =
    byGroup.size > 0 ? [...deprecatedLines, ...groupLines, ...ungroupedLines] : [...ungroupedLines, ...deprecatedLines];
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
  const { regular, deprecated } = collectAllEntries(source, localObjects);

  // Wipe generated/ before writing so stale files from renamed/removed entries don't linger.
  const generatedDir = path.join(dir, 'generated');
  if (fs.existsSync(generatedDir)) fs.rmSync(generatedDir, { recursive: true });

  // Guard against case-insensitive filename collisions (e.g. `breakpoints` vs `breakpointS`).
  // These silently overwrite each other on case-insensitive filesystems (macOS) but produce two
  // distinct files on case-sensitive CI (Linux), which breaks the typings build with TS1149.
  // Fail loudly at generation time so the trap can't reach CI.
  const pathByLower = new Map<string, string>();
  for (const entry of [...regular, ...deprecated]) {
    if (entry.handWritten) continue;
    const outPath = path.join(getOutputDir(dir, entry), `${entry.name}.ts`);
    const lower = outPath.toLowerCase();
    const prev = pathByLower.get(lower);
    if (prev && prev !== entry.name) {
      throw new Error(
        `Case-insensitive filename collision: '${prev}' and '${entry.name}' both generate '${outPath}' (differ only in casing). Rename or remove one entry.`
      );
    }
    pathByLower.set(lower, entry.name);
  }

  const parsed: ParsedMetaFile = { source, dir, imports };

  writeEntries(regular, parsed);
  writeEntries(deprecated, parsed);
  // Hand-written entries are excluded from index files — they're wired up manually.
  writeIndexFiles(
    dir,
    regular.filter((e) => !e.handWritten),
    deprecated.filter((e) => !e.handWritten)
  );
}

const startTime = performance.now();
for (const metaFile of findMetaFiles(SRC_DIR)) {
  processMetaFile(metaFile);
}

console.log(`Generated Vanilla Extract style files in ${(performance.now() - startTime).toFixed(2)}ms`);
