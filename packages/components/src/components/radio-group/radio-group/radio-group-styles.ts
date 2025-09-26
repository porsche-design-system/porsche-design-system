import {
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  getHiddenTextJssStyle,
  getThemedColors,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { type GroupDirection, getGroupDirectionJssStyles } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalRadioGroupOptionScaling } from '../radio-group-option/radio-group-option-styles';

export const cssVarInternalRadioGroupScaling = '--p-internal-radio-group-scaling';

export const getComponentCss = (
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  direction: BreakpointCustomizable<GroupDirection>,
  theme: Theme
): string => {
  const scalingVar = `var(${cssVarInternalRadioGroupScaling}, ${compact ? 0.5 : 1})`;

  const { primaryColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark } = getThemedColors('dark');
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);

  const hoverStyles = {
    borderColor: formStateHoverColor || primaryColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      borderColor: formStateHoverColorDark || primaryColorDark,
    }),
  };
  const dimension = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const columnGap = `max(${spacingStaticSmall}, ${scalingVar} * ${spacingStaticMedium})`;
  const rowGap = `max(${spacingStaticXSmall}, ${scalingVar} * ${spacingStaticSmall})`;

  return getCss({
    '@global': {
      ':host': {
        [`${cssVarInternalRadioGroupOptionScaling}`]: scalingVar,
      },
    },
    root: {
      display: 'grid',
      justifySelf: 'flex-start',
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
      columnGap,
      rowGap,
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: dimension,
        height: dimension,
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      disabled,
      hideLabel,
      theme,
      !disabled && {
        ...hoverMediaQuery({
          '&:hover~.wrapper': hoverStyles,
        }),
        cursor: 'inherit', // label is not clickable
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    'sr-only': getHiddenTextJssStyle(),
  });
};
