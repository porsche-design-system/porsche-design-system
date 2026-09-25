import type { PropMeta } from '@porsche-design-system/component-meta';
import { derive } from '../../../figma/derive';
import type { Component, Definition } from '../../../figma/snapshot';

const component = (definitions: Record<string, Definition>): Component => ({
  id: '1:1',
  name: 'tag',
  componentPropertyDefinitions: definitions,
});
const prop = (meta: Partial<PropMeta> = {}): PropMeta => ({ type: 'boolean', defaultValue: false, ...meta });
const flag: Definition = { type: 'VARIANT', variantOptions: ['false', 'true'] };
// a tag no exception names, so only the rules apply
const tag = 'p-probe';

describe('derive: placing Figma properties', () => {
  it('maps a boolean prop to a BOOLEAN property, and to a VARIANT false/true as a flag', () => {
    const figma = component({ compact: { type: 'BOOLEAN' }, disabled: flag });
    const meta = { propsMeta: { compact: prop(), disabled: prop() } };
    expect(derive(figma, tag, meta).mappings).toEqual([
      { figma: 'compact', kind: 'boolean', prop: 'compact' },
      { figma: 'disabled', kind: 'flag', prop: 'disabled', when: 'true' },
    ]);
  });

  it('maps a string prop to a TEXT property as a string, and a numeric prop as a number', () => {
    const figma = component({ label: { type: 'TEXT' }, rows: { type: 'TEXT' }, value: { type: 'TEXT' } });
    const meta = {
      propsMeta: {
        label: prop({ type: 'string', allowedValues: 'string' }),
        rows: prop({ type: 'number', allowedValues: 'number' }),
        value: prop({ type: 'string | number', allowedValues: ['string', 'number'] }),
      },
    };
    expect(derive(figma, tag, meta).mappings).toEqual([
      { figma: 'label', kind: 'string', prop: 'label' },
      { figma: 'rows', kind: 'number', prop: 'rows' },
      { figma: 'value', kind: 'string', prop: 'value' },
    ]);
  });

  it('maps a prop with allowed values to a VARIANT as an identity enum over the Figma options', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary'] } });
    const meta = { propsMeta: { variant: prop({ type: 'string', allowedValues: ['primary', 'secondary'] }) } };
    expect(derive(figma, tag, meta).mappings).toEqual([
      { figma: 'variant', kind: 'enum', prop: 'variant', values: { primary: 'primary', secondary: 'secondary' } },
    ]);
  });

  it('places a VARIANT with the options PDS allows and reports the ones it does not', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary', 'ghost'] } });
    const meta = { propsMeta: { variant: prop({ type: 'string', allowedValues: ['primary'] }) } };
    const derived = derive(figma, tag, meta);
    expect(derived.mappings).toEqual([
      { figma: 'variant', kind: 'enum', prop: 'variant', values: { primary: 'primary' } },
    ]);
    expect(derived.unplaceable).toEqual([['variant', 'has values PDS does not allow: ghost']]);
  });

  it('compares numeric allowed values with the string options Figma stores', () => {
    const figma = component({ length: { type: 'VARIANT', variantOptions: ['4', '6'] } });
    const derived = derive(figma, tag, {
      propsMeta: { length: prop({ type: 'PinCodeLength', allowedValues: [4, 6] }) },
    });
    expect(derived.mappings).toEqual([
      { figma: 'length', kind: 'enum', prop: 'length', values: { '4': '4', '6': '6' } },
    ]);
    expect(derived.unplaceable).toEqual([]);
  });

  it('does not place a VARIANT none of whose options PDS allows', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['ghost'] } });
    const derived = derive(figma, tag, {
      propsMeta: { variant: prop({ type: 'string', allowedValues: ['primary'] }) },
    });
    expect(derived.mappings).toEqual([]);
    expect(derived.unplaceable).toEqual([['variant', 'has values PDS does not allow: ghost']]);
  });

  it('reports a property whose Figma type fits no rule for the PDS type', () => {
    const figma = component({ compact: { type: 'TEXT' } });
    expect(derive(figma, tag, { propsMeta: { compact: prop() } }).unplaceable).toEqual([
      ['compact', 'is TEXT in Figma but boolean in PDS'],
    ]);
  });

  it('maps an INSTANCE_SWAP with its fig<Prop> gate when the gate exists, and ignores the gate itself', () => {
    const gated = component({ icon: { type: 'INSTANCE_SWAP' }, figIcon: flag });
    const meta = { propsMeta: { icon: prop({ type: 'string', allowedValues: ['close'] }) } };
    expect(derive(gated, tag, meta).mappings).toEqual([
      { figma: 'icon', kind: 'instance-swap', prop: 'icon', gate: 'figIcon' },
    ]);
    expect(derive(gated, tag, meta).unplaceable).toEqual([]);
    expect(derive(component({ icon: { type: 'INSTANCE_SWAP' } }), tag, meta).mappings).toEqual([
      { figma: 'icon', kind: 'instance-swap', prop: 'icon' },
    ]);
  });

  it('maps showLabel onto hideLabel, inverted, when the component has hideLabel and Figma no hideLabel', () => {
    const figma = component({ showLabel: { type: 'BOOLEAN' } });
    const derived = derive(figma, tag, { propsMeta: { hideLabel: prop() } });
    expect(derived.mappings).toEqual([{ figma: 'showLabel', kind: 'boolean', prop: 'hideLabel', inverted: true }]);
    expect(derived.gaps).toEqual([]);
  });

  it('applies an exception instead of the rule', () => {
    // figma/exceptions.ts folds p-text-list type=mixed onto unordered
    const figma = component({
      type: { type: 'VARIANT', variantOptions: ['unordered', 'numbered', 'alphabetically', 'mixed'] },
    });
    const meta = {
      propsMeta: { type: prop({ type: 'string', allowedValues: ['unordered', 'numbered', 'alphabetically'] }) },
    };
    const derived = derive(figma, 'p-text-list', meta);
    expect(derived.mappings).toEqual([
      {
        figma: 'type',
        kind: 'enum',
        prop: 'type',
        values: { unordered: 'unordered', numbered: 'numbered', alphabetically: 'alphabetically', mixed: 'unordered' },
      },
    ]);
    expect(derived.unplaceable).toEqual([]);
  });

  it('renders slot-default as text when TEXT and as a slot otherwise, and slot-<name> as a slot', () => {
    const figma = component({ 'slot-default': { type: 'TEXT' }, 'slot-footer': { type: 'SLOT' } });
    expect(derive(figma, tag, { slotsMeta: { '': {}, footer: {} } }).mappings).toEqual([
      { figma: 'slot-default', kind: 'text' },
      { figma: 'slot-footer', kind: 'slot' },
    ]);
    expect(derive(component({ 'slot-default': { type: 'SLOT' } }), tag, { slotsMeta: { '': {} } }).mappings).toEqual([
      { figma: 'slot-default', kind: 'slot' },
    ]);
  });

  it('renders slot-default even when component-meta lists no default slot', () => {
    expect(derive(component({ 'slot-default': { type: 'TEXT' } }), tag, {}).mappings).toEqual([
      { figma: 'slot-default', kind: 'text' },
    ]);
  });

  it('reports a slot-* property for a slot PDS does not have, and any other property with no PDS prop', () => {
    const figma = component({ 'slot-summary': { type: 'SLOT' }, dense: { type: 'VARIANT', variantOptions: ['a'] } });
    expect(derive(figma, tag, {}).unplaceable).toEqual([
      ['slot-summary', 'is a slot PDS does not have'],
      ['dense', '(VARIANT) has no PDS prop'],
    ]);
  });

  it('ignores fig* properties', () => {
    const derived = derive(component({ figMessage: flag }), tag, {});
    expect(derived.mappings).toEqual([]);
    expect(derived.unplaceable).toEqual([]);
  });

  it('treats form participation as optional in Figma: mapped when present, no gap when absent', () => {
    const meta = { propsMeta: { value: prop({ type: 'string' }), name: prop({ type: 'string' }) } };
    const present = derive(component({ value: { type: 'TEXT' } }), tag, meta);
    expect(present.mappings).toEqual([{ figma: 'value', kind: 'string', prop: 'value' }]);
    expect(present.gaps).toEqual([]);
    expect(derive(component({}), tag, meta).gaps).toEqual([]);
  });

  it('expects no Figma property for a required value or name either', () => {
    const meta = {
      propsMeta: {
        value: prop({ type: 'string | number', allowedValues: ['string', 'number'], isRequired: true }),
        name: prop({ type: 'string', allowedValues: 'string', isRequired: true }),
      },
    };
    expect(derive(component({}), tag, meta).gaps).toEqual([]);
  });

  it('orders mappings by component-meta: props first, then slots', () => {
    const figma = component({ 'slot-default': { type: 'TEXT' }, icon: { type: 'INSTANCE_SWAP' }, variant: flag });
    const meta = {
      propsMeta: { variant: prop(), icon: prop({ type: 'string', allowedValues: ['close'] }) },
      slotsMeta: { '': {} },
    };
    expect(derive(figma, tag, meta).mappings.map((m) => m.figma)).toEqual(['variant', 'icon', 'slot-default']);
  });
});

describe('derive: gaps, what Figma lacks', () => {
  it('reports a PDS prop the Figma component has no property for, by the property name Figma needs', () => {
    expect(derive(component({}), tag, { propsMeta: { somethingNew: prop() } }).gaps).toEqual(['somethingNew']);
  });

  it('counts a Figma property of the same name as covering the prop, whatever its node-id suffix', () => {
    expect(
      derive(component({ 'compact#12:3': { type: 'BOOLEAN' } }), tag, { propsMeta: { compact: prop() } }).gaps
    ).toEqual([]);
  });

  it('reports a PDS slot the Figma component has no property for as slot-<name>, the default slot included', () => {
    expect(derive(component({}), tag, { slotsMeta: { '': {}, footer: {} } }).gaps).toEqual([
      'slot-default',
      'slot-footer',
    ]);
  });

  it('counts slot-default, slot-<name> and a property named like the slot as covering it', () => {
    const figma = component({
      'slot-default': { type: 'TEXT' },
      'slot-footer': { type: 'SLOT' },
      label: { type: 'TEXT' },
    });
    expect(derive(figma, tag, { slotsMeta: { '': {}, footer: {}, label: {} } }).gaps).toEqual([]);
  });

  it('expects no Figma property for aria and deprecated props, nor for deprecated slots', () => {
    const meta = {
      propsMeta: {
        aria: prop({ type: 'SelectedAriaAttributes<ButtonAriaAttribute>', isAria: true }),
        weight: prop({ type: 'string', isDeprecated: true }),
      },
      slotsMeta: { heading: { isDeprecated: true } },
    };
    expect(derive(component({}), tag, meta).gaps).toEqual([]);
  });

  it('reports a deprecated prop Figma still draws, and does not place it', () => {
    const meta = { propsMeta: { weight: prop({ type: 'string', isDeprecated: true }) } };
    const derived = derive(component({ weight: { type: 'TEXT' } }), tag, meta);
    expect(derived.mappings).toEqual([]);
    expect(derived.unplaceable).toEqual([['weight', 'is deprecated in PDS']]);
    expect(derived.gaps).toEqual([]);
  });

  it('reports an allowed value the Figma variant has no option for, as prop=value', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary'] } });
    const meta = { propsMeta: { variant: prop({ type: 'string', allowedValues: ['primary', 'secondary', 'ghost'] }) } };
    expect(derive(figma, tag, meta).gaps).toEqual(['variant=ghost']);
  });

  it('reports a missing option even when an exception places the property', () => {
    // p-model-signature color: the exception folds contrast-higher, and PDS still allows contrast-low and inherit
    const figma = component({
      color: { type: 'VARIANT', variantOptions: ['primary', 'contrast-medium', 'contrast-high', 'contrast-higher'] },
    });
    const allowedValues = ['primary', 'contrast-low', 'contrast-medium', 'contrast-high', 'inherit'];
    const derived = derive(figma, 'p-model-signature', {
      propsMeta: { color: prop({ type: 'string', allowedValues }) },
    });
    expect(derived.gaps).toEqual(['color=contrast-low', 'color=inherit']);
    expect(derived.mappings).toHaveLength(1);
  });

  it('matches a numeric allowed value against the string option Figma stores', () => {
    const figma = component({ length: { type: 'VARIANT', variantOptions: ['4', '6'] } });
    const meta = { propsMeta: { length: prop({ type: 'PinCodeLength', allowedValues: [4, 6] }) } };
    expect(derive(figma, tag, meta).gaps).toEqual([]);
  });

  it('expects no Figma option for a deprecated value', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary'] } });
    const variant = prop({ type: 'string', allowedValues: ['primary', 'tertiary'], deprecatedValues: ['tertiary'] });
    expect(derive(figma, tag, { propsMeta: { variant } }).gaps).toEqual([]);
  });

  it('reports a deprecated value Figma still draws as an option and leaves it out of the value list', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary', 'tertiary'] } });
    const variant = prop({ type: 'string', allowedValues: ['primary', 'tertiary'], deprecatedValues: ['tertiary'] });
    const derived = derive(figma, tag, { propsMeta: { variant } });
    expect(derived.mappings).toEqual([
      { figma: 'variant', kind: 'enum', prop: 'variant', values: { primary: 'primary' } },
    ]);
    expect(derived.unplaceable).toEqual([['variant', 'has values deprecated in PDS: tertiary']]);
    expect(derived.gaps).toEqual([]);
  });

  it('checks options on VARIANT properties only, not on an instance swap or a text property', () => {
    const figma = component({ icon: { type: 'INSTANCE_SWAP' }, target: { type: 'TEXT' } });
    const meta = {
      propsMeta: {
        icon: prop({ type: 'string', allowedValues: ['arrow-right', 'close'] }),
        target: prop({ type: 'string', allowedValues: ['_self', '_blank'] }),
      },
    };
    expect(derive(figma, tag, meta).gaps).toEqual([]);
  });
});
