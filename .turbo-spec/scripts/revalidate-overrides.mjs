import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
class AuditRegressionError extends Error {}

function tail(text, limit = 2000) {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(-limit);
}

function parseAuditResult(result) {
  if (result.error || result.signal || ![0, 1].includes(result.status)) {
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
  const evidence = tail(`${result.stdout}\n${result.stderr}`);
  if (result.error || result.signal) {
    throw new EnvironmentError(`npm install could not run: ${result.error?.message ?? result.signal}`);
  }
  if (result.status === 0) {
    return { status: 'passed', evidence: '' };
  }
  if (evidence.includes('ERESOLVE')) {
    return { status: 'eresolve', evidence };
  }
  throw new EnvironmentError(`npm install failed without ERESOLVE: ${evidence}`);
}

function trustedBaselinePath(cwd) {
  const workspace = createHash('sha256').update(cwd).digest('hex').slice(0, 12);
  return join(process.env.RUNNER_TEMP ?? tmpdir(), `pds-override-audit-${workspace}.json`);
}

function runAudit(cwd) {
  return parseAuditResult(
    spawnSync('npm', ['audit', '--json'], {
      cwd,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    })
  );
}

function runInstall(cwd) {
  return parseInstallResult(
    spawnSync('npm', ['install'], {
      cwd,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    })
  );
}

function cleanInstallInputs(cwd) {
  rmSync(join(cwd, 'package-lock.json'), { force: true });
  rmSync(join(cwd, 'node_modules'), { force: true, recursive: true });
}

function writeManifest(path, manifest) {
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}

function writeReport(path, report) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(report, null, 2)}\n`);
}

function assertNoAuditAdditions(baseline, current, context) {
  const additions = auditAdditions(baseline, current);
  if (additions.findings.length || additions.affectedNodes.length) {
    throw new AuditRegressionError(`${context}: ${JSON.stringify(additions)}`);
  }
  return additions;
}

function runCleanupTransaction(cwd, initialManifest, manifestPath) {
  let manifest = initialManifest;
  const reportPath = join(cwd, '.turbo-spec/out/override-revalidation.json');
  const candidates = listOverrideLeaves(manifest.overrides ?? {});

  cleanInstallInputs(cwd);
  const baselineInstall = runInstall(cwd);
  if (baselineInstall.status !== 'passed') {
    throw new EnvironmentError('the original override set did not produce a clean baseline install');
  }
  const baseline = runAudit(cwd);
  writeReport(trustedBaselinePath(cwd), baseline);

  const results = [];
  for (const candidate of candidates) {
    const candidateManifest = structuredClone(manifest);
    removeOverrideLeaf(manifest, candidate.path);
    writeManifest(manifestPath, manifest);
    cleanInstallInputs(cwd);

    const install = runInstall(cwd);
    let result;
    if (install.status === 'eresolve') {
      result = {
        key: candidate.key,
        status: 'retained',
        install: 'eresolve',
        audit: 'not-run',
        reason: tail(install.evidence, 600),
      };
    } else {
      const currentAudit = runAudit(cwd);
      const additions = auditAdditions(baseline, currentAudit);
      if (additions.findings.length || additions.affectedNodes.length) {
        result = {
          key: candidate.key,
          status: 'retained',
          install: 'passed',
          audit: 'regression',
          reason: tail(JSON.stringify(additions), 600),
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
      cleanInstallInputs(cwd);
      const restoredInstall = runInstall(cwd);
      if (restoredInstall.status !== 'passed') {
        throw new EnvironmentError(`restoring ${candidate.key} did not restore a clean install`);
      }
      assertNoAuditAdditions(baseline, runAudit(cwd), `restoring ${candidate.key}`);
    }

    results.push(result);
    writeReport(reportPath, {
      schemaVersion: 1,
      originalOverrideKeys: candidates.map(({ key }) => key),
      baseline,
      results,
      reviewer: buildReviewerPayload(results),
      complete: results.length === candidates.length,
    });
  }

  const finalAudit = runAudit(cwd);
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
  return report;
}

function runCleanup(cwd = process.cwd()) {
  const manifestPath = join(cwd, 'package.json');
  const lockPath = join(cwd, 'package-lock.json');
  const originalManifest = readFileSync(manifestPath);
  const originalLock = readFileSync(lockPath);

  try {
    return runCleanupTransaction(cwd, JSON.parse(originalManifest.toString('utf8')), manifestPath);
  } catch (error) {
    writeFileSync(manifestPath, originalManifest);
    writeFileSync(lockPath, originalLock);
    rmSync(join(cwd, 'node_modules'), { force: true, recursive: true });
    throw error;
  }
}

function verifyFinalAudit(cwd = process.cwd()) {
  const baseline = JSON.parse(readFileSync(trustedBaselinePath(cwd), 'utf8'));
  assertNoAuditAdditions(baseline, runAudit(cwd), 'quality gate audit');
}

function withFakeNpm(manifest, test) {
  const root = mkdtempSync(join(tmpdir(), 'override-cleanup-self-test-'));
  const bin = join(root, 'bin');
  mkdirSync(bin);
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  const lockText = '{"original":true}\n';
  writeFileSync(join(root, 'package.json'), manifestText);
  writeFileSync(join(root, 'package-lock.json'), lockText);
  const npmPath = join(bin, 'npm');
  writeFileSync(
    npmPath,
    `#!/usr/bin/env node
const fs = require('node:fs');
const manifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const command = process.argv[2];
if (command === 'install') {
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
    if (typeof trustedBaselinePath === 'function') {
      rmSync(trustedBaselinePath(root), { force: true });
    }
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
      assert.equal(report.reviewer.observations.length, 3);
      assert.deepEqual(report.additions, { findings: [], affectedNodes: [] });
    }
  );

  withFakeNpm({ name: 'rollback-fixture', overrides: { fatal: '1.0.0' } }, ({ root, manifestText, lockText }) => {
    assert.throws(() => runCleanup(root), /without ERESOLVE/);
    assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), manifestText);
    assert.equal(readFileSync(join(root, 'package-lock.json'), 'utf8'), lockText);
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
    default:
      throw new EnvironmentError('usage: revalidate-overrides.mjs [run|verify|--self-test]');
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = error instanceof AuditRegressionError ? 1 : 2;
}
