import type { JssStyle } from 'jss';
import { fontPorscheNext, leadingNormal, radiusSm, typescaleSm } from '../css-variables';

export const getButtonImageJssStyle: JssStyle = {
  font: `${typescaleSm} ${fontPorscheNext}`, // needed for correct calculations based on ex-unit
  width: 'auto',
  height: leadingNormal,
  borderRadius: radiusSm,
};
