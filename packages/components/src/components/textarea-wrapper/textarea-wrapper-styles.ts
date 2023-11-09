import { type Styles } from 'jss';
import { type BreakpointCustomizable, type Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getSlottedInputTextareaSelectStyles } from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { type FormState } from '../../utils/form/form-state';
import {
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';

// TODO: textarea safe zone is not really in sync with the safe zone of textfield
const textareaSafeZoneHorizontal = '12px';
const textareaSafeZoneVertical = '6px';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);
  const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(textarea)
      ...mergeDeep(
        addImportantToEachRule(
          getSlottedInputTextareaSelectStyles('textarea', state, theme, {
            gridArea: '1/1/4/6',
            font: textSmallStyle.font, // to override line-height
            padding: hasCounter ? `12px ${spacingStaticMedium} ${spacingStaticLarge}` : `12px ${spacingStaticMedium}`,
          })
        ),
        {
          '::slotted(textarea)': {
            height: 'auto', // removes !important from getBaseChildStyles
            minHeight: '200px', // min-height should be overridable
            resize: 'vertical', // overridable, too
          },
        } as Styles
      ),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${textareaSafeZoneHorizontal} auto minmax(0, 1fr) auto ${textareaSafeZoneHorizontal}`,
      gridTemplateRows: `${textareaSafeZoneVertical} auto ${textareaSafeZoneVertical}`,
    },
    ...(hasCounter && {
      counter: {
        gridArea: '2/4/3/5',
        alignSelf: 'flex-end',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        font: textSmallStyle.font,
        color: contrastMediumColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: contrastMediumColorDark,
        }),
      },
      // TODO: maybe we should extract it as functional component too
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
