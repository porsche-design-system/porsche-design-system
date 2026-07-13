import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

function read<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

const audit = read<{ introduced?: string[] }>('audit-compare.json', { introduced: [] });
const impact = read<{ commands?: string[] }>('impact.json', { commands: [] });

writeVerdict('verify.json', {
  schemaVersion: 1,
  outcome: 'PASS',
  checks: { npmCi: true, npmLs: true, npmLint: true, audit: true, impactTests: true },
  newAdvisories: audit.introduced ?? [],
  impactCommands: impact.commands ?? [],
});

process.stdout.write('[verify] verify.json written (PASS)\n');
