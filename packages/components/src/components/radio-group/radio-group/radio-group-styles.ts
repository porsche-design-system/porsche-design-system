import {
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles, getDisabledBaseStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { GroupDirection } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, type GetJssStyleFunction, getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
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
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  direction: BreakpointCustomizable<GroupDirection>
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
      '::slotted(*)': {
        ...(loading && getDisabledBaseStyles())
      },
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
    ...getFunctionalComponentLabelStyles(disabled, hideLabel, {
      cursor: 'inherit',
      '&:is(legend)': {
        marginBottom: spacingStaticXSmall, // this fixes a known layout bug of the legend element (in all browsers) when the parent fieldset is a flex or grid container
      },
    }),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    'sr-only': getHiddenTextJssStyle(),
  });
};
