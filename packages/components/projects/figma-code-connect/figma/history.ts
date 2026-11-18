import { bareName, type Definition, propertyId, type Resolution, type Unresolved } from './snapshot';

// Places the properties no rule places by reading the library's earlier versions. A BOOLEAN, TEXT, INSTANCE_SWAP or
// SLOT key keeps its `#<id>` through a rename; a VARIANT has none and is paired by its options with the PDS name that
// vanished in the step it appeared. Rationale: docs/figma-code-connect.md.

export type Version = { id: string; created_at: string };
type Definitions = Record<string, Definition>;
type Entry = [key: string, definition: Definition];
/** The REST property definitions of these sets at one version, by set id; `{}` for a set not there yet. */
export type ReadAt = (version: string, ids: string[]) => Promise<Record<string, Definitions>>;
/** How far back to read: at most `steps` versions, none older than `days` before `now`. */
export type Limit = { steps: number; days: number; now: number };
export type History = {
  resolved: Record<string, Record<string, Resolution>>;
  /** the versions read */
  steps: number;
};

const idOf = ([key, d]: Entry): string | undefined => propertyId(key, d);
const nameOf = ([key, d]: Entry): string => bareName(key, d);
const byId = (defs: Definitions, id: string): Entry | undefined => Object.entries(defs).find((e) => idOf(e) === id);
const byName = (defs: Definitions, name: string): Entry | undefined =>
  Object.entries(defs).find((e) => nameOf(e) === name);
const optionsOf = (d: Definition): string => [...(d.variantOptions ?? [])].sort().join(',');
/** The same property among earlier definitions: by the id its key keeps, or by name for a VARIANT. */
const previous = (entry: Entry, defs: Definitions): Entry | undefined => {
  const id = idOf(entry);
  return id === undefined ? byName(defs, nameOf(entry)) : byId(defs, id);
};

type Place = (set: Unresolved, name: string, resolution: Resolution) => void;

/** What one step, from `older` to `newer`, says about each pending property of a set. */
const compare = (set: Unresolved, names: Set<string>, newer: Definitions, older: Definitions, place: Place): void => {
  const appeared: Entry[] = [];
  for (const name of names) {
    const entry = byName(set.definitions, name) as Entry;
    const then = previous(entry, older);
    if (idOf(entry) === undefined) {
      if (!then) appeared.push(entry);
    } else if (!then) place(set, name, { kind: 'created' });
    else if (nameOf(then) !== name && set.candidates.includes(nameOf(then)))
      place(set, name, { kind: 'renamed', from: nameOf(then) });
  }
  // a VARIANT that appeared in this step, next to the PDS names with its options that vanished in it
  for (const entry of appeared) {
    const options = optionsOf(entry[1]);
    const group = appeared.filter((e) => optionsOf(e[1]) === options).map(nameOf);
    const vanished = Object.entries(older)
      .filter((e) => e[1].type === 'VARIANT' && optionsOf(e[1]) === options)
      .map(nameOf)
      .filter((name) => set.candidates.includes(name) && !byName(newer, name));
    place(
      set,
      nameOf(entry),
      !vanished.length
        ? { kind: 'created' }
        : group.length === 1 && vanished.length === 1
          ? { kind: 'renamed', from: vanished[0] }
          : { kind: 'ambiguous', appeared: group, vanished }
    );
  }
};

/** Reads the oldest reachable version first, because one read there settles a rename or rules a property out. */
export const resolveHistory = async (
  sets: Unresolved[],
  versions: Version[],
  readAt: ReadAt,
  limit: Limit
): Promise<History> => {
  const resolved: History['resolved'] = {};
  let steps = 0;
  const reach = [...versions]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .filter((version) => Date.parse(version.created_at) >= limit.now - limit.days * 86_400_000)
    .slice(0, limit.steps);
  const pending = new Map(sets.map((set) => [set, new Set(set.unknown)]));
  const read = async (version: Version): Promise<Record<string, Definitions>> => {
    steps++;
    return readAt(
      version.id,
      [...pending.keys()].map((set) => set.id)
    );
  };
  const place: Place = (set, name, resolution) => {
    (resolved[set.id] ??= {})[name] = resolution;
    pending.get(set)?.delete(name);
  };
  const settle = (): void => {
    for (const [set, names] of pending) if (!names.size) pending.delete(set);
  };
  if (!reach.length) return { resolved, steps };

  const boundary = reach[reach.length - 1];
  const atBoundary = await read(boundary);
  for (const [set, names] of pending) {
    for (const name of names) {
      const then = previous(byName(set.definitions, name) as Entry, atBoundary[set.id] ?? {});
      if (!then) continue;
      if (nameOf(then) === name) names.delete(name);
      else if (set.candidates.includes(nameOf(then))) place(set, name, { kind: 'renamed', from: nameOf(then) });
    }
  }
  settle();

  let newer: Record<string, Definitions> = Object.fromEntries(sets.map((set) => [set.id, set.definitions]));
  for (const version of reach) {
    if (!pending.size) break;
    const older = version === boundary ? atBoundary : await read(version);
    for (const [set, names] of pending) compare(set, names, newer[set.id], older[set.id] ?? {}, place);
    settle();
    newer = { ...newer, ...older };
  }
  return { resolved, steps };
};
