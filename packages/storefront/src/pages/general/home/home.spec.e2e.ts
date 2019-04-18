import "jasmine"
import { getPage } from "../../../../../../e2e/helpers/setup"

describe("Home", () => {
  it("should show page title", async () => {
    const page = await getPage(`/#/general/home`)
    const element = await page.$('h1')
    const text = await page.evaluate(e => e.textContent, element)

    expect(text).toBe('Porsche UI Kit')
  })
})
