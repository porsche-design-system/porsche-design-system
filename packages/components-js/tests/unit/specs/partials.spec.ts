import * as partials from '@porsche-design-system/components-js/partials';

it('should provide all partials', () => {
  expect(Object.keys(partials).length).toBe(7);
});

it.each<keyof typeof partials>(Object.keys(partials) as (keyof typeof partials)[])(
  'should be a function for partial: %s',
  (partial) => {
    expect(typeof partials[partial]).toBe('function');
  }
);
