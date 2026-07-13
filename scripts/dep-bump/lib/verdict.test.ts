import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

test('writeVerdict writes pretty JSON with a trailing newline and returns the path', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'verdict-'));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const { writeVerdict, OUT_DIR } = await import('../lib/verdict.ts');
    const path = writeVerdict('sample.json', { schemaVersion: 1, outcome: 'CONTINUE' });
    assert.ok(path.startsWith(OUT_DIR));
    const raw = readFileSync(path, 'utf8');
    assert.equal(raw.at(-1), '\n');
    assert.deepEqual(JSON.parse(raw), { schemaVersion: 1, outcome: 'CONTINUE' });
  } finally {
    process.chdir(cwd);
    rmSync(dir, { recursive: true, force: true });
  }
});
