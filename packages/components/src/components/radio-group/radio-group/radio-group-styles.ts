import { spacingStaticXSmall } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { GroupDirection } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, type GetJssStyleFunction, getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalRadioGroupOptionScaling } from '../radio-group-option/radio-group-option-styles';

export const cssVarInternalRadioGroupScaling = '--p-internal-radio-group-scaling';

const groupRadioGroupDirectionJssStyles: Record<GroupDirection, JssStyle> = {
  column: {
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  row: {
    flexFlow: 'row wrap',
    alignItems: 'start',
  },
};

const getRadioGroupDirectionJssStyles: GetJssStyleFunction = (direction: GroupDirection): JssStyle => {
  return groupRadioGroupDirectionJssStyles[direction];
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  isDisabled: boolean,
  isLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isCompact: boolean,
  direction: BreakpointCustomizable<GroupDirection>
): string => {
  const radioDimension = `calc(var(${cssVarInternalRadioGroupScaling}) * 1.75rem)`;
  const columnGap = `calc(22.4px * (var(${cssVarInternalRadioGroupScaling}) - 0.64285714) + 8px)`;
  const rowGap = `calc(11.2px * (var(${cssVarInternalRadioGroupScaling}) - 0.64285714) + 4px)`;

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
        [`${cssVarInternalRadioGroupScaling}`]: isCompact ? 0.64285714 : 1,
        [`${cssVarInternalRadioGroupOptionScaling}`]: isCompact ? 0.64285714 : 1,
      },
      ...getFunctionalComponentLabelAfterStyles(isDisabled, getDisabledBaseStyles()),
      ...(isLoading && {
        '::slotted(*:not([slot]))': {
          getDisabledBaseStyles,
        },
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      all: 'unset',
      display: 'grid',
      justifySelf: 'flex-start',
      rowGap: spacingStaticXSmall,
    },
    wrapper: {
      alignItems: 'start',
      position: 'relative',
      display: 'flex',
      ...buildResponsiveStyles(direction, getRadioGroupDirectionJssStyles),
      columnGap,
      rowGap,
    },
    ...(isLoading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: radioDimension,
        height: radioDimension,
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, {
      ...(isDisabled ? getDisabledBaseStyles() : { cursor: 'inherit' }), // the label is not clickable
    }),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    'sr-only': getHiddenTextJssStyle(),
  });
};
