import "jasmine";
import { VisualRegressionTester } from "@porscheui/visual-regression-tester";
import { getVisualRegressionTester } from "../../../../../../vrt/helpers/setup";

describe("Component Loader", () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it("should have no visual regression", async () => {
    expect(
      await visualRegressionTester.test("component-loader", async () => {
        await visualRegressionTester.goTo("/#/vrt/feedback/loader");
      })
    ).toBeFalsy();
  });
});
