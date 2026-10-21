// The pull figmaPull.ts reads over REST; figma:generate keeps it in memory.

export type Definition = { type: string; defaultValue?: unknown; variantOptions?: string[] };
export type Component = { id: string; name: string; componentPropertyDefinitions: Record<string, Definition> };
/** What the library's history says about a property no PDS name stands for (figma/history.ts). */
export type Resolution =
  | { kind: 'renamed'; from: string } // it carried this PDS name, which Figma now lacks
  | { kind: 'created' } // it never carried a PDS name
  | { kind: 'ambiguous'; appeared: string[]; vanished: string[] }; // it moved in one step with others of its options
/** A component set with properties no rule places, for history to place; `definitions` keeps the REST keys. */
export type Unresolved = {
  id: string;
  definitions: Record<string, Definition>;
  /** the bare names of the properties no rule places */
  unknown: string[];
  /** the PDS names Figma lacks, which one of them could have carried */
  candidates: string[];
};
export type Snapshot = {
  components: Component[];
  /** node id → name of each published component with a PDS icon name */
  icons: Record<string, string>;
  /** per component set id, what history says about each property no rule places, by bare name */
  history?: Record<string, Record<string, Resolution>>;
};

/**
 * The bare name of a REST key. The REST response adds `#<node id>` to each key but a VARIANT's,
 * and a name can itself contain `#`, so only the last one is cut, as the Code Connect CLI does.
 */
export const bareName = (key: string, definition: Definition): string =>
  definition.type === 'VARIANT' ? key : key.replace(/#[^#]*$/, '');

/** The `#<node id>` a REST key keeps through a rename; a VARIANT's key has none. */
export const propertyId = (key: string, definition: Definition): string | undefined =>
  definition.type === 'VARIANT' ? undefined : key.match(/#([^#]*)$/)?.[1];

/** The property definitions keyed by bare name. */
export const definitions = (component: Component): Record<string, Definition> =>
  Object.fromEntries(
    Object.entries(component.componentPropertyDefinitions).map(([key, value]) => [bareName(key, value), value])
  );
