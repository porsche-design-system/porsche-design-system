import { getCss, mergeDeep } from '../../utils';
import { getButtonLinkTileStyles } from '../../styles/tile/button-link-tile-styles';
import { addImportantToRule } from '../../styles';

export const getComponentCss = (
  isDisabled: boolean,
  isDisabledOrLoading: boolean,
  ...args: Parameters<typeof getButtonLinkTileStyles>
): string => {
  return getCss(
    mergeDeep(
      getButtonLinkTileStyles(...args),
      {
        '@global': {
          ':host': {
            cursor: addImportantToRule(isDisabledOrLoading ? 'not-allowed' : 'pointer'),
          },
        },
      },
      isDisabled && {
        root: {
          // chained image-container to beat css specificity of hover media query
          '&:hover .image-container': {
            '& ::slotted(picture),::slotted(img)': {
              transform: addImportantToRule('none'),
            },
          },
        },
      }
    )
  );
};
