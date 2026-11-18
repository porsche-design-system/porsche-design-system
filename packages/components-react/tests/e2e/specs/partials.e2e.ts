import { expect, test } from '@porsche-design-system/testing/playwright';

import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as reactPartials from '@porsche-design-system/components-react/partials';

test('should reexport partials sub-package from components-js', () => {
  expect(reactPartials).toEqual(jsPartials);
});
