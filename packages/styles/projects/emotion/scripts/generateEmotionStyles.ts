import * as fs from 'node:fs';
import * as path from 'node:path';
import * as ts from 'typescript';

const SRC_DIR = path.resolve('./src');

type Entry = {
  exportName: string;
  valueNode: ts.Node;
  description: string;
  groupKey?: string;
  isDeprecated: boolean;
};

type MetaFileContext = {
  sourceFile: ts.SourceFile;
  categoryDir: string;
  importMap: Map<string, string>;
  aliasMap: Map<string, string>;
  localScalarMap: Map<string, string>;
  varMap: Map<string, ts.ObjectLiteralExpression>;
};

type GenerationContext = MetaFileContext & {
  entryLocationMap: Map<string, string>;
};

const RESERVED_IDENTIFIER_NAMES = new Set([
  'as',
  'const',
  'let',
  'var',
  'true',
  'false',
  'undefined',
  'null',
  'void',
  'typeof',
  'instanceof',
]);

function findMetaFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMetaFiles(fullPath));
    } else if (entry.name.endsWith('.meta.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

// `{ ... } as const` wraps the object in an AsExpression — unwrap before checking isObjectLiteralExpression.
function unwrapObjectLiteral(node: ts.Expression): ts.ObjectLiteralExpression | undefined {
  if (ts.isObjectLiteralExpression(node)) return node;
  if (ts.isAsExpression(node) && ts.isObjectLiteralExpression(node.expression)) return node.expression;
  return undefined;
}

function buildVariableMap(sourceFile: ts.SourceFile): Map<string, ts.ObjectLiteralExpression> {
  const map = new Map<string, ts.ObjectLiteralExpression>();
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const obj = unwrapObjectLiteral(decl.initializer as ts.Expression);
      if (obj) map.set(decl.name.text, obj);
    }
  });
  return map;
}

function buildImportMap(sourceFile: ts.SourceFile): Map<string, string> {
  const map = new Map<string, string>();
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isImportDeclaration(node)) return;
    const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const el of bindings.elements) {
        map.set(el.name.text, moduleSpecifier);
      }
    }
  });
  return map;
}

// Maps local alias → original export name for aliased imports (e.g. `colorCanvas as _colorCanvas`).
function buildAliasMap(sourceFile: ts.SourceFile): Map<string, string> {
  const map = new Map<string, string>();
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isImportDeclaration(node)) return;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const el of bindings.elements) {
        if (el.propertyName) {
          map.set(el.name.text, el.propertyName.text);
        }
      }
    }
  });
  return map;
}

function getPropertyAssignment(node: ts.ObjectLiteralExpression, key: string): ts.PropertyAssignment | undefined {
  return node.properties.find(
    (prop): prop is ts.PropertyAssignment =>
      ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === key
  );
}

function isLeafEntry(node: ts.ObjectLiteralExpression): boolean {
  const nameProp = getPropertyAssignment(node, 'name');
  return !!(nameProp && ts.isStringLiteral(nameProp.initializer));
}

function getStringProp(node: ts.ObjectLiteralExpression, key: string): string | undefined {
  const prop = getPropertyAssignment(node, key);
  return prop && ts.isStringLiteral(prop.initializer) ? prop.initializer.text : undefined;
}

function getValueNode(node: ts.ObjectLiteralExpression): ts.Node | undefined {
  return getPropertyAssignment(node, 'value')?.initializer;
}

function resolveEntryObject(
  initializer: ts.Expression,
  varMap: Map<string, ts.ObjectLiteralExpression>
): ts.ObjectLiteralExpression | undefined {
  const unwrapped = unwrapObjectLiteral(initializer);
  if (unwrapped) return unwrapped;

  if (ts.isIdentifier(initializer)) {
    // motion/spacing pattern: deprecated entry defined as a separate named const
    return varMap.get(initializer.text);
  }

  return undefined;
}

function getDescriptionText(
  node: ts.ObjectLiteralExpression,
  sourceFile: ts.SourceFile,
  localScalarMap: Map<string, string>
): string | undefined {
  const prop = getPropertyAssignment(node, 'description');
  if (!prop) return undefined;
  const init = prop.initializer;
  if (ts.isStringLiteral(init)) return init.text;
  if (ts.isNoSubstitutionTemplateLiteral(init)) return init.text;
  if (ts.isTemplateExpression(init)) {
    let result = init.head.text;
    for (const span of init.templateSpans) {
      if (ts.isIdentifier(span.expression)) {
        const raw = localScalarMap.get(span.expression.text);
        // raw is the source text of the scalar (e.g. "'[light-dark()](...)'"); strip surrounding quotes
        result += raw ? (raw.match(/^['"`]([\s\S]*)['"`]$/)?.[1] ?? raw) : `\${${span.expression.text}}`;
      } else {
        result += `\${...}`;
      }
      result += span.literal.text;
    }
    return result;
  }
  return undefined;
}

function extractEntries(
  metaObj: ts.ObjectLiteralExpression,
  varMap: Map<string, ts.ObjectLiteralExpression>,
  isDeprecated: boolean,
  groupKey?: string,
  sourceFile?: ts.SourceFile,
  localScalarMap?: Map<string, string>
): Entry[] {
  const entries: Entry[] = [];

  for (const prop of metaObj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;

    const entryObj = resolveEntryObject(prop.initializer, varMap);

    if (!entryObj) continue;

    if (isLeafEntry(entryObj)) {
      const exportName = getStringProp(entryObj, 'name');
      const description =
        sourceFile && localScalarMap
          ? getDescriptionText(entryObj, sourceFile, localScalarMap)
          : getStringProp(entryObj, 'description');
      const valueNode = getValueNode(entryObj);
      if (exportName && description && valueNode) {
        entries.push({ exportName, valueNode, description, groupKey, isDeprecated });
      }
    } else {
      const key = ts.isIdentifier(prop.name) ? prop.name.text : undefined;
      if (key) {
        entries.push(...extractEntries(entryObj, varMap, isDeprecated, key, sourceFile, localScalarMap));
      }
    }
  }

  return entries;
}

function findMetaExports(
  sourceFile: ts.SourceFile,
  varMap: Map<string, ts.ObjectLiteralExpression>,
  localScalarMap: Map<string, string>
): { regular: Entry[]; deprecated: Entry[] } {
  const regular: Entry[] = [];
  const deprecated: Entry[] = [];

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) return;
    if (!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return;

    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      const varName = decl.name.text;
      if (!varName.endsWith('Meta')) continue;
      const metaObj = decl.initializer ? unwrapObjectLiteral(decl.initializer as ts.Expression) : undefined;
      if (!metaObj) continue;

      const isDeprecated = /^deprecated/i.test(varName);
      const entries = extractEntries(metaObj, varMap, isDeprecated, undefined, sourceFile, localScalarMap);
      (isDeprecated ? deprecated : regular).push(...entries);
    }
  });

  return { regular, deprecated };
}

// A scalar is "simple" if it resolves cleanly to literals or importMap identifiers,
// making it safe to inline without creating nested template literal syntax issues.
function isSimpleScalar(node: ts.Expression, importMap: Map<string, string>): boolean {
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return true;
  if (ts.isIdentifier(node)) return importMap.has(node.text);
  if (ts.isAsExpression(node)) return isSimpleScalar(node.expression, importMap);
  if (ts.isTemplateExpression(node)) {
    return node.templateSpans.every((span) => isSimpleScalar(span.expression as ts.Expression, importMap));
  }
  return false;
}

// Collects non-object, non-function top-level consts whose values can be safely inlined.
// Used to resolve local identifiers like `basicEnd = 'basic-end'` or `gridGap = spacingFluidMd`.
function buildLocalScalarMap(
  sourceFile: ts.SourceFile,
  importMap: Map<string, string>,
  varMap: Map<string, ts.ObjectLiteralExpression>
): Map<string, string> {
  const map = new Map<string, string>();
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
      const name = decl.name.text;
      if (importMap.has(name) || varMap.has(name)) continue;
      const init = decl.initializer as ts.Expression;
      if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) continue;
      if (unwrapObjectLiteral(init)) continue;
      if (isSimpleScalar(init, importMap)) {
        map.set(name, getNodeText(init, sourceFile));
      }
    }
  });
  return map;
}

function getNodeText(node: ts.Node, sourceFile: ts.SourceFile): string {
  return sourceFile.text.slice(node.getStart(sourceFile), node.getEnd());
}

function addToMapArray<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const bucket = map.get(key);
  if (bucket) {
    bucket.push(value);
  } else {
    map.set(key, [value]);
  }
}

function collectIdentifiers(node: ts.Node, predicate?: (name: string) => boolean): string[] {
  const seen = new Set<string>();

  const walk = (n: ts.Node) => {
    if (ts.isIdentifier(n) && (!predicate || predicate(n.text))) seen.add(n.text);
    ts.forEachChild(n, walk);
  };

  walk(node);
  return [...seen];
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function substituteLocalScalars(text: string, localScalarMap: Map<string, string>): string {
  let result = text;
  // Multi-pass until stable to handle chained local consts.
  for (let i = 0; i < 5; i++) {
    let changed = false;
    for (const [name, value] of localScalarMap) {
      const next = result.replace(new RegExp(`\\b${escapeRegex(name)}\\b`, 'g'), value);
      if (next !== result) {
        result = next;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return result;
}

function getOutputDir(categoryDir: string, entry: Entry): string {
  const generatedDir = path.join(categoryDir, 'generated');
  if (entry.isDeprecated) return path.join(generatedDir, 'deprecated');
  return entry.groupKey ? path.join(generatedDir, entry.groupKey) : generatedDir;
}

function collectImportedIdentifiers(
  node: ts.Node,
  context: Pick<MetaFileContext, 'importMap' | 'localScalarMap' | 'sourceFile'>
): string[] {
  const seen = new Set(collectIdentifiers(node, (name) => context.importMap.has(name)));

  // Also scan the substituted text to catch identifiers surfaced by local scalar resolution.
  const substituted = substituteLocalScalars(getNodeText(node, context.sourceFile), context.localScalarMap);
  for (const id of context.importMap.keys()) {
    if (new RegExp(`\\b${escapeRegex(id)}\\b`).test(substituted)) seen.add(id);
  }

  return [...seen].sort();
}

function collectVarMapIdentifiers(node: ts.Node, varMap: Map<string, ts.ObjectLiteralExpression>): string[] {
  return collectIdentifiers(node, (name) => varMap.has(name));
}

// Relative import paths in the meta file are resolved from the category root.
// Generated files in subdirectories need the path adjusted accordingly.
function adjustImportPath(importPath: string, metaDir: string, outputDir: string): string {
  if (!importPath.startsWith('.')) return importPath;
  const resolved = path.resolve(metaDir, importPath);
  const relative = path.relative(outputDir, resolved);
  if (relative === '') return '.';
  return relative.startsWith('.') ? relative : `./${relative}`;
}

function buildJsdoc(description: string, isDeprecated: boolean): string {
  if (isDeprecated) {
    return `/** @deprecated ${description.replace(/^deprecated\s+/i, '')} */`;
  }
  return `/** ${description} */`;
}

// Returns true if the value node contains identifiers that can't be resolved via imports or inlining.
// Used to avoid generating broken files that reference undefined identifiers.
function hasUnresolvableIdentifiers(
  node: ts.Node,
  context: Pick<GenerationContext, 'importMap' | 'localScalarMap' | 'varMap' | 'entryLocationMap'>
): boolean {
  return collectIdentifiers(node).some((name) => {
    if (context.importMap.has(name)) return false;
    if (context.localScalarMap.has(name)) return false;
    if (context.varMap.has(name) && context.entryLocationMap.has(name)) return false;
    return !RESERVED_IDENTIFIER_NAMES.has(name);
  });
}

// Returns null when any import would be circular (import resolves to the output directory itself),
// which means an existing hand-written implementation lives there and must not be overwritten.
function generateStyleFile(entry: Entry, outputDir: string, context: GenerationContext): string | null {
  if (hasUnresolvableIdentifiers(entry.valueNode, context)) return null;

  const identifiers = collectImportedIdentifiers(entry.valueNode, context);

  const byModule = new Map<string, string[]>();

  for (const id of identifiers) {
    const mod = context.importMap.get(id);
    if (!mod) continue;
    const adjustedMod = adjustImportPath(mod, context.categoryDir, outputDir);
    if (adjustedMod === '.') return null; // circular — existing implementation lives here
    addToMapArray(byModule, adjustedMod, id);
  }

  // Local object consts (varMap entries that are also meta entries) become sibling file imports.
  for (const id of collectVarMapIdentifiers(entry.valueNode, context.varMap)) {
    const siblingDir = context.entryLocationMap.get(id);
    if (!siblingDir) continue;
    // Self-reference: this entry IS the generated file. Preserve the existing implementation.
    if (id === entry.exportName && siblingDir === outputDir) return null;
    const relPath = path.relative(outputDir, path.join(siblingDir, id));
    const mod = relPath.startsWith('.') ? relPath : `./${relPath}`;
    addToMapArray(byModule, mod, id);
  }

  const importLines = [...byModule.entries()]
    .map(([mod, ids]) => {
      const specifiers = ids
        .sort()
        .map((id) => {
          if (id === entry.exportName) return `${id} as _${id}`;
          const originalName = context.aliasMap.get(id);
          return originalName ? `${originalName} as ${id}` : id;
        })
        .join(', ');
      return `import { ${specifiers} } from '${mod}';`;
    })
    .join('\n');

  let valueText = substituteLocalScalars(getNodeText(entry.valueNode, context.sourceFile), context.localScalarMap);

  // Alias only when the original value is a directly imported identifier with the same name as the export.
  if (
    ts.isIdentifier(entry.valueNode) &&
    entry.valueNode.text === entry.exportName &&
    context.importMap.has(entry.valueNode.text)
  ) {
    valueText = `_${entry.exportName}`;
  }

  const jsdoc = buildJsdoc(entry.description, entry.isDeprecated);
  const parts: string[] = [];
  if (importLines) parts.push(importLines, '');
  parts.push(jsdoc, `export const ${entry.exportName} = ${valueText};`, '');
  return parts.join('\n');
}

function generateNamedExportsIndex(entries: Entry[]): string {
  const lines = [...entries]
    .sort((a, b) => a.exportName.localeCompare(b.exportName))
    .map((e) => `export { ${e.exportName} } from './${e.exportName}';`);
  return `${lines.join('\n')}\n`;
}

function generateRootIndex(regular: Entry[], deprecated: Entry[]): string {
  const hasGroups = regular.some((e) => e.groupKey);
  const lines: string[] = [];

  if (hasGroups) {
    if (deprecated.length > 0) lines.push(`export * from './deprecated';`);
    const groups = [...new Set(regular.map((e) => e.groupKey).filter(Boolean) as string[])].sort();
    for (const g of groups) lines.push(`export * from './${g}';`);
    // Also include non-grouped entries that live directly in generated/
    const ungrouped = [...regular.filter((e) => !e.groupKey)].sort((a, b) =>
      a.exportName.localeCompare(b.exportName)
    );
    for (const e of ungrouped) lines.push(`export { ${e.exportName} } from './${e.exportName}';`);
  } else {
    const sorted = [...regular].sort((a, b) => a.exportName.localeCompare(b.exportName));
    for (const e of sorted) lines.push(`export { ${e.exportName} } from './${e.exportName}';`);
    if (deprecated.length > 0) lines.push(`export * from './deprecated';`);
  }

  return `${lines.join('\n')}\n`;
}

function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function getExportLines(content: string): Set<string> {
  return new Set(
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('export'))
  );
}

// Don't overwrite an existing index if the generated content would remove any of its export lines.
// This preserves manually-maintained exports in categories where the meta is not yet complete.
function writeIndexSafely(filePath: string, content: string): void {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf-8');
    const existingExports = getExportLines(existing);
    const generatedExports = getExportLines(content);
    for (const line of existingExports) {
      if (!generatedExports.has(line)) return;
    }
  }
  writeFile(filePath, content);
}

function parseMetaFile(metaFilePath: string): MetaFileContext & { regular: Entry[]; deprecated: Entry[] } {
  const src = fs.readFileSync(metaFilePath, 'utf-8');
  const sourceFile = ts.createSourceFile(metaFilePath, src, ts.ScriptTarget.Latest, true);
  const categoryDir = path.dirname(metaFilePath);

  const varMap = buildVariableMap(sourceFile);
  const importMap = buildImportMap(sourceFile);
  const aliasMap = buildAliasMap(sourceFile);
  const localScalarMap = buildLocalScalarMap(sourceFile, importMap, varMap);
  const { regular, deprecated } = findMetaExports(sourceFile, varMap, localScalarMap);

  return { sourceFile, categoryDir, importMap, aliasMap, localScalarMap, varMap, regular, deprecated };
}

function buildEntryLocationMap(categoryDir: string, entries: Entry[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of entries) {
    map.set(entry.exportName, getOutputDir(categoryDir, entry));
  }
  return map;
}

function writeEntries(entries: Entry[], context: GenerationContext): Set<string> {
  const pending = new Map<string, { filePath: string; content: string }>();
  for (const entry of entries) {
    const outputDir = getOutputDir(context.categoryDir, entry);
    const content = generateStyleFile(entry, outputDir, context);
    if (content !== null) {
      const filePath = path.join(outputDir, `${entry.exportName}.ts`);
      writeFile(filePath, content);
      pending.set(entry.exportName, { filePath, content });
    }
  }
  // Verify after all writes: on case-insensitive filesystems a later sibling may overwrite an earlier file.
  const written = new Set<string>();
  for (const [name, { filePath, content }] of pending) {
    if (fs.readFileSync(filePath, 'utf-8') === content) written.add(name);
  }
  return written;
}

function writeIndexes(categoryDir: string, regular: Entry[], deprecated: Entry[]): void {
  const generatedDir = path.join(categoryDir, 'generated');
  const byGroup = new Map<string, Entry[]>();
  for (const entry of regular) {
    if (!entry.groupKey) continue;
    addToMapArray(byGroup, entry.groupKey, entry);
  }

  for (const [groupKey, entries] of byGroup) {
    writeFile(path.join(generatedDir, groupKey, 'index.ts'), generateNamedExportsIndex(entries));
  }

  if (deprecated.length > 0) {
    writeFile(path.join(generatedDir, 'deprecated', 'index.ts'), generateNamedExportsIndex(deprecated));
  }

  writeFile(path.join(generatedDir, 'index.ts'), generateRootIndex(regular, deprecated));
}

function processMetaFile(metaFilePath: string): void {
  const { regular, deprecated, ...context } = parseMetaFile(metaFilePath);
  const generationContext: GenerationContext = {
    ...context,
    entryLocationMap: buildEntryLocationMap(context.categoryDir, [...regular, ...deprecated]),
  };

  const writtenRegular = writeEntries(regular, generationContext);
  const writtenDeprecated = writeEntries(deprecated, generationContext);
  writeIndexes(
    context.categoryDir,
    regular.filter((e) => writtenRegular.has(e.exportName)),
    deprecated.filter((e) => writtenDeprecated.has(e.exportName))
  );
}

const startTime = performance.now();

for (const metaFile of findMetaFiles(SRC_DIR)) {
  processMetaFile(metaFile);
}

console.log(`Generated Emotion style files in ${(performance.now() - startTime).toFixed(2)}ms`);
