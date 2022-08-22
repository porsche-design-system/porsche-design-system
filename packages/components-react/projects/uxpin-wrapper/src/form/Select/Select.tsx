import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import { useBrowserLayoutEffect, usePrefix } from '../../hooks';
import { syncRef } from '../../utils';
import type { DropdownDirection, FormState, Theme } from '../../lib/types';
import type { Spacing } from '../../spacing';
import { getPaddingStyles } from '../../spacing';

type InnerSelectProps = {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  /**
   * @uxpinbind onChange 0.target.value
   */
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  options?: string[];
};

export type PSelectProps = HTMLAttributes<{}> & {
  spacingTop?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  spacingBottom?: Spacing;
  /**
   * The description text.
   */
  description?: string;
  /**
   * Changes the direction to which the dropdown list appears.
   */
  dropdownDirection?: DropdownDirection;
  /**
   * Filters select options by typing a character
   */
  filter?: boolean;
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
   * Forces rendering of native browser select dropdown
   */
  native?: boolean;
  /**
   * The validation state.
   */
  state?: FormState;
  /**
   * Adapts the select color depending on the theme.
   */
  theme?: Theme;
} & InnerSelectProps;

export const Select = /*#__PURE__*/ forwardRef(
  (props: PropsWithChildren<PSelectProps>, ref: ForwardedRef<HTMLElement>): JSX.Element => {
    const {
      description = '',
      dropdownDirection = 'auto',
      filter = false,
      hideLabel = false,
      label = '',
      message = '',
      native = false,
      state = 'none',
      theme = 'light',
      spacingTop,
      spacingLeft,
      spacingRight,
      spacingBottom,
      // inner props
      disabled,
      placeholder,
      readOnly,
      required,
      value,
      onFocus,
      onChange,
      onBlur,
      options,
      ...rest
    } = props;
    const elementRef = useRef<HTMLElement>();
    const Tag = usePrefix('p-select-wrapper');

    const propsToSync = [description, dropdownDirection, filter, hideLabel, label, message, native, state, theme];
    useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      [
        'description',
        'dropdownDirection',
        'filter',
        'hideLabel',
        'label',
        'message',
        'native',
        'state',
        'theme',
      ].forEach((propName, i) => ((current as any)[propName] = propsToSync[i]));
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
      onFocus,
      onChange,
      onBlur,
      options,
    };

    return (
      <Tag {...outerProps}>
        <select {...innerProps}>
          {options.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>
      </Tag>
    );
  }
);
