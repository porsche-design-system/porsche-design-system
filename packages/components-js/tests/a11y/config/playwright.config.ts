import { defineConfig, devices } from '@playwright/test';
import { playwrightConfigA11y } from '@porsche-design-system/shared/testing';

export default defineConfig({
  ...playwrightConfigA11y,
  expect: {
    toMatchAriaSnapshot: {
      pathTemplate: '{testDir}/a11ytree/__snapshots__/{arg}{ext}',
    },
  },
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run start-app',
    port: 8575,
  },
});
