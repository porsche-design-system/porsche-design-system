import { getDisabledBaseStyles, getTransition } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName } from '../../types';
import { getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import type { ButtonVariant } from './button-utils';

export const cssVariableInternalButtonScaling = '--_p-button-a';

/**
 * @css-variable {"name": "--p-button-bg", "description": "Overrides the background color of the button in every state, including hover. You are responsible for ensuring sufficient contrast and brand compliance.", "defaultValue": ""}
 */
const cssVarBackground = '--p-button-bg';

/**
 *  @css-variable {"name": "--p-button-fg", "description": "Overrides the foreground color (label, icon and loading spinner) of the button in every state, including hover. You are responsible for ensuring sufficient contrast and brand compliance.", "defaultValue": ""}
 */
const cssVarForeground = '--p-button-fg';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: BreakpointCustomizable<boolean>
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  return getCss(
    mergeDeep(
      getLinkButtonStyles(
        icon,
        iconSource,
        variant,
        hideLabel,
        disabledOrLoading,
        false,
        isCompact,
        cssVariableInternalButtonScaling,
        cssVarBackground,
        cssVarForeground
      ),
      {
        root: {
          ...(disabledOrLoading && {
            cursor: 'not-allowed',
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles({
              '&': {
                boxShadow: 'inset 0 0 0 2px GrayText !important',
              },
            }),
          }),
        },
        ...(isLoading && {
          spinner: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...((variant === 'primary' || variant === 'destructive') && {
              '--p-spinner-color': 'currentcolor',
            }),
          },
        }),
        label: {
          transition: getTransition('opacity'),
          ...(isLoading && {
            opacity: 0, // use opacity for smooth transition between states
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        icon: {
          transition: getTransition('opacity'),
          ...(isLoading && {
            opacity: 0, // use opacity for smooth transition between states
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
      }
    )
  );
};
