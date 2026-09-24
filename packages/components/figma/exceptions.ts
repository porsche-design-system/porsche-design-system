// Rules live in scripts/figmaGenerate.ts and place each Figma property from figma/components.json (the snapshot) and
// component-meta without human input. The real library already names properties after PDS
// props, models booleans as VARIANT "false"/"true", prefixes Figma-only toggles with "fig" and slots with "slot-".
// This file holds the exceptions, the only hand-written entries: one per (PDS tag, Figma property) that needs an
// override. A property the rules cannot place and that is not listed here is a problem only design can fix: it is
// reported, fails `figma:generate` only with `--strict`, and `figma:publish` holds back the component it names.
export type PropertyMapping =
  /** VARIANT → string attribute, e.g. variant=primary → variant="primary" */
  | { figma: string; kind: 'enum'; prop: string; values: Record<string, string> }
  /** VARIANT value → boolean attribute, e.g. disabled=true → disabled */
  | { figma: string; kind: 'flag'; prop: string; when: string }
  /** BOOLEAN → boolean attribute; `inverted` when Figma names it positively and PDS negatively (showLabel → hideLabel) */
  | { figma: string; kind: 'boolean'; prop: string; inverted?: boolean }
  /** TEXT → string attribute, e.g. label="Some label" */
  | { figma: string; kind: 'string'; prop: string }
  /** INSTANCE_SWAP → attribute carrying the swapped component's name, e.g. icon="arrow-right"; `gate` is the fig* toggle */
  | { figma: string; kind: 'instance-swap'; prop: string; gate?: string }
  /** TEXT → default slot content */
  | { figma: string; kind: 'text' }
  /** SLOT → rendered children of the PDS slot named like the Figma property minus `slot-` (`slot-default` = default) */
  | { figma: string; kind: 'slot' };

export type Exceptions = Record<string, Record<string, PropertyMapping>>;

export const exceptions: Exceptions = {
  // value mismatches between the two sides: Figma has a variant value PDS has no counterpart for (open item in
  // docs/figma-code-connect.md: delete the variant, add the value to PDS, or keep the fold)
  'p-model-signature': {
    color: {
      figma: 'color',
      kind: 'enum',
      prop: 'color',
      values: {
        primary: 'primary',
        'contrast-medium': 'contrast-medium',
        'contrast-high': 'contrast-high',
        'contrast-higher': 'contrast-high',
      },
    },
  },
  'p-text-list': {
    type: {
      figma: 'type',
      kind: 'enum',
      prop: 'type',
      values: { unordered: 'unordered', numbered: 'numbered', alphabetically: 'alphabetically', mixed: 'unordered' },
    },
  },
};
