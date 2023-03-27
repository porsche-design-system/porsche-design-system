import { getCss, mergeDeep } from '../../utils';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';
import { addImportantToRule } from '../../styles';

export const getComponentCss = (
  isDisabledOrLoading: boolean,
  ...args: Parameters<typeof getButtonLinkTileStyles>
): string => {
  return getCss(
    mergeDeep(getButtonLinkTileStyles(...args), {
      '@global': {
        ':host': {
          cursor: addImportantToRule(isDisabledOrLoading ? 'not-allowed' : 'pointer'),
        },
      },
    })
  );
};
