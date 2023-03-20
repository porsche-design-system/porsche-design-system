import * as linkTileModelSignatureUtils from './link-tile-model-signature-utils';
import * as throwIfElementIsNotOfKindUtils from '../../utils/validation/throwIfElementIsNotOfKind';
import * as getNamedSlotOrThrowUtils from '../../utils/validation/getNamedSlotOrThrow';
import { LinkTileModelSignature } from './link-tile-model-signature';

describe('render', () => {
  it('should call getNamedSlotOrThrow() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link') as unknown as HTMLSlotElement;
    const spy = jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(mockedPLink);

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toHaveBeenNthCalledWith(1, component.host, 'primary');
    expect(spy).toHaveBeenNthCalledWith(2, component.host, 'secondary');
  });

  it('should call throwIfElementIsNotOfKind() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link') as unknown as HTMLSlotElement;
    jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(mockedPLink);

    const spy = jest.spyOn(throwIfElementIsNotOfKindUtils, 'throwIfElementIsNotOfKind').mockImplementation(jest.fn());

    const component = new LinkTileModelSignature();
    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toHaveBeenNthCalledWith(1, component.host, mockedPLink, 'p-link');
    expect(spy).toHaveBeenNthCalledWith(2, component.host, mockedPLink, 'p-link');
  });

  it('should call setRequiredPropsOfSlottedLinks() with correct parameters', () => {
    const mockedPLink = document.createElement('p-link') as unknown as HTMLSlotElement;
    jest.spyOn(getNamedSlotOrThrowUtils, 'getNamedSlotOrThrow').mockReturnValue(mockedPLink);

    const spy = jest.spyOn(linkTileModelSignatureUtils, 'setRequiredPropsOfSlottedLinks');
    const component = new LinkTileModelSignature();

    component.host = document.createElement('p-link-tile-model-signature');
    component.host.attachShadow({ mode: 'open' });
    component.render();

    expect(spy).toBeCalledWith([mockedPLink, mockedPLink]);
  });
});
