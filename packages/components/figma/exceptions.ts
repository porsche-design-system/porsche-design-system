// The rules in figma/derive.ts place each Figma property without human input. This file holds the exceptions, the only
// hand-written mappings: one per PDS tag and Figma property that overrides its rule. A property that no rule and no
// exception places is a design line. It never fails generation; Figma's publish validation decides per record.
export type PropertyMapping =
  /** VARIANT → string attribute: variant=primary → variant="primary" */
  | { figma: string; kind: 'enum'; prop: string; values: Record<string, string> }
  /** one VARIANT value → boolean attribute: disabled=true → disabled */
  | { figma: string; kind: 'flag'; prop: string; when: string }
  /** BOOLEAN → boolean attribute. `inverted` when Figma says showLabel and PDS says hideLabel */
  | { figma: string; kind: 'boolean'; prop: string; inverted?: boolean }
  /** TEXT → string attribute: label="Some label" */
  | { figma: string; kind: 'string'; prop: string }
  /** TEXT → number attribute, as an expression: activePage={2}. Text that is not a number is left out */
  | { figma: string; kind: 'number'; prop: string }
  /** INSTANCE_SWAP → attribute with the swapped icon's name: icon="arrow-right". `gate` is the fig* toggle */
  | { figma: string; kind: 'instance-swap'; prop: string; gate?: string }
  /** TEXT → default slot content */
  | { figma: string; kind: 'text' }
  /** SLOT → the children of the PDS slot: the Figma property without `slot-`; `slot-default` is the default slot */
  | { figma: string; kind: 'slot' };

export type Exceptions = Record<string, Record<string, PropertyMapping>>;

export const exceptions: Exceptions = {
  // Figma has a variant value that PDS does not allow. Design must decide per value: delete the variant, add the value
  // to PDS, or keep the fold. Without the fold the rule leaves the value out and Figma holds the record back.
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
