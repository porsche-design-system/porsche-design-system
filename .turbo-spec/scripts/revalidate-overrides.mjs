import assert from 'node:assert/strict';

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
}

if (process.argv[2] === '--self-test') {
  runSelfTest();
  console.warn('override audit self-test passed');
}
