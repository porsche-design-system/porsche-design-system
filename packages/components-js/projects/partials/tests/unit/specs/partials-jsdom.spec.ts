import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';

it.each(Object.keys(fromPartials))('should throw exception in jsdom for %s', (partialName) => {
  const spy = jest.spyOn(shared, 'throwIfRunInBrowser');

  // @ts-ignore
  expect(fromPartials[partialName]).toThrowErrorMatchingInlineSnapshot(
    `"Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial."`
  );
  expect(spy).toBeCalledWith(partialName);
});
