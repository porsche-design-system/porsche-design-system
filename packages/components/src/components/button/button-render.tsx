import { h, type JSX } from '@stencil/core';
import type { Class, FunctionPropertyNames } from '../../types';
import { Button } from './button';
import { getButtonAriaAttributes } from './button-utils';
import { hasVisibleIcon } from '../../utils';
import type { PrefixedTagNames } from '../../utils/tag-name';

export type Props<T extends Class<any>> = Omit<InstanceType<T>, 'host' | FunctionPropertyNames<InstanceType<T>>>;

export const getJSX = (
  {
    type,
    name,
    value,
    variant,
    disabled,
    loading,
    icon,
    theme,
    iconSource,
    // hideLabel,
    aria,
  }: Props<typeof Button>,
  prefixedTagNames?: PrefixedTagNames
): JSX.Element => {
  return (
    <button {...getButtonAriaAttributes(disabled, loading, aria)} class="root" type={type} name={name} value={value}>
      {loading && (
        <prefixedTagNames.pSpinner
          class="spinner"
          size="inherit"
          theme={theme}
          aria={{ 'aria-label': 'Loading state' }}
        />
      )}
      {hasVisibleIcon(icon, iconSource) && (
        <prefixedTagNames.pIcon
          class="icon"
          size="inherit"
          name={iconSource ? undefined : icon}
          source={iconSource}
          color={disabled ? (variant === 'primary' ? 'contrast-high' : 'state-disabled') : 'primary'}
          theme={theme}
          aria-hidden="true"
        />
      )}
      <span class="label">
        <slot />
      </span>
    </button>
  );
};
