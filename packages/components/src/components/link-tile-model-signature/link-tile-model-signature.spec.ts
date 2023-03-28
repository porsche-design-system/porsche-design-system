import * as linkTileModelSignatureUtils from './link-tile-model-signature-utils';
import * as throwIfElementIsNotOfKindUtils from '../../utils/validation/throwIfElementIsNotOfKind';
import * as getNamedSlotOrThrowUtils from '../../utils/validation/getNamedSlotOrThrow';
import { LinkTileModelSignature } from './link-tile-model-signature';

describe('render', () => {
  it('should call getNamedSlotOrThrow() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link');
    const spy = jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(mockedPLink);

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    try {
      component.render();
    } catch {}

    expect(spy).toHaveBeenNthCalledWith(1, component.host, 'primary');
    expect(spy).toHaveBeenNthCalledWith(2, component.host, 'secondary');
  });

  it('should call throwIfElementIsNotOfKind() with correct parameters', () => {
    const mockedPLink1 = document.createElement('p-link');
    mockedPLink1.id = '1';
    const mockedPLink2 = document.createElement('p-link');
    mockedPLink2.id = '2';
    jest
      .spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow')
      .mockReturnValueOnce(mockedPLink1)
      .mockReturnValueOnce(mockedPLink2);

    const spy = jest.spyOn(throwIfElementIsNotOfKindUtils, 'throwIfElementIsNotOfKind').mockImplementation(jest.fn());

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    try {
      component.render();
    } catch {}

    expect(spy).toHaveBeenNthCalledWith(1, component.host, mockedPLink1, 'p-link');
    expect(spy).toHaveBeenNthCalledWith(2, component.host, mockedPLink2, 'p-link');
  });

  it('should call setRequiredPropsOfSlottedLinks() with correct parameters', () => {
    const mockedPLink1 = document.createElement('p-link');
    mockedPLink1.id = '1';
    const mockedPLink2 = document.createElement('p-link');
    mockedPLink2.id = '2';
    jest
      .spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow')
      .mockReturnValueOnce(mockedPLink1)
      .mockReturnValueOnce(mockedPLink2);

    const spy = jest.spyOn(linkTileModelSignatureUtils, 'setRequiredPropsOfSlottedLinks');

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    try {
      component.render();
    } catch {}

    expect(spy).toBeCalledWith([mockedPLink1, mockedPLink2]);
  });

  it('should call getLinkOrSlottedAnchorElement() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link');
    jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(mockedPLink);

    const spy = jest.spyOn(linkTileModelSignatureUtils, 'getLinkOrSlottedAnchorElement');

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    try {
      component.render();
    } catch {}

    expect(spy).toBeCalledWith(mockedPLink);
  });
});
