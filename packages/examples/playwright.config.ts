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
 * Run one suite at a time through its script – `test:e2e`, `test:a11y`, `test:vrt` – which selects its projects.
 * A bare `playwright test` runs all of them, VRT included, which only produces the committed pixels inside Docker.
 *
 * Every suite runs against the **built** site (see [`previewServers.ts`](tests/helpers/previewServers.ts)): the
 * behaviour under test is the `main.js` the build generates, and what is captured and scanned is the page a consumer
 * gets – the bundled entry, the injected partials and the upgraded components from the local CDN.
 */

type Suite = 'e2e' | 'a11y' | 'vrt';

/** The per-project part of a shared base config, rooted at the folder of its suite. */
const fromBase = (suite: Suite, base: Config): Project => ({
  testDir: `./tests/${suite}/specs`,
  testMatch: base.testMatch,
  timeout: base.timeout,
  expect: base.expect,
  snapshotPathTemplate: base.snapshotPathTemplate,
  outputDir: `./tests/${suite}/results`,
  use: base.use,
});

const desktopChrome = { ...devices['Desktop Chrome'], deviceScaleFactor: 1 };

const e2e = fromBase('e2e', playwrightConfigE2E);
const a11y = fromBase('a11y', playwrightConfigA11y);
const vrt = fromBase('vrt', playwrightConfigVRT);

export default defineConfig({
  fullyParallel: playwrightConfigE2E.fullyParallel,
  forbidOnly: playwrightConfigE2E.forbidOnly,
  retries: playwrightConfigE2E.retries,
  workers: playwrightConfigE2E.workers,
  reporter: playwrightConfigE2E.reporter,
  webServer: exampleWebServer,
  projects: [
    /**
     * End-to-end: the behaviour an example wires up on ids. Chromium only – these are demos of behaviour, not a
     * browser compatibility matrix; the rendering differences between engines are the VRT's job.
     */
    {
      ...e2e,
      name: 'e2e',
      use: { ...e2e.use, ...desktopChrome },
    },
    /**
     * Accessibility, scanned with axe-core. Chromium only: axe evaluates the accessibility tree the browser computes,
     * and running the same rules against a second engine measures the engine rather than the examples.
     */
    {
      ...a11y,
      name: 'a11y',
      use: { ...a11y.use, ...desktopChrome },
    },
    /**
     * Visual regression, one project per device, each on the defaults of its Playwright descriptor – viewport, user
     * agent, touch – except the pixel density, which stays at 1 like everywhere else in the monorepo:
     *
     * | project              | device         | engine   | captures                                                 |
     * | -------------------- | -------------- | -------- | -------------------------------------------------------- |
     * | `vrt-desktop-chrome` | Desktop Chrome | chromium | light, dark, hcm light/dark, font-size 200%, rtl, states |
     * | `vrt-mobile-safari`  | iPhone 17 Pro  | webkit   | light, states                                            |
     *
     * The extended captures are chromium only: scaling the font size and forcing colors go through CDP. The baselines
     * are named after the device and end in the bare engine name – `--desktop-chrome.png`, `--mobile-safari.png`.
     * `prepare-vrt-snapshots` derives the regression artifacts from that suffix and recognises a project's output folder
     * by it, which is why the project names end in the engine too. They cannot be bare engine names, since they have
     * to be unique across the suites, so the suffix is fixed per project instead of taken from `{projectName}`.
     */
    {
      ...vrt,
      name: 'vrt-desktop-chrome',
      snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-chrome{ext}',
      use: { ...vrt.use, ...devices['Desktop Chrome'], browserName: 'chromium', deviceScaleFactor: 1 },
      metadata: { device: 'desktop' },
    },
    {
      ...vrt,
      name: 'vrt-mobile-safari',
      snapshotPathTemplate: '{testDir}/__screenshots__/{arg}-safari{ext}',
      use: { ...vrt.use, ...devices['iPhone 17 Pro'], browserName: 'webkit', deviceScaleFactor: 1 },
      metadata: { device: 'mobile' },
    },
  ],
});
