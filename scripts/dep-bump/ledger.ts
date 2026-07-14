import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

const LEDGER_FILE = 'resolve-ledger.json';

export interface Fingerprint {
  declarer: string;
  peer: string;
  demandedRange: string;
  providerVersion: string;
}

export type RemedyOutcome = 'FAILED' | 'RESOLVED' | 'NON_ACTIONABLE';

export interface LedgerEntry {
  fingerprint: Fingerprint;
  remedy: string;
  outcome: RemedyOutcome;
  evidence?: string;
}

export interface Ledger {
  schemaVersion: 1;
  entries: LedgerEntry[];
}

export function fingerprintKey(fp: Fingerprint): string {
  return `${fp.declarer}|${fp.peer}|${fp.demandedRange}|${fp.providerVersion}`;
}

export function emptyLedger(): Ledger {
  return { schemaVersion: 1, entries: [] };
}

function entryKey(entry: LedgerEntry): string {
  return `${fingerprintKey(entry.fingerprint)}::${entry.remedy}`;
}

export function recordRemedy(ledger: Ledger, entry: LedgerEntry): Ledger {
  const others = ledger.entries.filter((e) => entryKey(e) !== entryKey(entry));
  return { ...ledger, entries: [...others, entry] };
}

export function hasFailedRemedy(ledger: Ledger, fp: Fingerprint): boolean {
  const key = fingerprintKey(fp);
  return ledger.entries.some((e) => e.outcome === 'FAILED' && fingerprintKey(e.fingerprint) === key);
}

function ledgerPath(): string {
  return resolve(OUT_DIR, LEDGER_FILE);
}

function readLedger(): Ledger {
  try {
    const parsed = JSON.parse(readFileSync(ledgerPath(), 'utf8')) as Ledger;
    if (Array.isArray(parsed.entries)) {
      return parsed;
    }
  } catch {
    // fall through to a fresh ledger
  }
  return emptyLedger();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [command, payload] = process.argv.slice(2);
  switch (command) {
    case 'init': {
      // Idempotent seed: never clobber an existing ledger on a loop-back re-entry.
      if (!existsSync(ledgerPath())) {
        writeVerdict(LEDGER_FILE, emptyLedger());
      }
      break;
    }
    case 'record': {
      const entry = JSON.parse(payload ?? '') as LedgerEntry;
      writeVerdict(LEDGER_FILE, recordRemedy(readLedger(), entry));
      break;
    }
    case 'check': {
      const fp = JSON.parse(payload ?? '') as Fingerprint;
      if (hasFailedRemedy(readLedger(), fp)) {
        process.stderr.write(`fingerprint already has a FAILED remedy: ${fingerprintKey(fp)}\n`);
        process.exit(1);
      }
      break;
    }
    default:
      process.stderr.write('usage: ledger.ts <init|record <entryJson>|check <fingerprintJson>>\n');
      process.exit(2);
  }
}
