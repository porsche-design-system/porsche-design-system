import {
  fontPorscheNext,
  leadingNormal,
  legacyRadiusSmall,
  radiusSm,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle } from 'jss';

export const getButtonImageJssStyle: JssStyle = {
  font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct calculations based on ex-unit
  width: 'auto',
  height: ref(leadingNormal),
  borderRadius: ref(legacyRadiusSmall, ref(radiusSm)),
};
