import { applyBaseline, componentSetGap, expectedProperty, missingComponentSets } from '../../../figma/coverage';

describe('missingComponentSets', () => {
  it('reports the PDS tags with no Figma component set, deprecated components excepted', () => {
    const tags = ['p-button', 'p-sheet', 'p-display', 'p-table-row'];
    const present = new Set(['p-button']);
    expect(missingComponentSets(tags, present, (tag) => tag === 'p-display')).toEqual(['p-sheet', 'p-table-row']);
  });

  it('is accepted in the baseline with the component-set entry, which cannot collide with a prop name', () => {
    expect(componentSetGap).toBe('component-set');
    expect(applyBaseline([componentSetGap], [componentSetGap]).fresh).toEqual([]);
  });
});

describe('expectedProperty', () => {
  const icons = new Set(['arrow-right', 'close', 'search']);

  it('asks for a BOOLEAN for a boolean prop and a TEXT for a free string or number', () => {
    expect(expectedProperty({ allowedValues: 'boolean' }, icons)).toEqual({ type: 'BOOLEAN' });
    expect(expectedProperty({ allowedValues: 'string' }, icons)).toEqual({ type: 'TEXT' });
    expect(expectedProperty({ allowedValues: 'number' }, icons)).toEqual({ type: 'TEXT' });
  });

  it('asks for a TEXT when the allowed values are a type list, not options', () => {
    expect(expectedProperty({ allowedValues: ['string', 'number'] }, icons)).toEqual({ type: 'TEXT' });
    expect(expectedProperty({ allowedValues: ['string', 'number', null] }, icons)).toEqual({ type: 'TEXT' });
    expect(expectedProperty({ allowedValues: ['number', 'password'] }, icons)).toEqual({
      type: 'VARIANT',
      options: ['number', 'password'],
    });
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
