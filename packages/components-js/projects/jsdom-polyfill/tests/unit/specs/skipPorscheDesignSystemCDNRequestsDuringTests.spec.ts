import { skipPorscheDesignSystemCDNRequestsDuringTests } from '@porsche-design-system/components-react';
import { componentsReady } from '@porsche-design-system/components-js';

beforeEach(() => {
  // TODO: provide util from components-js
  skipPorscheDesignSystemCDNRequestsDuringTests();
});

afterEach(() => {
  (window as any).PDS_SKIP_FETCH = false;
});

it('should not fetch font-face definitions', () => {
  const link = document.querySelector('head').querySelector('link[rel="stylesheet"]');

  expect(link).toBeNull();
});

it('should not fetch marque', async () => {
  document.body.innerHTML = '<p-marque></p-marque>';
  await componentsReady();

  const picture = document.querySelector('p-marque').shadowRoot.querySelector('picture');

  expect(picture).toBeNull();
});

it('should not fetch icon', async () => {
  const spy = jest.spyOn(global, 'fetch');

  document.body.innerHTML = '<p-icon></p-icon>';
  await componentsReady();

  // let's wait a little for the promise exception
  await new Promise((resolve) => setTimeout(resolve, 5));

  expect(spy).not.toBeCalled();
});
