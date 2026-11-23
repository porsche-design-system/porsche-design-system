import { setTimeout as setTimeoutPromise } from 'node:timers/promises';
import { format } from 'node:util';
import { afterEach, aroundAll, beforeEach } from 'vitest';

// Fails a test that logs through console.warn or console.error, or triggers a jsdom error, without declaring it.
// Output outside a test fails the file. See this package's AGENTS.md for how to declare expected output.

type JsdomGlobal = {
  jsdom?: { virtualConsole: { on: (event: 'jsdomError', listener: (error: Error) => void) => void } };
};

const fileOutput: string[] = [];
let output = fileOutput;

const originalConsole = { warn: console.warn, error: console.error };
// Output outside a test is also printed, because Vitest runs no aroundAll in a file whose tests are all skipped.
const guardConsole = {
  warn: (...args: unknown[]) => {
    output.push(`console.warn: ${format(...args)}`);
    if (output === fileOutput) originalConsole.warn(...args);
  },
  error: (...args: unknown[]) => {
    output.push(`console.error: ${format(...args)}`);
    if (output === fileOutput) originalConsole.error(...args);
  },
};
console.warn = guardConsole.warn;
console.error = guardConsole.error;
// jsdom reports unimplemented APIs to its virtual console, not to console, so vi.spyOn cannot declare them.
(globalThis as JsdomGlobal).jsdom?.virtualConsole.on('jsdomError', (error) => {
  output.push(`jsdom: ${error.message}`);
});

const toError = (scope: string, entries: string[]): Error => {
  const hasConsole = entries.some((entry) => entry.startsWith('console.'));
  const hasJsdom = entries.some((entry) => entry.startsWith('jsdom: '));
  return new Error(
    [
      `Undeclared output ${scope}.`,
      ...entries.map((entry) => `  ${entry}`),
      ...(hasConsole
        ? [
            "Expected console output is declared in the test that causes it, with vi.spyOn(console, 'warn' or 'error').mockImplementation(() => {}) plus an assertion on the spy.",
          ]
        : []),
      ...(hasJsdom ? ['A jsdom error is declared by stubbing the API jsdom does not implement in the test.'] : []),
    ].join('\n')
  );
};

beforeEach(() => {
  output = [];
});

// Registered before every spec hook, so it runs after the spec's own afterEach hooks.
afterEach(() => {
  // restoreMocks restores a test's spies only before the next test, so a muted spy would swallow later file output.
  console.warn = guardConsole.warn;
  console.error = guardConsole.error;
  const testOutput = output;
  output = fileOutput;
  if (testOutput.length) {
    throw toError('during this test', testOutput);
  }
});

// The outermost aroundAll, so it encloses every afterAll hook, beforeAll cleanup and file fixture teardown.
aroundAll(async (runSuite) => {
  await runSuite();
  // Lets a zero-delay timer from the last test fire first. vi.useFakeTimers does not patch node:timers.
  await setTimeoutPromise(0);
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
  if (fileOutput.length) {
    throw toError(
      'outside any test (at import time, in beforeAll, afterAll or a teardown, or from a timer)',
      fileOutput
    );
  }
});
