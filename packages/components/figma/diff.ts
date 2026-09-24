import { type Component, definitions, type Snapshot } from './snapshot';

type Pulled = Pick<Snapshot, 'components' | 'icons'>;

const quote = (value: unknown): string => JSON.stringify(value);

/**
 * Every difference between the committed snapshot and a fresh pull, one readable line each; empty when they are equal.
 * Read by `figma:pull --check`, which exits 1 on any line. The last check compares the two as data, so a field this
 * function does not know still fails instead of slipping through.
 */
export const diffSnapshots = (committed: Pulled, fresh: Pulled): string[] => {
  const lines: string[] = [];
  for (const set of fresh.components) {
    const old = committed.components.find((c) => c.id === set.id);
    if (!old) {
      lines.push(`${set.name} (${set.id}): new component set`);
      continue;
    }
    if (old.name !== set.name)
      lines.push(`${old.name} (${set.id}): component set renamed "${old.name}" → "${set.name}"`);
    const [before, after] = [definitions(old), definitions(set)];
    for (const name of Object.keys(before).filter((n) => !(n in after)))
      lines.push(`${set.name}: property "${name}" removed or renamed`);
    for (const name of Object.keys(after).filter((n) => !(n in before)))
      lines.push(`${set.name}: property "${name}" added`);
    for (const name of Object.keys(after).filter((n) => n in before)) {
      const [b, a] = [before[name], after[name]];
      if (b.type !== a.type) lines.push(`${set.name}: "${name}" changed type ${b.type} → ${a.type}`);
      for (const v of (a.variantOptions ?? []).filter((x) => !(b.variantOptions ?? []).includes(x)))
        lines.push(`${set.name}: "${name}=${v}" added`);
      for (const v of (b.variantOptions ?? []).filter((x) => !(a.variantOptions ?? []).includes(x)))
        lines.push(`${set.name}: "${name}=${v}" removed`);
      if (quote(b.defaultValue) !== quote(a.defaultValue))
        lines.push(`${set.name}: "${name}" default changed ${quote(b.defaultValue)} → ${quote(a.defaultValue)}`);
    }
  }
  for (const old of committed.components.filter((c) => !fresh.components.some((f) => f.id === c.id)))
    lines.push(`${old.name} (${old.id}): component set no longer published`);

  for (const [id, name] of Object.entries(fresh.icons)) {
    if (!(id in committed.icons)) lines.push(`icon ${id} "${name}" added`);
    else if (committed.icons[id] !== name) lines.push(`icon ${id} renamed "${committed.icons[id]}" → "${name}"`);
  }
  for (const [id, name] of Object.entries(committed.icons).filter(([id]) => !(id in fresh.icons)))
    lines.push(`icon ${id} "${name}" removed`);

  const asData = (p: Pulled): string =>
    quote({
      components: p.components.map((c: Component) => ({ id: c.id, name: c.name, definitions: definitions(c) })),
      icons: p.icons,
    });
  if (lines.length === 0 && asData(committed) !== asData(fresh))
    lines.push(
      'the snapshots differ in a way this diff does not describe — run "npm run figma:pull" and read the file diff'
    );
  return lines;
};
