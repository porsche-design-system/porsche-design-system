import {
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { GroupDirection } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
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
    alignItems: 'start',
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
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  direction: BreakpointCustomizable<GroupDirection>,
  theme: Theme
): string => {
  const scalingVar = `var(${cssVarInternalRadioGroupScaling}, ${compact ? 0.6668 : 1})`;

  const dimension = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const columnGap = `max(${spacingStaticSmall}, ${scalingVar} * ${spacingStaticMedium})`;
  const rowGap = `max(${spacingStaticXSmall}, ${scalingVar} * ${spacingStaticSmall})`;

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
        [`${cssVarInternalRadioGroupOptionScaling}`]: scalingVar,
      },
      ...getFunctionalComponentLabelAfterStyles(disabled),
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
    ...getFunctionalComponentLabelStyles(disabled, hideLabel, theme, {
      cursor: 'inherit',
    }),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    'sr-only': getHiddenTextJssStyle(),
  });
};
