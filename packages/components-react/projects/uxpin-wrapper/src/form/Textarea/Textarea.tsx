import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import { useBrowserLayoutEffect, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import type { FormState } from '../../lib/types';
import type { Spacing } from '../../spacing';
import { getPaddingStyles } from '../../spacing';

type InnerTextareaProps = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export type PTextareaProps = HTMLAttributes<{}> & {
  spacingTop?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  spacingBottom?: Spacing;
  /**
   * The description text.
   */
  description?: string;
  /**
   * Show or hide label. For better accessibility it is recommended to show the label.
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
   * Show or hide max character count.
   */
  showCharacterCount?: boolean;
  /**
   * The validation state.
   */
  state?: FormState;
} & InnerTextareaProps;

export const Textarea = /*#__PURE__*/ forwardRef(
  (props: PropsWithChildren<PTextareaProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const {
      description = '',
      hideLabel = false,
      label = '',
      message = '',
      showCharacterCount = true,
      state = 'none',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      // inner textarea props
      disabled,
      placeholder,
      readOnly,
      required,
      value,
      onChange,
      onFocus,
      onBlur,
      ...rest
    } = props;

    const elementRef = useRef<HTMLElement>();
    const Tag = usePrefix('p-textarea-wrapper');

    const propsToSync = [description, hideLabel, label, message, showCharacterCount, state];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      ['description', 'hideLabel', 'label', 'message', 'showCharacterCount', 'state'].forEach(
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
      placeholder,
      readOnly,
      required,
      value,
      onChange,
      onFocus,
      onBlur,
    };

    return (
      <Tag {...outerProps}>
        <textarea {...innerProps} />
      </Tag>
    );
  }
);
