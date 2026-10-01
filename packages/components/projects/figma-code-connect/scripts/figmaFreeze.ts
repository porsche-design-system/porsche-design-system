import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { pull } from './figmaPull';

// Writes a pull of the library to the fixture the template snapshots render from; rerun it when the library changes.
// Rationale: docs/runbooks/figma-code-connect.md.
const fixturePath = 'tests/unit/fixtures/library.json';

const main = async (): Promise<void> => {
  // the pull's order is kept: the icon manifest keeps the first node per icon name
  const snapshot = await pull();
  mkdirSync(dirname(fixturePath), { recursive: true });
  writeFileSync(fixturePath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(
    `froze ${snapshot.components.length} component sets and ${Object.keys(snapshot.icons).length} icon names into ${fixturePath}`
  );
};

main();
