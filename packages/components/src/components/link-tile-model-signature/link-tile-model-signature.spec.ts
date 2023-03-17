import * as linkTileModelSignatureUtils from './link-tile-model-signature-utils';
import { LinkTileModelSignature } from './link-tile-model-signature';

describe('render', () => {
  it('should call getSlottedPLinksOrThrow() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link');
    const spy = jest
      .spyOn(linkTileModelSignatureUtils, 'getSlottedPLinksOrThrow')
      .mockReturnValue([mockedPLink, mockedPLink]);

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toBeCalledWith(component.host);
  });

  it('should call setRequiredPropsOfSlottedLinks() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link');
    jest.spyOn(linkTileModelSignatureUtils, 'getSlottedPLinksOrThrow').mockReturnValue([mockedPLink, mockedPLink]);

    const spy = jest.spyOn(linkTileModelSignatureUtils, 'setRequiredPropsOfSlottedLinks');
    const component = new LinkTileModelSignature();

    component.host = document.createElement('p-link-tile-model');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toBeCalledWith([mockedPLink, mockedPLink]);
  });
});
