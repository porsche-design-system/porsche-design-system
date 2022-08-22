import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import { useBrowserLayoutEffect, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import type { FormState } from '../../lib/types';
import type { Spacing } from '../../spacing';
import { getPaddingStyles } from '../../spacing';

type InnerRadioButtonProps = {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.checked
   */
  checked?: boolean;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export type PRadioButtonProps = HTMLAttributes<{}> & {
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
  onClick?: (e: MouseEvent) => void;
} & InnerRadioButtonProps;

export const RadioButton = /*#__PURE__*/ forwardRef(
  (props: PropsWithChildren<PRadioButtonProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const {
      hideLabel = false,
      label = '',
      message = '',
      state = 'none',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      // inner radio props
      disabled,
      readOnly,
      required,
      checked,
      name,
      onChange,
      onFocus,
      onBlur,
      ...rest
    } = props;

    const elementRef = useRef<HTMLElement>();
    const Tag = usePrefix('p-radio-button-wrapper');

    const propsToSync = [hideLabel, label, message, state];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      ['hideLabel', 'label', 'message', 'state'].forEach(
        (propName, i) => ((current as any)[propName] = propsToSync[i])
      );
    }, propsToSync);

    const outerProps = {
      ...rest,
      style: getPaddingStyles({ spacingTop, spacingLeft, spacingRight, spacingBottom }),
      ref: syncRef(elementRef, ref),
    };

    const innerProps = {
      disabled,
      readOnly,
      required,
      checked,
      name,
      onChange,
      onFocus,
      onBlur,
    };

    return (
      <Tag {...outerProps}>
        <input type="radio" {...innerProps} />
      </Tag>
    );
  }
);
