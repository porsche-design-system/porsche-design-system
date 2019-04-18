import "jasmine"
import { getPage } from "../../../../../../e2e/helpers/setup"
import {Page} from "puppeteer";

describe("Quality criteria", () => {
  let page: Page

  beforeEach(async () => {
    page = await getPage(`/#/basics/quality-criteria`)
  })

  it("should show page title", async () => {
    const elements = await page.$$('h1')
    const text = await page.evaluate(e => e.textContent, elements[1])

    expect(elements.length).toBe(2)
    expect(text).toBe('Quality Criteria')
  })
})
