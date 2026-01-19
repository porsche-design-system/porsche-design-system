import { test, expect } from '@playwright/test';
import * as jsStyles from '@porsche-design-system/components-js/emotion';
import * as reactStyles from '@porsche-design-system/components-react/emotion';

test('should reexport styles sub-package from components-js', () => {
  expect(reactStyles).toEqual(jsStyles);
});
