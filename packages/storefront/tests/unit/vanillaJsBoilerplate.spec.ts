import { getIndexHtmlMarkup } from '../../src/utils/stackblitz/vanillaJsBoilerplate';

import * as vanillaJsBoilerplateUtils from '../../src/utils/stackblitz/vanillaJsBoilerplate';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as formattingUtils from '../../src/utils/formatting';

describe('getIndexHtmlMarkup()', () => {
  it('should call extendMarkupWithSharedTableData() when isTable = true', () => {
    const spy = jest
      .spyOn(vanillaJsBoilerplateUtils, 'extendMarkupWithSharedTableData')
      .mockImplementationOnce(() => '');
    const markup = 'Some markup';
    getIndexHtmlMarkup(markup, true);

    expect(spy).toBeCalledWith(markup);
  });

  it('should call convertMarkup() when isTable = false', () => {
    const spy = jest.spyOn(formattingUtils, 'convertMarkup');
    const markup = 'Some markup';
    getIndexHtmlMarkup(markup, false);

    expect(spy).toBeCalledWith(markup, 'vanilla-js');
  });
});
