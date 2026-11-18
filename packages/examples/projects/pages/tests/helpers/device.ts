import { test } from '@porsche-design-system/testing/playwright';

/** The devices every suite runs on – one project each, see `playwright.config.ts`. */
export type Device = 'desktop' | 'mobile';

/** The device the running project emulates, kept on the project so the specs have no second source of truth. */
export const getDevice = (): Device => test.info().project.metadata.device as Device;
