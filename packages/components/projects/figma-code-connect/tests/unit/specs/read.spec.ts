import { describe, expect, it, vi } from 'vitest';

// The runtime shape: every property is `{ value, type }`, keyed by its bare name.
const readOf = async (properties: Record<string, unknown>) => {
  globalThis.selectedInstance = { properties };
  vi.resetModules();
  return (await import('../../../figma/helpers/read')).read;
};

describe('read', () => {
  it('reads nothing for a property the Figma component does not have', async () => {
    const read = await readOf({});
    expect(read.has('disabled')).toBe(false);
    expect(read.flag('disabled')).toBe(false);
    expect(read.text('label')).toBeUndefined();
    expect(read.oneOf('variant', ['primary'])).toBeUndefined();
    expect(read.number('activePage')).toBeUndefined();
    expect(read.isSlot('slot-default')).toBe(false);
  });

  it('reads a BOOLEAN and a false/true VARIANT alike', async () => {
    const read = await readOf({
      disabled: { value: true, type: 'BOOLEAN' },
      loading: { value: 'true', type: 'VARIANT' },
      compact: { value: 'false', type: 'VARIANT' },
    });
    expect(read.flag('disabled')).toBe(true);
    expect(read.flag('loading')).toBe(true);
    expect(read.flag('compact')).toBe(false);
  });

  it('reads off from a false BOOLEAN or false/true VARIANT, and not from a property Figma does not draw', async () => {
    const read = await readOf({
      dismissButton: { value: false, type: 'BOOLEAN' },
      showLastPage: { value: 'false', type: 'VARIANT' },
      likeButton: { value: true, type: 'BOOLEAN' },
    });
    expect(read.off('dismissButton')).toBe(true);
    expect(read.off('showLastPage')).toBe(true);
    expect(read.off('likeButton')).toBe(false);
    expect(read.off('safeZone')).toBe(false);
  });

  it('reads text, but no empty text', async () => {
    const read = await readOf({ label: { value: 'Some label', type: 'TEXT' }, message: { value: '', type: 'TEXT' } });
    expect(read.text('label')).toBe('Some label');
    expect(read.text('message')).toBeUndefined();
  });

  it('reads an option PDS allows, and nothing for one it does not allow', async () => {
    const read = await readOf({
      variant: { value: 'ghost', type: 'VARIANT' },
      size: { value: 'small', type: 'VARIANT' },
    });
    expect(read.oneOf('size', ['small', 'medium'])).toBe('small');
    expect(read.oneOf('variant', ['primary', 'secondary'])).toBeUndefined();
  });

  it('reads a number only from text that is one', async () => {
    const read = await readOf({
      activePage: { value: '2', type: 'TEXT' },
      offset: { value: '-1.5', type: 'TEXT' },
      itemsPerPage: { value: 'many', type: 'TEXT' },
    });
    expect(read.number('activePage')).toBe('2');
    expect(read.number('offset')).toBe('-1.5');
    expect(read.number('itemsPerPage')).toBeUndefined();
  });

  it('reads no attribute value from an instance swap or a slot', async () => {
    const read = await readOf({
      icon: { value: '2:1', type: 'INSTANCE_SWAP' },
      'slot-default': { value: { guid: {} }, type: 'SLOT' },
    });
    expect(read.has('icon')).toBe(true);
    expect(read.text('icon')).toBeUndefined();
    expect(read.text('slot-default')).toBeUndefined();
  });

  it('tells a SLOT from a TEXT property of the same name', async () => {
    expect((await readOf({ 'slot-default': { value: { guid: {} }, type: 'SLOT' } })).isSlot('slot-default')).toBe(true);
    expect((await readOf({ 'slot-default': { value: 'Some label', type: 'TEXT' } })).isSlot('slot-default')).toBe(
      false
    );
  });

  it('reads hideLabel, or showLabel inverted when Figma draws that instead', async () => {
    expect((await readOf({ hideLabel: { value: 'true', type: 'VARIANT' } })).hideLabel()).toBe(true);
    expect((await readOf({ showLabel: { value: false, type: 'BOOLEAN' } })).hideLabel()).toBe(true);
    expect((await readOf({ showLabel: { value: true, type: 'BOOLEAN' } })).hideLabel()).toBe(false);
    expect((await readOf({})).hideLabel()).toBe(false);
  });

  it('reads the bare values Figma documents too', async () => {
    const read = await readOf({ disabled: true, variant: 'primary', label: 'Some label' });
    expect(read.flag('disabled')).toBe(true);
    expect(read.oneOf('variant', ['primary'])).toBe('primary');
    expect(read.text('label')).toBe('Some label');
  });
});
