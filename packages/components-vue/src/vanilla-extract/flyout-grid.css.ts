import { gridGap, spacingFluidLarge } from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  opacity: 0,
  overflowX: 'hidden',
  maxWidth: '1180px',
  boxSizing: 'border-box',
  paddingTop: '100px',
  paddingRight: spacingFluidLarge,
  paddingBottom: '150px',
  paddingLeft: spacingFluidLarge,
  vars: {
    '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
    '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
  },
});
