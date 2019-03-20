/* tslint:disable */

import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import {getVisualRegressionTester} from "../../../../../../vrt/helpers/setup"

describe('Pages Markdown', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('pages-markdown', async () => {
      await visualRegressionTester.goTo('/demo/markdown?featureComponents');
    })).toBeFalsy();
  });
});
