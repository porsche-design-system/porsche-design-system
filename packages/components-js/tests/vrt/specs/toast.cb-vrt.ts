import { cbVRT } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await cbVRT('toast-basic');
});

test.describe('should have no visual regression when dark', async () => {
  await cbVRT('toast-basic-dark');
});

test.describe('should have no visual regression with long-text', async () => {
  await cbVRT('toast-basic-long-text');
});

test.describe('should have no visual regression with offset', async () => {
  await cbVRT('toast-offset');
});

test.describe('should have no visual regression with prefix', async () => {
  await cbVRT('toast-prefixed');
});
