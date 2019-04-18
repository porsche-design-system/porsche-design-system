import 'jasmine'
import * as puppeteer from 'puppeteer'
import { Browser, Page } from 'puppeteer'

let browser: Browser

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

afterAll(async () => {
  if (browser) {
    await browser.close()
  }
})

export async function getPage(url: string): Promise<Page> {
  if (!browser) {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    })
  }
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(300000)
  await page.goto(`http://localhost:3000${url}`, {waitUntil: 'networkidle0'})

  return page
}
