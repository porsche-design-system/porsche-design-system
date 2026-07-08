import type { CssStyle } from '../../utils/css-serializer';
import {
  fontPorscheNext,
  leadingNormal,
  radiusSm,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';

export const getButtonImageCssStyle: CssStyle = {
  font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct calculations based on ex-unit
  width: 'auto',
  height: ref(leadingNormal),
  borderRadius: ref(radiusSm),
};
