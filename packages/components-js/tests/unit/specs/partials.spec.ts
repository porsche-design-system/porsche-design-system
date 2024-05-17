import * as partials from '@porsche-design-system/components-js/partials';

it('should provide all partials', () => {
  expect(Object.keys(partials).filter((p) => p !== 'default').length).toBe(11);
});

it.each<keyof typeof partials>(Object.keys(partials).filter((p) => p !== 'default') as (keyof typeof partials)[])(
  'should be a function for partial: %s',
  (partial) => {
    expect(typeof partials[partial]).toBe('function');
  }
);
