import type { ComponentMeta } from '@porsche-design-system/component-meta';
import { pascalCase } from 'change-case';
import { exceptions, type PropertyMapping } from './exceptions';
import { reasons } from './messages';
import { figmaSlotName, showLabelStandsForHideLabel } from './naming';
import { type Component, type Definition, definitions } from './snapshot';

// The rules, as one walk over component-meta. Each PDS prop and slot looks up the Figma property with its name in the
// snapshot (`slot-<name>` or `slot-default` for a slot, `showLabel` for `hideLabel`). A rule or an exception places the
// property. A prop, slot or allowed value with no Figma property is a coverage gap. A Figma property that no rule
// places is unplaceable. One walk, so the templates and the design lines always agree. scripts/figmaGenerate.ts renders
// the mappings into templates and prints the gaps and the unplaceable properties as design lines, unless the baseline
// accepts the gap.
export type Derived = {
  /** What the templates read: props, then slots, then a `slot-default` that Figma has and component-meta does not. */
  mappings: PropertyMapping[];
  /** The unplaceable Figma properties, fully or in part, each with a reason from `reasons`. */
  unplaceable: [figma: string, reason: string][];
  /** The coverage gaps: the Figma property a PDS prop or slot needs but lacks, or `prop=value` for an allowed value. */
  gaps: string[];
};

// Form props go with the form data, so there is nothing to draw. They are optional in Figma: no gap when absent, mapped
// like any prop when present. The one exception is a required `value`: the component throws without it, so the snippet
// must carry it. A required `name` stays optional (ruled 2026-09-25).
const formProps = ['form', 'name', 'value'];

const isBooleanVariant = (d: Definition): boolean =>
  d.type === 'VARIANT' && (d.variantOptions ?? []).every((o) => o === 'true' || o === 'false');

/**
 * The rules: `fig*` is design-only, `slot-*` renders as children, `showLabel` inverts to `hideLabel`, INSTANCE_SWAP
 * reads the swapped icon's record behind its `fig<Prop>` toggle, TEXT is a string attribute (a number attribute for a
 * numeric prop), VARIANT `false`/`true` is a boolean attribute, any other VARIANT is an enum with the same values. Not
 * expected in Figma: `isAria` props, deprecated props, deprecated values.
 */
export const derive = (
  component: Component,
  tag: string,
  meta: Pick<ComponentMeta, 'propsMeta' | 'slotsMeta'>
): Derived => {
  const defs = definitions(component);
  const props = meta.propsMeta ?? {};
  const consumed = new Set<string>();
  const out: Derived = { mappings: [], unplaceable: [], gaps: [] };
  // an exception is keyed by the Figma property and wins over the rule
  const place = (figma: string, mapping: PropertyMapping): void => {
    consumed.add(figma);
    out.mappings.push(exceptions[tag]?.[figma] ?? mapping);
  };
  const fail = (figma: string, reason: string): void => {
    consumed.add(figma);
    out.unplaceable.push([figma, reason]);
  };

  for (const [prop, p] of Object.entries(props)) {
    if (p.isAria) continue;
    const viaShowLabel = prop === 'hideLabel' && showLabelStandsForHideLabel(defs, props);
    const figma = viaShowLabel ? 'showLabel' : prop;
    const d = defs[figma];
    // a deprecated prop is never a gap. If Figma has it, it is reported, so design removes it and the snippets stop
    // emitting a deprecated attribute
    if (p.isDeprecated) {
      if (d) fail(figma, reasons.deprecated);
      continue;
    }
    if (!d) {
      if (!formProps.includes(prop) || (prop === 'value' && p.isRequired)) out.gaps.push(prop);
      continue;
    }
    // each allowed value needs a variant option with the same name, compared as strings (`4` is "4"). This check also
    // runs when an exception places the property
    if (d.type === 'VARIANT' && Array.isArray(p.allowedValues)) {
      for (const value of p.allowedValues as unknown[]) {
        if (p.deprecatedValues?.includes(value as string)) continue;
        if (!(d.variantOptions ?? []).includes(String(value))) out.gaps.push(`${prop}=${value}`);
      }
    }
    const exception = exceptions[tag]?.[figma];
    if (exception) {
      place(figma, exception);
      continue;
    }
    if (viaShowLabel) {
      place(figma, { figma, kind: 'boolean', prop: 'hideLabel', inverted: true });
      continue;
    }
    if (d.type === 'INSTANCE_SWAP') {
      const gate = `fig${pascalCase(figma)}`;
      place(figma, { figma, kind: 'instance-swap', prop, ...(defs[gate] ? { gate } : {}) });
      continue;
    }
    if (p.type === 'boolean' && d.type === 'BOOLEAN') {
      place(figma, { figma, kind: 'boolean', prop });
      continue;
    }
    if (p.type === 'boolean' && isBooleanVariant(d)) {
      place(figma, { figma, kind: 'flag', prop, when: 'true' });
      continue;
    }
    if (d.type === 'TEXT' && p.allowedValues === 'number') {
      place(figma, { figma, kind: 'number', prop });
      continue;
    }
    if (d.type === 'TEXT' && /string|number|Tag$/.test(p.type)) {
      place(figma, { figma, kind: 'string', prop });
      continue;
    }
    if (d.type === 'VARIANT' && Array.isArray(p.allowedValues)) {
      // Figma options are strings, PDS allowed values can be numbers (`4` is "4")
      const allowed = (p.allowedValues as unknown[]).map(String);
      const deprecatedValues = ((p.deprecatedValues ?? []) as unknown[]).map(String);
      const options = d.variantOptions ?? [];
      const unknown = options.filter((o) => !allowed.includes(o));
      const deprecated = options.filter((o) => allowed.includes(o) && deprecatedValues.includes(o));
      const handled = options.filter((o) => allowed.includes(o) && !deprecatedValues.includes(o));
      // an option PDS does not allow, or has deprecated, is reported and left out of the values. Figma then holds the
      // record back at publish until design removes the option or an exception folds it. The other records publish
      if (unknown.length) out.unplaceable.push([figma, reasons.disallowedValues(unknown)]);
      if (deprecated.length) out.unplaceable.push([figma, reasons.deprecatedValues(deprecated)]);
      if (handled.length === 0) {
        consumed.add(figma);
        continue;
      }
      place(figma, { figma, kind: 'enum', prop, values: Object.fromEntries(handled.map((o) => [o, o])) });
      continue;
    }
    fail(figma, reasons.typeMismatch(d.type, p.type));
  }

  for (const [slot, s] of Object.entries(meta.slotsMeta ?? {})) {
    if (s.isDeprecated) continue;
    const figma = figmaSlotName(slot);
    const d = defs[figma];
    if (d) {
      place(figma, figma === 'slot-default' && d.type === 'TEXT' ? { figma, kind: 'text' } : { figma, kind: 'slot' });
      continue;
    }
    // a Figma property with the slot's name covers the slot: most text slots are TEXT properties (`label`)
    if (slot !== '' && defs[slot]) continue;
    out.gaps.push(figma);
  }

  for (const [figma, d] of Object.entries(defs)) {
    if (consumed.has(figma)) continue;
    const exception = exceptions[tag]?.[figma];
    if (exception) {
      place(figma, exception);
      continue;
    }
    if (/^fig/.test(figma)) continue; // design-only toggle. The instance-swap gates were read above
    if (figma === 'slot-default') {
      // default content always renders, also when component-meta lists no default slot
      place(figma, d.type === 'TEXT' ? { figma, kind: 'text' } : { figma, kind: 'slot' });
      continue;
    }
    if (/^slot-/.test(figma)) {
      fail(figma, reasons.slotMissing);
      continue;
    }
    fail(figma, reasons.noProp(d.type));
  }
  return out;
};
