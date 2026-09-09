import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCatalogs, readTokenSources, renderTokensMeta } from './tokensMeta';

/** Writes the token metadata catalogs built in `tokensMeta.ts`, next to this script rather than the cwd. */
const outputFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/tokensMeta.ts');
const startTime = performance.now();

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, renderTokensMeta(buildCatalogs(readTokenSources())));

console.log(`Generated ${outputFile} in ${performance.now() - startTime}ms`);
