import { assertExampleId } from '../../../lib/ids';

describe('assertExampleId()', () => {
  it.each([
    'components/select/set-value',
    'components/toast/default',
    'components/input-text/form',
    'ag-grid/theme/compact',
  ])('accepts %s', (id) => {
    expect(assertExampleId(id)).toBe(id);
  });

  it.each([
    'select',
    'components/Select/form',
    'components/select/set_value',
    'components/select/form/',
    '/components/select/form',
    'components//form',
  ])('rejects %s', (id) => {
    expect(() => assertExampleId(id)).toThrow('is not an example id');
  });

  it('keeps the segment of the accessibility examples free', () => {
    expect(() => assertExampleId('components/button/accessibility/icon-only')).toThrow('reserved');
    expect(() => assertExampleId('components/tabs-bar/accessibility')).toThrow('reserved');
  });
});
