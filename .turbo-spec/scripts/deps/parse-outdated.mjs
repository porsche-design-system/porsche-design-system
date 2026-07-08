// Parses `syncpack update --check` stdout into a machine-readable outdated report.
//
// syncpack emits one line per outdated dependency in the shape:
//   "   2x @angular/build ^22.0.4 (~14d) → ^22.0.5 (~7d)"
// interspersed with group headers ("= Default Version Group ===…"), a blank
// line, and a summary footer ("18 major, 43 minor, 103 patch updates").
//
// The workflow FREEZES the parsed `to` specifier — the decide agent groups and
// filters dependencies but never re-chooses a target version.

const ARROW = '\u2192'; // →

// Leading count, name, from-specifier, (age), arrow, to-specifier, (age).
const DEP_LINE = new RegExp(
  String.raw`^\s*(\d+)x\s+(\S+)\s+(\S+)\s+\([^)]*\)\s+` +
    ARROW +
    String.raw`\s+(\S+)\s+\([^)]*\)\s*$`
);

const SUMMARY_LINE = /(\d+)\s+major,\s+(\d+)\s+minor,\s+(\d+)\s+patch\s+updates/;

/** Strip a leading semver range operator (^ ~ >= <= > < =) and any `v` prefix. */
function stripRange(spec) {
  return spec.replace(/^[\^~><=v\s]+/, '').trim();
}

/** Classify the semver bump between two specifiers: major | minor | patch | other. */
export function classifyBump(from, to) {
  const f = stripRange(from).split('.');
  const t = stripRange(to).split('.');
  const toInt = (x) => {
    const n = Number.parseInt(x, 10);
    return Number.isNaN(n) ? null : n;
  };
  const [fMaj, fMin, fPat] = [toInt(f[0]), toInt(f[1]), toInt(f[2])];
  const [tMaj, tMin, tPat] = [toInt(t[0]), toInt(t[1]), toInt(t[2])];
  if ([fMaj, tMaj].some((n) => n === null)) return 'other';
  if (tMaj !== fMaj) return 'major';
  if ([fMin, tMin].some((n) => n === null)) return 'other';
  if (tMin !== fMin) return 'minor';
  if ([fPat, tPat].some((n) => n === null)) return 'other';
  if (tPat !== fPat) return 'patch';
  return 'other';
}

/**
 * Parse raw `syncpack update --check` output into a structured report object.
 * @param {string} text raw stdout
 * @returns {{updates_exist: boolean, summary: {major:number,minor:number,patch:number}|null, dependencies: Array}}
 */
export function parseSyncpackOutput(text) {
  const dependencies = [];
  let summary = null;
  for (const rawLine of String(text).split(/\r?\n/)) {
    const depMatch = rawLine.match(DEP_LINE);
    if (depMatch) {
      const [, count, name, from, to] = depMatch;
      dependencies.push({
        name,
        from,
        to,
        instances: Number.parseInt(count, 10),
        bump: classifyBump(from, to),
      });
      continue;
    }
    const sumMatch = rawLine.match(SUMMARY_LINE);
    if (sumMatch) {
      summary = {
        major: Number.parseInt(sumMatch[1], 10),
        minor: Number.parseInt(sumMatch[2], 10),
        patch: Number.parseInt(sumMatch[3], 10),
      };
    }
  }
  return {
    updates_exist: dependencies.length > 0,
    summary,
    dependencies,
  };
}

/** Build the full report artifact (adds a generated_at timestamp). */
export function buildReport(text, now = new Date()) {
  return { generated_at: now.toISOString(), ...parseSyncpackOutput(text) };
}

/** Dependency sections the workflow can actually write (and thus bump). */
export const WRITABLE_SECTIONS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

/**
 * Collect every dependency name declared in a writable section of any
 * package.json under `repoRoot`. Names appearing ONLY in `overrides` /
 * `resolutions` (hand-curated transitive-security pins) are intentionally
 * NOT collected — the automation must never bump them.
 *
 * @param {string} repoRoot repository root to scan
 * @returns {Set<string>} declared names
 */
export function collectWritableDeps(repoRoot, deps = {}) {
  const { readFileSync } = deps.fs;
  const files = findPackageJsons(repoRoot, deps);
  const names = new Set();
  for (const file of files) {
    let pkg;
    try {
      pkg = JSON.parse(readFileSync(file, 'utf8'));
    } catch {
      continue; // skip unreadable/invalid package.json
    }
    for (const section of WRITABLE_SECTIONS) {
      const block = pkg[section];
      if (block && typeof block === 'object') {
        for (const name of Object.keys(block)) names.add(name);
      }
    }
  }
  return names;
}

/** Recursively find package.json files, skipping node_modules and dotdirs. */
export function findPackageJsons(repoRoot, deps = {}) {
  const { readdirSync } = deps.fs;
  const { join } = deps.path;
  const out = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const name = entry.name;
      if (entry.isDirectory()) {
        if (name === 'node_modules' || name.startsWith('.')) continue;
        walk(join(dir, name));
      } else if (name === 'package.json') {
        out.push(join(dir, name));
      }
    }
  };
  walk(repoRoot);
  return out;
}

/**
 * Partition a parsed report against the repo's writable dependency sections.
 * Deps whose name is not declared in any writable section (overrides-only
 * security pins) are moved to `overrides_skipped` and excluded from bumps.
 *
 * @param {ReturnType<typeof buildReport>} report
 * @param {string} repoRoot
 * @returns {typeof report & {overrides_skipped: Array<{name,from,to}>}}
 */
export function partitionOverrides(report, repoRoot, deps = {}) {
  const declared = collectWritableDeps(repoRoot, deps);
  const dependencies = [];
  const overrides_skipped = [];
  for (const dep of report.dependencies) {
    if (declared.has(dep.name)) {
      dependencies.push(dep);
    } else {
      overrides_skipped.push({ name: dep.name, from: dep.from, to: dep.to });
    }
  }
  return {
    ...report,
    updates_exist: dependencies.length > 0,
    dependencies,
    overrides_skipped,
  };
}

// --- CLI: read stdin (or a file arg), write JSON report to stdout or --out ---
async function main(argv) {
  const args = argv.slice(2);
  let inFile = null;
  let outFile = null;
  let repoRoot = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') outFile = args[++i];
    else if (args[i] === '--repo') repoRoot = args[++i];
    else if (!inFile) inFile = args[i];
  }
  const { readFileSync, writeFileSync } = await import('node:fs');
  const text = inFile
    ? readFileSync(inFile, 'utf8')
    : readFileSync(0, 'utf8'); // fd 0 = stdin
  let report = buildReport(text);
  if (repoRoot) {
    const fs = await import('node:fs');
    const path = await import('node:path');
    report = partitionOverrides(report, repoRoot, { fs, path });
  }
  const json = `${JSON.stringify(report, null, 2)}\n`;
  if (outFile) writeFileSync(outFile, json);
  else process.stdout.write(json);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv).catch((err) => {
    console.error(err.message);
    process.exit(2);
  });
}
