import "jasmine";
import { VisualRegressionTester } from "@porscheui/visual-regression-tester";
import { getVisualRegressionTester } from "../../../../../../vrt/helpers/setup";

describe("Component Button Regular", () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it("should have no visual regression", async () => {
    expect(
      await visualRegressionTester.test("component-button-regular", async () => {
        await visualRegressionTester.goTo("/#/vrt/action/button-regular");
      })
    ).toBeFalsy();
  });
});
