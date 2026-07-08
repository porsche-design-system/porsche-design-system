// Classifies a failed `npm install` log into a routable category.
//   peer_conflict_ts_angular  -> back to decide (hold TS/Angular differently)
//   peer_conflict_thirdparty  -> resolve-conflicts (add scoped override)
//   registry | postinstall | unknown -> escalate
//
// Pure `classify(text)` returns { kind, packages, detail }.

const ANGULAR_RE = /@angular\//i;
const TYPESCRIPT_RE = /\btypescript\b/i;

/** Extract distinct package names implicated in ERESOLVE peer conflicts. */
function extractConflictPackages(text) {
  const names = new Set();
  const patterns = [
    /peer\s+(@?[\w./-]+)@/gi,
    /Could not resolve dependency:\s*\n?.*?(@?[\w./-]+)@/gi,
    /Found:\s*(@?[\w./-]+)@/gi,
    /node_modules\/(@?[\w./-]+)/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text)) !== null) {
      const name = m[1];
      if (name && !name.startsWith('.')) names.add(name);
    }
  }
  return [...names];
}

export function classify(text) {
  const t = String(text || '');

  if (/ERESOLVE/i.test(t)) {
    const packages = extractConflictPackages(t);
    const touchesAngular = ANGULAR_RE.test(t);
    const touchesTs = TYPESCRIPT_RE.test(t);
    if (touchesAngular && touchesTs) {
      return {
        kind: 'peer_conflict_ts_angular',
        packages: packages.filter((p) => ANGULAR_RE.test(p) || TYPESCRIPT_RE.test(p)),
        detail: 'ERESOLVE peer conflict involving TypeScript and Angular',
      };
    }
    return {
      kind: 'peer_conflict_thirdparty',
      packages,
      detail: 'ERESOLVE peer conflict against a third-party dependency',
    };
  }

  if (/ETARGET|No matching version|notarget|404 Not Found|ENOTFOUND|ECONNRESET|network|EAI_AGAIN|registry\.npmjs/i.test(t)) {
    return { kind: 'registry', packages: [], detail: 'registry/network error during install' };
  }

  if (/postinstall|lifecycle script|prepare\b|node-gyp|gyp ERR/i.test(t)) {
    return { kind: 'postinstall', packages: [], detail: 'lifecycle/postinstall script failure' };
  }

  return { kind: 'unknown', packages: [], detail: 'unrecognised install failure' };
}

async function main(argv) {
  const args = argv.slice(2);
  let inFile = null;
  let outFile = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') outFile = args[++i];
    else if (!inFile) inFile = args[i];
  }
  const { readFileSync, writeFileSync } = await import('node:fs');
  const text = inFile ? readFileSync(inFile, 'utf8') : readFileSync(0, 'utf8');
  const record = classify(text);
  const json = `${JSON.stringify(record, null, 2)}\n`;
  if (outFile) writeFileSync(outFile, json);
  else process.stdout.write(json);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv).catch((err) => {
    console.error(err.message);
    process.exit(2);
  });
}
