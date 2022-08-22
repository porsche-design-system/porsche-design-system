import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useRef, ChangeEvent, FocusEvent } from 'react';
import { useBrowserLayoutEffect, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import type { FormState } from '../../lib/types';
import type { Spacing } from '../../spacing';
import { getPaddingStyles } from '../../spacing';

type InnerCheckboxProps = {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.checked
   */
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export type PCheckboxProps = HTMLAttributes<{}> & {
  spacingTop?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  spacingBottom?: Spacing;
  /**
   * Show or hide label. For better accessibility it's recommended to show the label.
   */
  hideLabel?: boolean;
  /**
   * The label text.
   */
  label?: string;
  /**
   * The message styled depending on validation state.
   */
  message?: string;
  /**
   * The validation state.
   */
  state?: FormState;
} & InnerCheckboxProps;

export const Checkbox = /*#__PURE__*/ forwardRef(
  (props: PropsWithChildren<PCheckboxProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const elementRef = useRef<HTMLElement>();
    const Tag = usePrefix('p-checkbox-wrapper');

    const {
      hideLabel = false,
      label = '',
      message = '',
      state = 'none',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      // dummy checkbox props
      disabled,
      readOnly,
      required,
      checked,
      onChange,
      onFocus,
    } = props;

    const propsToSync = [hideLabel, label, message, state];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      ['hideLabel', 'label', 'message', 'state'].forEach(
        (propName, i) => ((current as any)[propName] = propsToSync[i])
      );
    }, propsToSync);

    const outerProps = {
      hideLabel,
      label,
      message,
      state,
      style: { ...getPaddingStyles({ spacingTop, spacingLeft, spacingRight, spacingBottom }) },
      ref: syncRef(elementRef, ref),
    };

    const innerProps = {
      disabled,
      readOnly,
      required,
      checked,
      onChange,
      onFocus,
    };

    return (
      <Tag {...outerProps}>
        <input type="checkbox" {...innerProps} />
      </Tag>
    );
  }
);
