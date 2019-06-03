import "jasmine";
import { VisualRegressionTester } from "@porscheui/visual-regression-tester";
import { getVisualRegressionTester } from "../../../../../../vrt/helpers/setup";

describe("Component Color", () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  fit("should have no visual regression", async () => {
    expect(
      await visualRegressionTester.test("component-color", async () => {
        await visualRegressionTester.goTo("/#/vrt/basic/color");
      })
    ).toBeFalsy();
  });
});
