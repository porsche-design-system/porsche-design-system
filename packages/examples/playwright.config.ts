import { type Config, defineConfig, devices, type Project } from '@playwright/test';
import { playwrightConfigA11y, playwrightConfigE2E, playwrightConfigVRT } from '@porsche-design-system/shared/testing';
import { exampleWebServer } from './tests/helpers/previewServers.ts';

/**
 * Every Playwright suite of the examples, as projects of one config.
 *
 * A pilot for the monorepo: the other packages keep one config per suite in `tests/<suite>/config/`. The settings still
 * come from the shared base configs of `@porsche-design-system/shared/testing`, so a suite behaves exactly as it does
 * everywhere else – only the options Playwright allows per project are taken from them per suite, and the global ones
 * (parallelism, retries, workers, reporter) are identical in all three bases anyway.
 *
 * Every suite runs on the same two devices, one project each:
 *
 * | project                | device         | engine   | viewport |
 * | ---------------------- | -------------- | -------- | -------- |
 * | `<suite>-desktop-chrome` | Desktop Chrome | chromium | 1280×720 |
 * | `<suite>-mobile-safari`  | iPhone 17 Pro  | webkit   | 402×681  |
 *
 * Each on the defaults of its Playwright descriptor – viewport, user agent, touch – except the pixel density, which
 * stays at 1 like everywhere else in the monorepo. The pairing is the realistic one: an iPhone only ever runs WebKit.
 * A spec reads its device with `getDevice()` rather than from the project name.
 *
 * Run one suite at a time through its script – `test:e2e`, `test:a11y`, `test:vrt` – which selects its projects.
 * A bare `playwright test` runs all of them, VRT included, which only produces the committed pixels inside Docker.
 *
 * Every suite runs against the **built** site (see [`previewServers.ts`](tests/helpers/previewServers.ts)): the
 * behaviour under test is the `main.js` the build generates, and what is captured and scanned is the page a consumer
 * gets – the bundled entry, the injected partials and the upgraded components from the local CDN.
 */

type Suite = 'e2e' | 'a11y' | 'vrt';

const devicesUnderTest = [
  { device: 'desktop', engine: 'chrome', descriptor: { ...devices['Desktop Chrome'], browserName: 'chromium' } },
  { device: 'mobile', engine: 'safari', descriptor: { ...devices['iPhone 17 Pro'], browserName: 'webkit' } },
] as const;

/**
 * The projects of one suite: the per-project part of its shared base config, rooted at the folder of the suite, once
 * per device.
 *
 * The project names end in the engine because `prepare-vrt-snapshots` recognises a project's output folder by that
 * suffix. For the same reason a VRT baseline ends in the bare engine name – `--desktop-chrome.png`: the tool derives
 * the regression artifacts from it. Project names have to be unique across the suites, so they cannot be the bare
 * engine name, and the VRT suffix is fixed per project instead of taken from `{projectName}`.
 */
const projectsOf = (suite: Suite, base: Config): Project[] =>
  devicesUnderTest.map(({ device, engine, descriptor }) => ({
    name: `${suite}-${device}-${engine}`,
    testDir: `./tests/${suite}/specs`,
    testMatch: base.testMatch,
    timeout: base.timeout,
    expect: base.expect,
    snapshotPathTemplate:
      suite === 'vrt' ? `{testDir}/__screenshots__/{arg}-${engine}{ext}` : base.snapshotPathTemplate,
    outputDir: `./tests/${suite}/results`,
    use: { ...base.use, ...descriptor, deviceScaleFactor: 1 },
    metadata: { device },
  }));

export default defineConfig({
  fullyParallel: playwrightConfigE2E.fullyParallel,
  forbidOnly: playwrightConfigE2E.forbidOnly,
  retries: playwrightConfigE2E.retries,
  workers: playwrightConfigE2E.workers,
  reporter: playwrightConfigE2E.reporter,
  webServer: exampleWebServer,
  projects: [
    /** End-to-end: the behaviour an example wires up on ids. */
    ...projectsOf('e2e', playwrightConfigE2E),
    /** Accessibility, scanned with axe-core in both colour schemes. */
    ...projectsOf('a11y', playwrightConfigA11y),
    /**
     * Visual regression. Dark scheme, both High Contrast Mode schemes, 200% font size and rtl are captured on desktop
     * only: scaling the font size and forcing colors go through CDP.
     */
    ...projectsOf('vrt', playwrightConfigVRT),
  ],
});
