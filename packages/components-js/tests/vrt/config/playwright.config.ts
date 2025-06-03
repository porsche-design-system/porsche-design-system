import { config } from '@porsche-design-system/shared/testing/playwright.vrt';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
        launchOptions: {
          // force GPU hardware acceleration (even in headless mode)
          args: ['--use-gl=egl', '--ignore-gpu-blocklist', '--use-gl=angle'],
        }
      },
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1,
      },
      workers: process.env.CI ? 1 : undefined,
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 8575,
  },
});
