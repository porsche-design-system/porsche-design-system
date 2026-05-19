import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tokens from '@porsche-design-system/tokens';
import fg from 'fast-glob';

const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/tokensMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
const tokenFiles = files.filter(
  (f) =>
    !f.endsWith('index.ts') &&
    !f.endsWith('.spec.ts') &&
    !f.includes('/color/light/') &&
    !f.includes('/color/dark/') &&
    !f.endsWith('palette.ts')
);

const grouped: Record<
  string,
  { name: string; value: string; description: string; category: string; group?: string }[]
> = {};

for (const file of tokenFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const nameMatch = content.match(/export const (\w+)/);
  const descriptionMatch = content.match(/\/\*\*\s*(.+?)\s*\*\//);

  if (!nameMatch || !descriptionMatch) continue;

  const tokenName = nameMatch[1];
  // Resolve actual runtime value from the built tokens package
  const resolvedValue = (tokens as Record<string, unknown>)[tokenName];
  if (resolvedValue === undefined) continue;

  /* Resolve category and group via path:
  e.g. src/font/family/ -> category: 'font', group: 'family'
  e.g. src/shadow/ -> category: 'shadow'
  '*/
  const relativePath = file.split('/src/')[1];
  const parts = relativePath.split('/');
  const category = parts[0];
  const group = parts.length > 2 ? parts[parts.length - 2] : undefined;

  if (!grouped[category]) grouped[category] = [];

  grouped[category].push({
    name: tokenName,
    value: String(resolvedValue),
    description: descriptionMatch[1],
    category,
    ...(group ? { group } : {}),
  });
}

const lines: string[] = [`import type { TokenMeta } from '../types/token-meta';`, ''];

for (const [category, categoryTokens] of Object.entries(grouped)) {
  const exportName = `${category}Meta`;
  const items = categoryTokens
    .map((t) => {
      const groupProp = t.group ? `, group: '${t.group}'` : '';
      return `  { name: '${t.name}', value: ${JSON.stringify(t.value)}, description: '${t.description}', category: '${t.category}'${groupProp} }`;
    })
    .join(',\n');
  lines.push(`export const ${exportName}: TokenMeta[] = [\n${items},\n];`);
  lines.push('');
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, lines.join('\n'));
console.log(`Generated ${outputFile}`);
