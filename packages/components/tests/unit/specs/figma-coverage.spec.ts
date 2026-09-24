import type { PropMeta } from '@porsche-design-system/component-meta';
import { applyBaseline, expectedProperty, missingInFigma } from '../../../figma/coverage';
import type { Component, Definition } from '../../../figma/snapshot';

const component = (definitions: Record<string, Definition>): Component => ({
  id: '1:1',
  name: 'tag',
  componentPropertyDefinitions: definitions,
});
const prop = (meta: Partial<PropMeta> = {}): PropMeta => ({ type: 'boolean', defaultValue: false, ...meta });

describe('missingInFigma', () => {
  it('reports a PDS prop the Figma component has no property for, by the property name Figma needs', () => {
    expect(missingInFigma(component({}), { propsMeta: { somethingNew: prop() } })).toEqual(['somethingNew']);
  });

  it('counts a Figma property of the same name as covering the prop, whatever its node-id suffix', () => {
    expect(
      missingInFigma(component({ 'compact#12:3': { type: 'BOOLEAN' } }), { propsMeta: { compact: prop() } })
    ).toEqual([]);
  });

  it('counts showLabel as covering hideLabel', () => {
    expect(missingInFigma(component({ showLabel: { type: 'BOOLEAN' } }), { propsMeta: { hideLabel: prop() } })).toEqual(
      []
    );
  });

  it('reports a PDS slot the Figma component has no property for as slot-<name>, the default slot included', () => {
    expect(missingInFigma(component({}), { slotsMeta: { '': {}, footer: {} } })).toEqual([
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
    expect(missingInFigma(figma, { slotsMeta: { '': {}, footer: {}, label: {} } })).toEqual([]);
  });

  it('expects no Figma property for aria, deprecated and form props, nor for deprecated slots', () => {
    const meta = {
      propsMeta: {
        aria: prop({ type: 'SelectedAriaAttributes<ButtonAriaAttribute>', isAria: true }),
        weight: prop({ type: 'string', isDeprecated: true }),
        form: prop({ type: 'string' }),
        name: prop({ type: 'string' }),
        value: prop({ type: 'string' }),
      },
      slotsMeta: { heading: { isDeprecated: true } },
    };
    expect(missingInFigma(component({}), meta)).toEqual([]);
  });

  it('reports an allowed value the Figma variant has no option for, as prop=value', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary', 'secondary'] } });
    const meta = { propsMeta: { variant: prop({ type: 'string', allowedValues: ['primary', 'secondary', 'ghost'] }) } };
    expect(missingInFigma(figma, meta)).toEqual(['variant=ghost']);
  });

  it('matches a numeric allowed value against the string option Figma stores', () => {
    const figma = component({ length: { type: 'VARIANT', variantOptions: ['4', '6'] } });
    const meta = { propsMeta: { length: prop({ type: 'PinCodeLength', allowedValues: [4, 6] }) } };
    expect(missingInFigma(figma, meta)).toEqual([]);
  });

  it('expects no Figma option for a deprecated value', () => {
    const figma = component({ variant: { type: 'VARIANT', variantOptions: ['primary'] } });
    const variant = prop({ type: 'string', allowedValues: ['primary', 'tertiary'], deprecatedValues: ['tertiary'] });
    expect(missingInFigma(figma, { propsMeta: { variant } })).toEqual([]);
  });

  it('checks options on VARIANT properties only, not on an instance swap or a text property', () => {
    const figma = component({ icon: { type: 'INSTANCE_SWAP' }, target: { type: 'TEXT' } });
    const meta = {
      propsMeta: {
        icon: prop({ type: 'string', allowedValues: ['arrow-right', 'close'] }),
        target: prop({ type: 'string', allowedValues: ['_self', '_blank'] }),
      },
    };
    expect(missingInFigma(figma, meta)).toEqual([]);
  });
});

describe('expectedProperty', () => {
  const icons = new Set(['arrow-right', 'close', 'search']);

  it('asks for a BOOLEAN for a boolean prop and a TEXT for a free string or number', () => {
    expect(expectedProperty({ allowedValues: 'boolean' }, icons)).toEqual({ type: 'BOOLEAN' });
    expect(expectedProperty({ allowedValues: 'string' }, icons)).toEqual({ type: 'TEXT' });
    expect(expectedProperty({ allowedValues: 'number' }, icons)).toEqual({ type: 'TEXT' });
  });

  it('asks for a VARIANT with the live options, as strings, for a prop with allowed values', () => {
    expect(
      expectedProperty({ allowedValues: ['primary', 'secondary', 'tertiary'], deprecatedValues: ['tertiary'] }, icons)
    ).toEqual({ type: 'VARIANT', options: ['primary', 'secondary'] });
    expect(expectedProperty({ allowedValues: [4, 6] }, icons)).toEqual({ type: 'VARIANT', options: ['4', '6'] });
    expect(expectedProperty({ allowedValues: [null, 'h1', 'h2'] }, icons)).toEqual({
      type: 'VARIANT',
      options: ['h1', 'h2'],
    });
  });

  it('asks for an INSTANCE_SWAP when the allowed values are the icon names', () => {
    expect(expectedProperty({ allowedValues: ['', 'arrow-right', 'close', 'none'] }, icons)).toEqual({
      type: 'INSTANCE_SWAP',
    });
  });
});

describe('applyBaseline', () => {
  it('reports only the gaps the baseline does not list', () => {
    expect(applyBaseline(['iconSource', 'somethingNew'], ['iconSource']).fresh).toEqual(['somethingNew']);
  });

  it('keeps only the entries that are still gaps, so the baseline shrinks and never grows', () => {
    expect(applyBaseline(['iconSource', 'somethingNew'], ['iconSource', 'resolvedInFigma']).accepted).toEqual([
      'iconSource',
    ]);
  });
});
