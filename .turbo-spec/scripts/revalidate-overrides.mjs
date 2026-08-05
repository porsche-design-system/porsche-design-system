import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const baselineFixture = {
  auditReportVersion: 2,
  vulnerabilities: {
    glob: {
      severity: 'high',
      via: ['minimatch'],
      nodes: ['node_modules/glob'],
    },
    minimatch: {
      severity: 'high',
      via: [{ source: 1234, title: 'ReDoS', severity: 'high', range: '<9.0.7' }],
      nodes: ['node_modules/minimatch'],
    },
  },
  metadata: { vulnerabilities: { high: 2, total: 2 } },
};

const DEFAULT_COMMAND_TIMEOUT_MS = 15 * 60 * 1000;
const DEFAULT_RUN_TIMEOUT_MS = 165 * 60 * 1000;
const DEFAULT_ROLLBACK_RESERVE_MS = 10 * 60 * 1000;
const MAX_COMMAND_OUTPUT_BYTES = 50 * 1024 * 1024;
const CLEANUP_STATE_PATH = '.turbo-spec/override-cleanup-state.json';
const ALLOWED_DOCUMENTATION_PATH = 'docs/dependencies.md';
const RUNTIME_PATH_PREFIXES = ['.agent-context/', '.sessions/', '.turbo-spec/out/'];
const PROCESS_GROUP_RUNNER = `
const { spawn } = require('node:child_process');
const options = JSON.parse(process.argv[1]);
const child = spawn(options.command, options.args, {
  cwd: process.cwd(),
  env: process.env,
  detached: process.platform !== 'win32',
  stdio: ['ignore', 'pipe', 'pipe'],
});
const stdout = [];
const stderr = [];
let outputBytes = 0;
let timedOut = false;
let outputExceeded = false;

function killGroup() {
  try {
    if (process.platform === 'win32') child.kill('SIGKILL');
    else process.kill(-child.pid, 'SIGKILL');
  } catch {}
}

function capture(chunks, chunk) {
  outputBytes += chunk.length;
  if (outputBytes > options.maxOutputBytes) {
    outputExceeded = true;
    killGroup();
    return;
  }
  chunks.push(chunk);
}

child.stdout.on('data', (chunk) => capture(stdout, chunk));
child.stderr.on('data', (chunk) => capture(stderr, chunk));
child.on('error', (error) => {
  process.stderr.write(error.message);
  process.exit(127);
});

const timer = setTimeout(() => {
  timedOut = true;
  killGroup();
}, options.timeout);

child.on('close', (code, signal) => {
  clearTimeout(timer);
  if (timedOut || outputExceeded) killGroup();
  process.stdout.write(Buffer.concat(stdout));
  process.stderr.write(Buffer.concat(stderr));
  if (timedOut) process.exit(124);
  if (outputExceeded) process.exit(126);
  if (signal) process.exit(125);
  process.exit(code ?? 2);
});
`;

function advisoryIdentity(via) {
  if (typeof via === 'string') {
    return `package:${via}`;
  }
  if (via && typeof via === 'object' && via.source !== undefined) {
    return `advisory:${via.source}`;
  }
  const fallback = [via?.name, via?.title, via?.url, via?.range].filter(Boolean).join('|');
  return `reference:${fallback}`;
}

function normalizeAudit(report) {
  if (report?.auditReportVersion !== 2 || !report.vulnerabilities || typeof report.vulnerabilities !== 'object') {
    throw new TypeError('npm audit did not return an auditReportVersion 2 vulnerability map');
  }

  const findings = new Set();
  const affectedNodes = new Set();

  for (const [packageName, vulnerability] of Object.entries(report.vulnerabilities)) {
    const severity = String(vulnerability.severity ?? '');
    const references = vulnerability.via ?? [];
    for (const via of references) {
      const viaSeverity = typeof via === 'object' && via !== null ? String(via.severity ?? severity) : severity;
      findings.add(JSON.stringify([packageName, advisoryIdentity(via), viaSeverity]));
    }
    if (references.length === 0) {
      findings.add(JSON.stringify([packageName, `range:${String(vulnerability.range ?? '')}`, severity]));
    }
    for (const node of vulnerability.nodes ?? []) {
      affectedNodes.add(JSON.stringify([packageName, String(node)]));
    }
  }

  return {
    findings: [...findings].sort(),
    affectedNodes: [...affectedNodes].sort(),
    counts: report.metadata?.vulnerabilities ?? {},
  };
}

function auditAdditions(baseline, current) {
  const baselineFindings = new Set(baseline.findings);
  const baselineNodes = new Set(baseline.affectedNodes);
  return {
    findings: current.findings.filter((entry) => !baselineFindings.has(entry)),
    affectedNodes: current.affectedNodes.filter((entry) => !baselineNodes.has(entry)),
  };
}

function listOverrideLeaves(overrides, path = []) {
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) {
    throw new TypeError('package.json overrides must be an object');
  }

  const leaves = [];
  for (const [key, value] of Object.entries(overrides)) {
    const nextPath = [...path, key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      leaves.push(...listOverrideLeaves(value, nextPath));
    } else {
      leaves.push({ path: nextPath, key: nextPath.join(' > '), value: structuredClone(value) });
    }
  }
  return leaves;
}

function removeOverrideLeaf(manifest, path) {
  const parents = [];
  let cursor = manifest.overrides;
  for (const segment of path.slice(0, -1)) {
    parents.push([cursor, segment]);
    cursor = cursor[segment];
  }
  delete cursor[path.at(-1)];

  for (const [parent, segment] of parents.reverse()) {
    if (Object.keys(parent[segment]).length === 0) {
      delete parent[segment];
    }
  }
  if (Object.keys(manifest.overrides).length === 0) {
    delete manifest.overrides;
  }
}

function buildReviewerPayload(results) {
  const removed = results.filter(({ status }) => status === 'removed').length;
  return {
    verdict: 'approved',
    blocking_issues: [],
    suggestions: [],
    observations: results.map((result) => ({
      file: 'package.json',
      line: null,
      description: `${result.key}: ${result.status}; install=${result.install}; audit=${result.audit}; ${result.reason}`,
    })),
    summary: `Tested ${results.length} overrides; removed ${removed}; retained ${results.length - removed}.`,
  };
}

class EnvironmentError extends Error {}
class ValidationError extends Error {}
class AuditRegressionError extends ValidationError {}

const COMMAND_ENV_KEYS = [
  'PATH',
  'CI',
  'GITHUB_ACTIONS',
  'NO_COLOR',
  'TERM',
  'SHELL',
  'USER',
  'LOGNAME',
  'LANG',
  'LC_ALL',
  'TMPDIR',
  'TMP',
  'TEMP',
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'NO_PROXY',
  'http_proxy',
  'https_proxy',
  'no_proxy',
  'NODE_EXTRA_CA_CERTS',
  'SSL_CERT_FILE',
  'SSL_CERT_DIR',
  'NPM_CONFIG_REGISTRY',
  'npm_config_registry',
  'NPM_CONFIG_CACHE',
  'npm_config_cache',
  'VOLTA_HOME',
  'COREPACK_HOME',
];

function tail(text, limit = 2000) {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(-limit);
}

function commandHomePath(cwd) {
  const workspace = createHash('sha256').update(cwd).digest('hex').slice(0, 12);
  return join(process.env.RUNNER_TEMP ?? tmpdir(), `pds-override-home-${workspace}`);
}

function commandEnvironment(cwd, source = process.env) {
  const env = {};
  for (const key of COMMAND_ENV_KEYS) {
    if (source[key] !== undefined) {
      env[key] = source[key];
    }
  }

  const home = commandHomePath(cwd);
  mkdirSync(join(home, '.config'), { recursive: true });
  env.HOME = home;
  env.XDG_CONFIG_HOME = join(home, '.config');
  env.npm_config_cache = source.npm_config_cache ?? source.NPM_CONFIG_CACHE ?? join(source.HOME ?? tmpdir(), '.npm');
  return env;
}

function createTiming(options = {}) {
  const commandTimeoutMs = options.commandTimeoutMs ?? DEFAULT_COMMAND_TIMEOUT_MS;
  const runTimeoutMs = options.runTimeoutMs ?? DEFAULT_RUN_TIMEOUT_MS;
  const rollbackReserveMs = options.rollbackReserveMs ?? DEFAULT_ROLLBACK_RESERVE_MS;
  return {
    commandTimeoutMs,
    rollbackReserveMs,
    deadline: Date.now() + runTimeoutMs,
  };
}

function nextCommandTimeout(timing) {
  const available = timing.deadline - Date.now() - timing.rollbackReserveMs;
  if (available <= 0) {
    throw new EnvironmentError('override cleanup timed out before the rollback reserve');
  }
  return Math.max(1, Math.min(timing.commandTimeoutMs, available));
}

function runCommand(cwd, command, args, timing) {
  const timeout = nextCommandTimeout(timing);
  const result = spawnSync(
    process.execPath,
    [
      '-e',
      PROCESS_GROUP_RUNNER,
      JSON.stringify({
        command,
        args,
        timeout,
        maxOutputBytes: MAX_COMMAND_OUTPUT_BYTES,
      }),
    ],
    {
      cwd,
      encoding: 'utf8',
      maxBuffer: MAX_COMMAND_OUTPUT_BYTES,
      env: commandEnvironment(cwd),
    }
  );
  if (result.status === 124) {
    return {
      ...result,
      error: Object.assign(new Error(`${command} timed out`), { code: 'ETIMEDOUT' }),
    };
  }
  return result;
}

function parseAuditResult(result) {
  if (result.error || result.signal || ![0, 1].includes(result.status)) {
    if (result.error?.code === 'ETIMEDOUT') {
      throw new EnvironmentError('npm audit timed out');
    }
    throw new EnvironmentError(
      `npm audit could not run: ${result.error?.message ?? result.signal ?? tail(result.stderr)}`
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new EnvironmentError(`npm audit returned invalid JSON: ${tail(result.stdout)}`);
  }
  if (parsed.error) {
    throw new EnvironmentError(`npm audit returned an error: ${JSON.stringify(parsed.error)}`);
  }
  return normalizeAudit(parsed);
}

function parseInstallResult(result) {
  const output = `${result.stdout}\n${result.stderr}`;
  const evidence = tail(output);
  if (result.error || result.signal) {
    if (result.error?.code === 'ETIMEDOUT') {
      throw new EnvironmentError('npm install timed out');
    }
    throw new EnvironmentError(`npm install could not run: ${result.error?.message ?? result.signal}`);
  }
  if (result.status === 0) {
    return { status: 'passed', evidence: '' };
  }
  if (/^npm (?:error|ERR!) code ERESOLVE\b/im.test(output)) {
    return { status: 'eresolve', evidence };
  }
  throw new EnvironmentError(`npm install failed without ERESOLVE: ${evidence}`);
}

function transactionStatePath(cwd) {
  const workspace = createHash('sha256').update(cwd).digest('hex').slice(0, 12);
  return join(process.env.RUNNER_TEMP ?? tmpdir(), `pds-override-transaction-${workspace}.json`);
}

function runAudit(cwd, timing) {
  return parseAuditResult(runCommand(cwd, 'npm', ['audit', '--json'], timing));
}

function runInstall(cwd, timing) {
  return parseInstallResult(runCommand(cwd, 'npm', ['install'], timing));
}

function cleanInstallInputs(cwd, timing) {
  const cleanup = runCommand(cwd, 'npm', ['run', 'npm:remove'], timing);
  if (cleanup.error || cleanup.signal || cleanup.status !== 0) {
    if (cleanup.error?.code === 'ETIMEDOUT') {
      throw new EnvironmentError('npm:remove timed out');
    }
    throw new EnvironmentError(
      `npm:remove could not run: ${cleanup.error?.message ?? cleanup.signal ?? tail(cleanup.stderr)}`
    );
  }
  rmSync(join(cwd, 'package-lock.json'), { force: true });
}

function writeManifest(path, manifest) {
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}

function writeReport(path, report) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
}

function readTransactionState(cwd) {
  try {
    return JSON.parse(readFileSync(transactionStatePath(cwd), 'utf8'));
  } catch (error) {
    throw new EnvironmentError(`override transaction state is unavailable: ${error.message}`);
  }
}

function rejectedReviewer(reason) {
  return {
    verdict: 'changes_requested',
    blocking_issues: [{ file: 'package.json', line: null, description: tail(reason, 600) }],
    suggestions: [],
    observations: [],
    summary: 'Override cleanup did not complete.',
  };
}

function markReportRolledBack(cwd, error) {
  const reportPath = join(cwd, '.turbo-spec/out/override-revalidation.json');
  if (existsSync(reportPath)) {
    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    writeReport(reportPath, {
      ...report,
      complete: false,
      rolledBack: true,
      rollbackReason: tail(error.message, 600),
      reviewer: rejectedReviewer(error.message),
    });
  }
  rmSync(join(cwd, '.turbo-spec/out/override-reviewer.json'), { force: true });
}

function restoreTransaction(cwd, error) {
  const state = readTransactionState(cwd);
  writeFileSync(join(cwd, 'package.json'), Buffer.from(state.originalManifest, 'base64'));
  writeFileSync(join(cwd, 'package-lock.json'), Buffer.from(state.originalLock, 'base64'));
  rmSync(join(cwd, 'node_modules'), { force: true, recursive: true });
  markReportRolledBack(cwd, error);
  rmSync(transactionStatePath(cwd), { force: true });
}

function assertNoAuditAdditions(baseline, current, context) {
  const additions = auditAdditions(baseline, current);
  if (additions.findings.length || additions.affectedNodes.length) {
    throw new AuditRegressionError(`${context}: ${JSON.stringify(additions)}`);
  }
  return additions;
}

function runCleanupTransaction(cwd, initialManifest, manifestPath, timing) {
  let manifest = initialManifest;
  const reportPath = join(cwd, '.turbo-spec/out/override-revalidation.json');
  const candidates = listOverrideLeaves(manifest.overrides ?? {});

  cleanInstallInputs(cwd, timing);
  const baselineInstall = runInstall(cwd, timing);
  if (baselineInstall.status !== 'passed') {
    throw new EnvironmentError('the original override set did not produce a clean baseline install');
  }
  const baseline = runAudit(cwd, timing);
  const state = readTransactionState(cwd);
  writeReport(transactionStatePath(cwd), { ...state, baseline });

  const results = [];
  for (const candidate of candidates) {
    const candidateManifest = structuredClone(manifest);
    removeOverrideLeaf(manifest, candidate.path);
    writeManifest(manifestPath, manifest);
    cleanInstallInputs(cwd, timing);

    const install = runInstall(cwd, timing);
    let result;
    if (install.status === 'eresolve') {
      result = {
        key: candidate.key,
        status: 'retained',
        install: 'eresolve',
        audit: 'not-run',
        reason: 'npm install returned ERESOLVE',
        evidence: { output: install.evidence },
      };
    } else {
      const currentAudit = runAudit(cwd, timing);
      const additions = auditAdditions(baseline, currentAudit);
      if (additions.findings.length || additions.affectedNodes.length) {
        result = {
          key: candidate.key,
          status: 'retained',
          install: 'passed',
          audit: 'regression',
          reason: `audit added ${additions.findings.length} finding(s) and ${additions.affectedNodes.length} affected node(s)`,
          evidence: additions,
        };
      } else {
        result = {
          key: candidate.key,
          status: 'removed',
          install: 'passed',
          audit: 'no-regression',
          reason: 'clean install passed and audit added no finding or affected node',
        };
      }
    }

    if (result.status === 'retained') {
      manifest = candidateManifest;
      writeManifest(manifestPath, manifest);
      cleanInstallInputs(cwd, timing);
      const restoredInstall = runInstall(cwd, timing);
      if (restoredInstall.status !== 'passed') {
        throw new EnvironmentError(`restoring ${candidate.key} did not restore a clean install`);
      }
      assertNoAuditAdditions(baseline, runAudit(cwd, timing), `restoring ${candidate.key}`);
    }

    results.push(result);
    writeReport(reportPath, {
      schemaVersion: 1,
      originalOverrideKeys: candidates.map(({ key }) => key),
      baseline,
      results,
      reviewer: buildReviewerPayload(results),
      complete: false,
    });
  }

  const finalAudit = runAudit(cwd, timing);
  const additions = assertNoAuditAdditions(baseline, finalAudit, 'final audit');
  const report = {
    schemaVersion: 1,
    originalOverrideKeys: candidates.map(({ key }) => key),
    baseline,
    finalAudit,
    additions,
    results,
    reviewer: buildReviewerPayload(results),
    complete: true,
  };
  writeReport(reportPath, report);
  writeReport(join(cwd, '.turbo-spec/out/override-reviewer.json'), report.reviewer);
  return report;
}

function runCleanup(cwd = process.cwd(), options = {}) {
  const manifestPath = join(cwd, 'package.json');
  const lockPath = join(cwd, 'package-lock.json');
  const originalManifest = readFileSync(manifestPath);
  const originalLock = readFileSync(lockPath);
  const manifest = JSON.parse(originalManifest.toString('utf8'));
  const candidates = listOverrideLeaves(manifest.overrides ?? {});
  const timing = createTiming(options);
  writeReport(join(cwd, '.turbo-spec/out/override-revalidation.json'), {
    schemaVersion: 1,
    originalOverrideKeys: candidates.map(({ key }) => key),
    results: [],
    reviewer: rejectedReviewer('override cleanup is still running'),
    complete: false,
  });
  writeReport(transactionStatePath(cwd), {
    originalManifest: originalManifest.toString('base64'),
    originalLock: originalLock.toString('base64'),
  });

  try {
    return runCleanupTransaction(cwd, manifest, manifestPath, timing);
  } catch (error) {
    writeFileSync(manifestPath, originalManifest);
    writeFileSync(lockPath, originalLock);
    rmSync(join(cwd, 'node_modules'), { force: true, recursive: true });
    markReportRolledBack(cwd, error);
    rmSync(transactionStatePath(cwd), { force: true });
    throw error;
  } finally {
    rmSync(commandHomePath(cwd), { force: true, recursive: true });
  }
}

function runValidationCommand(cwd, script, timing) {
  const result = runCommand(cwd, 'npm', ['run', script], timing);
  if (result.error || result.signal) {
    if (result.error?.code === 'ETIMEDOUT') {
      throw new EnvironmentError(`${script} timed out`);
    }
    throw new EnvironmentError(`${script} could not run: ${result.error?.message ?? result.signal}`);
  }
  if (result.status === 1) {
    throw new ValidationError(`${script} failed: ${tail(`${result.stdout}\n${result.stderr}`)}`);
  }
  if (result.status !== 0) {
    throw new EnvironmentError(`${script} could not run: ${tail(`${result.stdout}\n${result.stderr}`)}`);
  }
}

function workspaceStateHash(cwd, timing) {
  const listed = runCommand(cwd, 'git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], timing);
  if (listed.error || listed.signal || listed.status !== 0) {
    throw new EnvironmentError(
      `git ls-files could not run: ${listed.error?.message ?? listed.signal ?? tail(listed.stderr)}`
    );
  }

  const paths = listed.stdout
    .split('\0')
    .filter(Boolean)
    .filter(
      (path) =>
        path !== ALLOWED_DOCUMENTATION_PATH &&
        path !== CLEANUP_STATE_PATH &&
        !RUNTIME_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
    )
    .sort();
  const hash = createHash('sha256');
  for (const path of paths) {
    hash.update(`${path}\0`);
    try {
      const stat = lstatSync(join(cwd, path));
      if (stat.isSymbolicLink()) {
        hash.update(`symlink\0${readlinkSync(join(cwd, path))}\0`);
      } else if (stat.isFile()) {
        hash.update('file\0');
        hash.update(readFileSync(join(cwd, path)));
        hash.update('\0');
      } else {
        hash.update(`other:${stat.mode}\0`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      hash.update('missing\0');
    }
  }
  return hash.digest('hex');
}

function readProtectedState(cwd, timing) {
  const committed = runCommand(cwd, 'git', ['show', `HEAD:${CLEANUP_STATE_PATH}`], timing);
  if (!committed.error && !committed.signal && committed.status === 0) {
    return JSON.parse(committed.stdout);
  }
  try {
    return JSON.parse(readFileSync(join(cwd, CLEANUP_STATE_PATH), 'utf8'));
  } catch (error) {
    throw new EnvironmentError(`protected cleanup state is unavailable: ${error.message}`);
  }
}

function runGate(cwd = process.cwd(), gate, options = {}) {
  const timing = createTiming(options);
  const state = readTransactionState(cwd);
  try {
    if (gate === 'install') {
      const install = runInstall(cwd, timing);
      if (install.status !== 'passed') {
        throw new ValidationError('final npm install failed with ERESOLVE');
      }
    } else if (gate === 'audit') {
      assertNoAuditAdditions(state.baseline, runAudit(cwd, timing), 'quality gate audit');
    } else if (gate === 'format') {
      runValidationCommand(cwd, 'npm:format', timing);
    } else if (gate === 'lint') {
      runValidationCommand(cwd, 'npm:lint', timing);
    } else {
      throw new EnvironmentError('usage: revalidate-overrides.mjs gate <install|audit|format|lint>');
    }
  } catch (error) {
    restoreTransaction(cwd, error);
    throw error;
  } finally {
    rmSync(commandHomePath(cwd), { force: true, recursive: true });
  }
  if (gate === 'lint') {
    const protectedStateHash = workspaceStateHash(cwd, timing);
    writeReport(join(cwd, CLEANUP_STATE_PATH), { schemaVersion: 1, protectedStateHash });
    writeReport(transactionStatePath(cwd), { protectedStateHash });
  }
}

function verifyDocumentationChanges(cwd = process.cwd(), options = {}) {
  const timing = createTiming(options);
  try {
    const expected = readProtectedState(cwd, timing).protectedStateHash;
    const actual = workspaceStateHash(cwd, timing);
    if (!expected || actual !== expected) {
      throw new ValidationError('documentation agent changed files outside docs/dependencies.md');
    }
    rmSync(join(cwd, CLEANUP_STATE_PATH), { force: true });
    rmSync(transactionStatePath(cwd), { force: true });
  } finally {
    rmSync(commandHomePath(cwd), { force: true, recursive: true });
  }
}

function verifyFinalAudit(cwd = process.cwd(), options = {}) {
  const statePath = transactionStatePath(cwd);
  const baseline = existsSync(statePath)
    ? readTransactionState(cwd).baseline
    : JSON.parse(readFileSync(join(cwd, '.turbo-spec/out/override-revalidation.json'), 'utf8')).baseline;
  try {
    assertNoAuditAdditions(baseline, runAudit(cwd, createTiming(options)), 'quality gate audit');
  } finally {
    rmSync(commandHomePath(cwd), { force: true, recursive: true });
  }
}

function withFakeNpm(manifest, test) {
  const root = mkdtempSync(join(tmpdir(), 'override-cleanup-self-test-'));
  const bin = join(root, 'bin');
  mkdirSync(bin);
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  const lockText = '{"original":true}\n';
  writeFileSync(join(root, 'package.json'), manifestText);
  writeFileSync(join(root, 'package-lock.json'), lockText);
  writeFileSync(
    join(root, '.gitignore'),
    `${['node_modules/', 'bin/', '.fake*', '.fail-lint', '.turbo-spec/out/', '.sessions/'].join('\n')}\n`
  );
  mkdirSync(join(root, 'docs'), { recursive: true });
  writeFileSync(join(root, 'docs/dependencies.md'), 'Original override documentation.\n');
  mkdirSync(join(root, 'packages/workspace/node_modules'), { recursive: true });
  writeFileSync(join(root, 'packages/workspace/node_modules/stale'), 'stale');
  for (const args of [
    ['init', '-q'],
    ['add', '.'],
    ['-c', 'user.name=Self Test', '-c', 'user.email=self-test@example.com', 'commit', '-qm', 'baseline'],
  ]) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
  const npmPath = join(bin, 'npm');
  writeFileSync(
    npmPath,
    `#!/usr/bin/env node
const fs = require('node:fs');
const manifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const command = process.argv[2];
fs.writeFileSync(
  '.fake-command-env',
  JSON.stringify({
    copilot: process.env.COPILOT_TRAMPOLINE_TOKEN,
    figma: process.env.FIGMA_ACCESS_TOKEN,
    jira: process.env.JIRA_PAT,
  }),
);
if (command === 'run') {
  if (process.argv[3] === 'npm:remove') {
    fs.rmSync('node_modules', { force: true, recursive: true });
    fs.rmSync('packages/workspace/node_modules', { force: true, recursive: true });
    process.exit(0);
  }
  if (process.argv[3] === 'npm:format' || process.argv[3] === 'npm:lint') {
    if (process.argv[3] === 'npm:lint' && fs.existsSync('.fail-lint')) {
      console.error('lint failed');
      process.exit(1);
    }
    process.exit(0);
  }
}
if (command === 'install') {
  if (manifest.name === 'baseline-failure') {
    console.error('network unavailable');
    process.exit(2);
  }
  if (manifest.name === 'timeout-fixture' && !manifest.overrides?.timeout) {
    const { spawn } = require('node:child_process');
    spawn(
      process.execPath,
      [
        '-e',
        "const fs=require('node:fs'); process.on('SIGTERM',()=>{}); fs.writeFileSync('.timeout-grandchild-started','yes'); setTimeout(()=>fs.writeFileSync('.timeout-grandchild','alive'),1500)",
      ],
      { stdio: 'ignore' },
    );
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);
  }
  if (manifest.name === 'rollback-fixture' && !manifest.overrides?.fatal) {
    console.error('network unavailable');
    process.exit(2);
  }
  if (!manifest.overrides?.peer && manifest.name === 'cleanup-fixture') {
    console.error('npm error code ERESOLVE');
    process.exit(1);
  }
  fs.writeFileSync(
    'package-lock.json',
    JSON.stringify({ lockfileVersion: 3, overrides: manifest.overrides ?? {} }) + '\\n',
  );
  process.exit(0);
}
if (command === 'audit') {
  const auditCountPath = '.fake-audit-count';
  const auditCount = Number(fs.existsSync(auditCountPath) ? fs.readFileSync(auditCountPath, 'utf8') : 0) + 1;
  fs.writeFileSync(auditCountPath, String(auditCount));
  if (manifest.name === 'final-audit-failure' && auditCount === 3) {
    console.error('registry unavailable');
    process.exit(2);
  }
  const vulnerable = manifest.name === 'cleanup-fixture' && !manifest.overrides?.security;
  const vulnerabilities = vulnerable
    ? {
        vulnerable: {
          severity: 'high',
          via: [{ source: 99, title: 'fixture advisory', severity: 'high' }],
          nodes: ['node_modules/vulnerable'],
        },
      }
    : {};
  console.log(
    JSON.stringify({
      auditReportVersion: 2,
      vulnerabilities,
      metadata: { vulnerabilities: { high: vulnerable ? 1 : 0, total: vulnerable ? 1 : 0 } },
    }),
  );
  process.exit(vulnerable ? 1 : 0);
}
console.error('unexpected command');
process.exit(2);
`
  );
  chmodSync(npmPath, 0o755);

  const originalPath = process.env.PATH;
  process.env.PATH = `${bin}:${originalPath}`;
  try {
    return test({ root, manifestText, lockText });
  } finally {
    process.env.PATH = originalPath;
    rmSync(transactionStatePath(root), { force: true });
    rmSync(commandHomePath(root), { force: true, recursive: true });
    rmSync(root, { force: true, recursive: true });
  }
}

function runSelfTest() {
  const baseline = normalizeAudit(baselineFixture);
  assert.deepEqual(baseline.findings, ['["glob","package:minimatch","high"]', '["minimatch","advisory:1234","high"]']);
  assert.deepEqual(baseline.affectedNodes, ['["glob","node_modules/glob"]', '["minimatch","node_modules/minimatch"]']);

  const improved = structuredClone(baselineFixture);
  delete improved.vulnerabilities.glob;
  assert.deepEqual(auditAdditions(baseline, normalizeAudit(improved)), {
    findings: [],
    affectedNodes: [],
  });

  const regressed = structuredClone(baselineFixture);
  regressed.vulnerabilities.minimatch.nodes.push('node_modules/karma/node_modules/minimatch');
  assert.deepEqual(auditAdditions(baseline, normalizeAudit(regressed)).affectedNodes, [
    '["minimatch","node_modules/karma/node_modules/minimatch"]',
  ]);

  assert.deepEqual(
    normalizeAudit({
      auditReportVersion: 2,
      vulnerabilities: {
        package: { severity: 'moderate', range: '<2.0.0', via: [], nodes: [] },
      },
    }).findings,
    ['["package","range:<2.0.0","moderate"]']
  );
  assert.throws(
    () => normalizeAudit({ auditReportVersion: 2, vulnerabilities: null }),
    /auditReportVersion 2 vulnerability map/
  );

  const manifest = {
    overrides: {
      plain: '^1.2.3',
      madge: { typescript: '$typescript' },
      parent: { first: '1.0.0', second: '2.0.0' },
    },
  };
  const leaves = listOverrideLeaves(manifest.overrides);
  assert.deepEqual(
    leaves.map(({ key }) => key),
    ['plain', 'madge > typescript', 'parent > first', 'parent > second']
  );

  removeOverrideLeaf(manifest, ['madge', 'typescript']);
  assert.equal('madge' in manifest.overrides, false);

  removeOverrideLeaf(manifest, ['parent', 'first']);
  assert.deepEqual(manifest.overrides.parent, { second: '2.0.0' });

  const results = leaves.map(({ key }, index) => ({
    key,
    status: index === 0 ? 'removed' : 'retained',
    install: index === 1 ? 'eresolve' : 'passed',
    audit: index === 2 ? 'regression' : 'no-regression',
    reason: 'self-test',
  }));
  const reviewer = buildReviewerPayload(results);
  assert.equal(reviewer.observations.length, leaves.length);
  assert.equal(reviewer.verdict, 'approved');

  assert.deepEqual(
    parseAuditResult({
      status: 1,
      stdout: JSON.stringify(baselineFixture),
      stderr: '',
      signal: null,
      error: undefined,
    }),
    normalizeAudit(baselineFixture)
  );
  assert.throws(
    () =>
      parseAuditResult({
        status: 2,
        stdout: '',
        stderr: 'registry unavailable',
        signal: null,
        error: undefined,
      }),
    /npm audit could not run/
  );

  assert.deepEqual(parseInstallResult({ status: 0, stdout: '', stderr: '', signal: null, error: undefined }), {
    status: 'passed',
    evidence: '',
  });
  assert.equal(
    parseInstallResult({
      status: 1,
      stdout: '',
      stderr: 'npm error code ERESOLVE',
      signal: null,
      error: undefined,
    }).status,
    'eresolve'
  );
  assert.equal(
    parseInstallResult({
      status: 1,
      stdout: `npm error code ERESOLVE\n${'x'.repeat(3000)}`,
      stderr: '',
      signal: null,
      error: undefined,
    }).status,
    'eresolve'
  );
  assert.throws(
    () =>
      parseInstallResult({
        status: 1,
        stdout: '',
        stderr: 'For troubleshooting, see the ERESOLVE documentation.',
        signal: null,
        error: undefined,
      }),
    /without ERESOLVE/
  );
  assert.throws(
    () =>
      parseInstallResult({
        status: 1,
        stdout: '',
        stderr: 'network unavailable',
        signal: null,
        error: undefined,
      }),
    /without ERESOLVE/
  );

  const sensitiveEnvironment = {
    COPILOT_TRAMPOLINE_TOKEN: process.env.COPILOT_TRAMPOLINE_TOKEN,
    FIGMA_ACCESS_TOKEN: process.env.FIGMA_ACCESS_TOKEN,
    JIRA_PAT: process.env.JIRA_PAT,
  };
  Object.assign(process.env, {
    COPILOT_TRAMPOLINE_TOKEN: 'copilot-secret',
    FIGMA_ACCESS_TOKEN: 'figma-secret',
    JIRA_PAT: 'jira-secret',
  });
  try {
    withFakeNpm(
      {
        name: 'cleanup-fixture',
        overrides: { peer: '1.0.0', security: '1.0.0', stale: '1.0.0' },
      },
      ({ root }) => {
        const report = runCleanup(root);
        assert.deepEqual(
          report.results.map(({ key, status }) => ({ key, status })),
          [
            { key: 'peer', status: 'retained' },
            { key: 'security', status: 'retained' },
            { key: 'stale', status: 'removed' },
          ]
        );
        assert.deepEqual(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).overrides, {
          peer: '1.0.0',
          security: '1.0.0',
        });
        const peerResult = report.results.find(({ key }) => key === 'peer');
        assert.equal(peerResult.reason, 'npm install returned ERESOLVE');
        assert.match(peerResult.evidence.output, /npm error code ERESOLVE/);
        assert.deepEqual(report.results.find(({ key }) => key === 'security').evidence, {
          findings: ['["vulnerable","advisory:99","high"]'],
          affectedNodes: ['["vulnerable","node_modules/vulnerable"]'],
        });
        assert.equal(report.reviewer.observations.length, 3);
        assert.deepEqual(report.additions, { findings: [], affectedNodes: [] });
        assert.equal(existsSync(join(root, 'packages/workspace/node_modules')), false);
        assert.deepEqual(JSON.parse(readFileSync(join(root, '.fake-command-env'), 'utf8')), {});
        assert.deepEqual(
          JSON.parse(readFileSync(join(root, '.turbo-spec/out/override-reviewer.json'), 'utf8')),
          report.reviewer
        );
        for (const gate of ['install', 'audit', 'format', 'lint']) {
          runGate(root, gate);
        }
        assert.equal(existsSync(transactionStatePath(root)), true);
        assert.equal(existsSync(join(root, '.turbo-spec/override-cleanup-state.json')), true);
        for (const args of [
          ['add', '-A'],
          ['-c', 'user.name=Self Test', '-c', 'user.email=self-test@example.com', 'commit', '-qm', 'cleanup'],
        ]) {
          const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
          assert.equal(result.status, 0, result.stderr);
        }
        writeFileSync(join(root, 'docs/dependencies.md'), 'Updated override documentation.\n');
        verifyDocumentationChanges(root);
        assert.equal(existsSync(transactionStatePath(root)), false);
        assert.equal(existsSync(join(root, '.turbo-spec/override-cleanup-state.json')), false);
      }
    );
  } finally {
    for (const [key, value] of Object.entries(sensitiveEnvironment)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }

  withFakeNpm({ name: 'rollback-fixture', overrides: { fatal: '1.0.0' } }, ({ root, manifestText, lockText }) => {
    assert.throws(() => runCleanup(root), /without ERESOLVE/);
    assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), manifestText);
    assert.equal(readFileSync(join(root, 'package-lock.json'), 'utf8'), lockText);

    withFakeNpm({ name: 'write-scope-fixture', overrides: { stale: '1.0.0' } }, ({ root }) => {
      runCleanup(root);
      for (const gate of ['install', 'audit', 'format', 'lint']) {
        runGate(root, gate);
      }
      for (const args of [
        ['add', '-A'],
        ['-c', 'user.name=Self Test', '-c', 'user.email=self-test@example.com', 'commit', '-qm', 'cleanup'],
      ]) {
        const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
        assert.equal(result.status, 0, result.stderr);
      }
      writeFileSync(join(root, 'unexpected-source.js'), 'unexpected');
      assert.throws(() => verifyDocumentationChanges(root), /outside docs\/dependencies\.md/);
    });
  });

  withFakeNpm({ name: 'final-audit-failure', overrides: { stale: '1.0.0' } }, ({ root }) => {
    assert.throws(() => runCleanup(root), /npm audit could not run/);
    const report = JSON.parse(readFileSync(join(root, '.turbo-spec/out/override-revalidation.json'), 'utf8'));
    assert.equal(report.complete, false);
  });

  withFakeNpm({ name: 'baseline-failure', overrides: { stale: '1.0.0' } }, ({ root }) => {
    assert.throws(() => runCleanup(root), /without ERESOLVE/);
    const report = JSON.parse(readFileSync(join(root, '.turbo-spec/out/override-revalidation.json'), 'utf8'));
    assert.equal(report.complete, false);
    assert.equal(report.rolledBack, true);
  });

  withFakeNpm({ name: 'timeout-fixture', overrides: { timeout: '1.0.0' } }, ({ root, manifestText, lockText }) => {
    assert.throws(
      () =>
        runCleanup(root, {
          commandTimeoutMs: 1000,
          runTimeoutMs: 5000,
          rollbackReserveMs: 500,
        }),
      /timed out/
    );
    assert.equal(existsSync(join(root, '.timeout-grandchild-started')), true);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 2000);
    assert.equal(existsSync(join(root, '.timeout-grandchild')), false);
    assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), manifestText);
    assert.equal(readFileSync(join(root, 'package-lock.json'), 'utf8'), lockText);
  });

  withFakeNpm({ name: 'gate-rollback-fixture', overrides: { stale: '1.0.0' } }, ({ root, manifestText, lockText }) => {
    runCleanup(root);
    writeFileSync(join(root, '.fail-lint'), '');
    assert.throws(() => runGate(root, 'lint'), /npm:lint failed/);
    assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), manifestText);
    assert.equal(readFileSync(join(root, 'package-lock.json'), 'utf8'), lockText);
    const report = JSON.parse(readFileSync(join(root, '.turbo-spec/out/override-revalidation.json'), 'utf8'));
    assert.equal(report.complete, false);
    assert.equal(report.rolledBack, true);
    assert.equal(existsSync(join(root, '.turbo-spec/out/override-reviewer.json')), false);
  });
}

function main() {
  switch (process.argv[2] ?? 'run') {
    case '--self-test':
      runSelfTest();
      console.warn('override audit self-test passed');
      return;
    case 'run':
      runCleanup();
      return;
    case 'verify':
      verifyFinalAudit();
      return;
    case 'gate':
      runGate(process.cwd(), process.argv[3]);
      return;
    case 'verify-docs':
      verifyDocumentationChanges();
      return;
    default:
      throw new EnvironmentError(
        'usage: revalidate-overrides.mjs [run|verify|verify-docs|--self-test|gate <install|audit|format|lint>]'
      );
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = error instanceof ValidationError ? 1 : 2;
}
