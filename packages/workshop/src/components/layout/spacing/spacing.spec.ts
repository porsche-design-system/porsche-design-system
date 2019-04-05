/* tslint:disable */

import "jasmine"
import { VisualRegressionTester } from "@porscheui/visual-regression-tester"
import { getVisualRegressionTester } from "../../../../../../vrt/helpers/setup"

describe("Component Text", () => {
  let visualRegressionTester: VisualRegressionTester

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester()
  })

  it("should have no visual regression", async () => {
    expect(
      await visualRegressionTester.test("component-spacing", async () => {
        await visualRegressionTester.goTo("/#/vrt/layout/spacing")
      })
    ).toBeFalsy()
  })
})
