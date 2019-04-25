import "jasmine";
import { VisualRegressionTester } from "@porscheui/visual-regression-tester";
import { getVisualRegressionTester } from "../../../../../../vrt/helpers/setup";

describe("Home", () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it("should have no visual regression", async () => {
    expect(
      await visualRegressionTester.test(
        "pages-home",
        async () => {
          await visualRegressionTester.goTo("/#/general/home");
        },
        ['[class^="home_cover"]']
      )
    ).toBeFalsy();
  });
});
