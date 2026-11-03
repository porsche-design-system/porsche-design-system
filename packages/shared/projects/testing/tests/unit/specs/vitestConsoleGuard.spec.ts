import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { assertDefined } from '../../../src/assertDefined';

type AssertionResult = { title: string; status: string; failureMessages: string[] };
type FileResult = { name: string; status: string; message: string; assertionResults: AssertionResult[] };

const fixtureDir = resolve(__dirname, '../fixtures/console-guard');
let fileResults: FileResult[] = [];

const getFile = (fileName: string): FileResult => {
  const file = fileResults.find(({ name }) => name.endsWith(`/${fileName}`));
  assertDefined(file);
  return file;
};
const getTest = (fileName: string, title: string): AssertionResult => {
  const test = getFile(fileName).assertionResults.find((result) => result.title === title);
  assertDefined(test);
  return test;
};

describe('vitest-console-guard', () => {
  // Runs the fixtures in a nested Vitest process, because the guard's failures must not fail this suite.
  beforeAll(() => {
    const vitestBin = join(dirname(createRequire(import.meta.url).resolve('vitest/package.json')), 'vitest.mjs');
    const outputFile = join(mkdtempSync(join(tmpdir(), 'console-guard-')), 'report.json');
    const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('VITEST')));
    spawnSync(
      process.execPath,
      [vitestBin, 'run', '--config', 'vitest.fixture.config.ts', '--reporter=json', `--outputFile=${outputFile}`],
      { cwd: fixtureDir, env }
    );
    fileResults = JSON.parse(readFileSync(outputFile, 'utf8')).testResults;
  }, 60_000);

  it('fails an undeclared console.warn', () => {
    const test = getTest('test-level.fixture.ts', 'undeclared warn');
    expect(test.status).toBe('failed');
    expect(test.failureMessages.join()).toContain('console.warn: undeclared warn text');
  });

  it('fails an undeclared console.error', () => {
    const test = getTest('test-level.fixture.ts', 'undeclared error');
    expect(test.status).toBe('failed');
    expect(test.failureMessages.join()).toContain('console.error: undeclared error text');
  });

  it('passes declared output', () => {
    expect(getTest('test-level.fixture.ts', 'declared').status).toBe('passed');
  });

  it('fails a spy that calls through', () => {
    const test = getTest('test-level.fixture.ts', 'spy without mockImplementation');
    expect(test.status).toBe('failed');
    expect(test.failureMessages.join()).toContain('console.warn: spied text');
  });

  it('formats printf-style arguments', () => {
    const message = getTest('test-level.fixture.ts', 'printf').failureMessages.join();
    expect(message).toContain('console.error: Warning: Button');
    expect(message).not.toContain('%s');
  });

  it('fails the file for import-time and beforeAll output', () => {
    const file = getFile('file-level.fixture.ts');
    expect(file.status).toBe('failed');
    expect(file.message).toContain('console.warn: import time');
    expect(file.message).toContain('console.warn: before all');
    expect(getTest('file-level.fixture.ts', 'passes').status).toBe('passed');
  });

  it('reports late output at file level', () => {
    expect(getFile('file-level.fixture.ts').message).toContain('console.warn: late timer');
  });

  it('waits for late output with real timers when a test leaves fake timers on', () => {
    expect(getFile('fake-timers.fixture.ts').status).toBe('passed');
  });

  it('fails a jsdom error', () => {
    const test = getTest('jsdom.fixture.ts', 'requestSubmit');
    expect(test.status).toBe('failed');
    expect(test.failureMessages.join()).toContain('jsdom: Not implemented');
    expect(getTest('jsdom.fixture.ts', 'requestSubmit stubbed').status).toBe('passed');
  });

  it("jsdom listener follows the file's environment", () => {
    expect(getTest('node-env.fixture.ts', 'undeclared warn').status).toBe('failed');
    expect(getTest('node-env.fixture.ts', 'clean').status).toBe('passed');
  });
});
