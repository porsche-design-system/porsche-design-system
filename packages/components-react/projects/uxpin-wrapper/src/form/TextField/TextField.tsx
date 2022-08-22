import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import { useBrowserLayoutEffect, useEventCallback, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import type { IconName, FormState, TextFieldWrapperUnitPosition } from '../../lib/types';
import type { Spacing } from '../../spacing';
import { getPaddingStyles } from '../../spacing';

type InnerInputProps = {
  type?: 'text' | 'number' | 'email' | 'tel' | 'search' | 'url' | 'date' | 'time' | 'month' | 'week' | 'password';
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};
export type PTextFieldProps = HTMLAttributes<{}> & {
  spacingTop?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  spacingBottom?: Spacing;
  /**
   * Action icon can be set to `locate` for `input type="search"` in order to display an action button.
   */
  actionIcon?: Extract<IconName, 'locate'>;
  /**
   * Disables the action button and shows a loading indicator. No events will be triggered while loading state is active.
   */
  actionLoading?: boolean;
  /**
   * The description text.
   */
  description?: string;
  /**
   * Show or hide label and description text. For better accessibility it is recommended to show the label.
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
   * Emitted when the action button is clicked.
   */
  onAction?: (event: CustomEvent<void>) => void;
  /**
   * Show or hide max character count.
   */
  showCharacterCount?: boolean;
  /**
   * The validation state.
   */
  state?: FormState;
  /**
   * The unit text.
   */
  unit?: string;
  /**
   * The unit position.
   */
  unitPosition?: TextFieldWrapperUnitPosition;
  isWithinForm?: boolean;
  onFormSubmit?: () => void;
} & InnerInputProps;

export const TextField = /*#__PURE__*/ forwardRef(
  (props: PropsWithChildren<PTextFieldProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const {
      actionIcon,
      actionLoading = false,
      description = '',
      hideLabel = false,
      label = '',
      message = '',
      onAction,
      showCharacterCount = true,
      state = 'none',
      unit = '',
      unitPosition = 'prefix',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      isWithinForm,
      onFormSubmit,
      type = 'text',
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
    useEventCallback(elementRef, 'action', onAction as any);
    const Tag = usePrefix('p-text-field-wrapper');

    const propsToSync = [
      actionIcon,
      actionLoading,
      description,
      hideLabel,
      label,
      message,
      showCharacterCount,
      state,
      unit,
      unitPosition,
    ];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      [
        'actionIcon',
        'actionLoading',
        'description',
        'hideLabel',
        'label',
        'message',
        'showCharacterCount',
        'state',
        'unit',
        'unitPosition',
      ].forEach((propName, i) => ((current as any)[propName] = propsToSync[i]));
    }, propsToSync);

    const outerProps = {
      ...rest,
      style: getPaddingStyles({ spacingTop, spacingLeft, spacingRight, spacingBottom }),
      ref: syncRef(elementRef, ref),
    };

    const innerProps = {
      type,
      disabled,
      placeholder,
      readOnly,
      required,
      value,
      onChange,
      onFocus,
      onBlur,
    };

    return isWithinForm ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit && onFormSubmit();
        }}
      >
        <Tag {...outerProps}>
          <input {...innerProps} />
        </Tag>
      </form>
    ) : (
      <Tag {...outerProps}>
        <input {...innerProps} />
      </Tag>
    );
  }
);
