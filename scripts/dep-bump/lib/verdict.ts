import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const OUT_DIR = resolve(process.cwd(), '.turbo-spec/out');

export function writeVerdict(fileName: string, verdict: Record<string, unknown>): string {
  const path = resolve(OUT_DIR, fileName);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(verdict, null, 2)}\n`, 'utf8');
  return path;
}
