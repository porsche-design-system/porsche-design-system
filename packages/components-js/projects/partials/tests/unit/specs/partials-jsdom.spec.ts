import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';

it.each(Object.keys(fromPartials))('should throw exception in jsdom for %s', (partialName) => {
  const spy = jest.spyOn(shared, 'throwIfRunInBrowser');

  expect(fromPartials[partialName]).toThrowErrorMatchingInlineSnapshot(
    `"Partials should only be used during build time. It looks like you are using '${partialName}' at run time in a browser."`
  );
  expect(spy).toHaveBeenCalledWith(partialName);
});
