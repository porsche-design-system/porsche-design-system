import { config } from '@porsche-design-system/shared/testing/playwright.a11y';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...config,
  webServer: {
    command: 'yarn start-app',
    port: 8080,
  },
});
