import { type FunctionalComponent, h, type JSX } from '@stencil/core';
import type { Theme } from '../../../types';
import { getPrefixedTagNames } from '../../../utils';
import { Label } from '../label/label';
import { descriptionId } from '../label/label-utils';
import { LoadingMessage, loadingId } from '../loading-message/loading-message';
import { messageId, StateMessage } from '../state-message/state-message';
import type {
  InputBaseBlurEventDetail,
  InputBaseChangeEventDetail,
  InputBaseInputEventDetail,
  InputBaseState,
  InputBaseWheelEventDetail,
} from './input-base-utils';

// TODO refine in #3852
type InputBaseProps = {
  host: HTMLElement;
  id: string;
  label?: string;
  description?: string;
  loading?: boolean;
  initialLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  state?: InputBaseState;
  message?: string;
  theme?: Theme;
  readOnly?: boolean;
  name: string;
  form?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  max?: number | string;
  min?: number | string;
  autoComplete?: string;
  pattern?: string;
  multiple?: boolean;
  type: string;
  value?: string;
  step?: number;
  spellCheck?: boolean;
  onWheel?: (e: InputBaseWheelEventDetail) => void;
  onInput?: (e: InputBaseInputEventDetail) => void;
  onChange?: (e: InputBaseChangeEventDetail) => void;
  onBlur?: (e: InputBaseBlurEventDetail) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  refElement?: (el: HTMLInputElement) => void;
  start?: JSX.Element;
  end?: JSX.Element;
};

export const InputBase: FunctionalComponent<InputBaseProps> = ({
  host,
  id,
  label,
  description,
  loading,
  initialLoading,
  required,
  disabled,
  state,
  message,
  theme,
  readOnly,
  type,
  form,
  placeholder,
  maxLength,
  minLength,
  max,
  min,
  value,
  step,
  spellCheck,
  autoComplete,
  pattern,
  multiple,
  name,
  onInput,
  onWheel,
  onChange,
  onBlur,
  onKeyDown,
  refElement,
  start,
  end,
}) => {
  const PrefixedTagNames = getPrefixedTagNames(host);

  return (
    <div class="root">
      <Label
        host={host}
        label={label}
        description={description}
        htmlFor={id}
        isRequired={required}
        isLoading={loading}
        isDisabled={disabled}
      />
      <div class="wrapper">
        <slot name="start" />
        {start}
        <input
          aria-describedby={loading ? loadingId : `${descriptionId} ${messageId}`}
          aria-invalid={state === 'error' ? 'true' : null}
          aria-disabled={disabled || loading ? 'true' : null}
          aria-readonly={readOnly ? 'true' : null}
          id={id}
          ref={refElement}
          onInput={onInput}
          onChange={onChange}
          onBlur={onBlur}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          name={name}
          form={form}
          type={type}
          required={required}
          placeholder={placeholder || null}
          maxlength={maxLength}
          minlength={minLength}
          spellcheck={spellCheck}
          max={max}
          min={min}
          step={step}
          value={value}
          readonly={readOnly}
          autocomplete={autoComplete}
          disabled={disabled}
          pattern={pattern}
          multiple={multiple}
          dir="auto"
        />
        {end}
        <slot name="end" />
        {loading && <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={theme} aria-hidden="true" />}
      </div>
      <StateMessage state={state} message={message} theme={theme} host={host} />
      <LoadingMessage loading={loading} initialLoading={initialLoading} />
    </div>
  );
};
