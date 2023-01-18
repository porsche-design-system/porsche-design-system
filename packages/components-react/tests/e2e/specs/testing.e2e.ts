import * as jsTestingUtils from '@porsche-design-system/components-js/testing';
import * as reactTestingUtils from '@porsche-design-system/components-react/testing';

it('should reexport all testing utils from components-js', () => {
  expect(reactTestingUtils).toEqual(jsTestingUtils);
});
