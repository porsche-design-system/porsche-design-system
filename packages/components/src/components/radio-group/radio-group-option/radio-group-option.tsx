import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { descriptionId } from '../../common/label/label-utils';
import { loadingId } from '../../common/loading-message/loading-message';
import { messageId } from '../../common/state-message/state-message';
import type { RadioGroupChangeEventDetail } from '../radio-group/radio-group-utils';
import { getComponentCss } from './radio-group-option-styles';
import type { RadioGroupOptionBlurEventDetail, RadioGroupOptionInternalHTMLProps } from './radio-group-option-utils';

const propTypes: PropTypes<typeof RadioGroupOption> = {
  value: AllowedTypes.string,
  label: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
};

@Component({
  tag: 'p-radio-group-option',
  shadow: true,
})
export class RadioGroupOption {
  @Element() public host!: HTMLElement & RadioGroupOptionInternalHTMLProps;

  /** The value for the input. */
  @Prop() public value?: string;

  /** Text content for a user-facing label. */
  @Prop() public label?: string;

  /** A boolean value that, if present, makes the radio group option unusable and unclickable. */
  @Prop() public disabled?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Emitted when the radio input has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<RadioGroupOptionBlurEventDetail>;

  private inputElement!: HTMLInputElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-radio-group']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', selected: isSelected, name, state } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    const isLoading = (this.loading && !isSelected) || this.host.loadingParent; // spinner is only displayed when radio is not checked already

    attachComponentCss(this.host, getComponentCss, isDisabled, isLoading, state, theme);

    const id = 'radio-group-option';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onClick={!isDisabled && !isLoading && !this.host.loadingParent && this.onHostClick}>
        {/* wrapped in host for programmatic selection via radio-group-option */}
        <div class="root">
          <Label
            host={this.host}
            label={this.label}
            htmlFor={id}
            isDisabled={isDisabled}
            isLoading={isLoading}
            stopClickPropagation={true}
          />
          <div class="wrapper">
            <input
              tabIndex={isSelected && !isDisabled ? 0 : -1}
              id={id}
              type="radio"
              name={name}
              checked={isSelected}
              disabled={isDisabled || isLoading}
              onClick={(e) => e.stopImmediatePropagation()}
              onChange={this.onChange}
              onBlur={this.onBlur}
              aria-describedby={isLoading ? loadingId : `${descriptionId} ${messageId}`}
              aria-invalid={state === 'error' ? 'true' : null}
              aria-disabled={isDisabled || isLoading ? 'true' : null}
              ref={(el) => (this.inputElement = el)}
            />
            {this.loading && !isSelected && !this.host.loadingParent && (
              <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={theme} aria-hidden="true" />
            )}
          </div>
        </div>
      </Host>
    );
  }

  private onChange = (e: RadioGroupChangeEventDetail): void => {
    e.stopImmediatePropagation();
    this.host.dispatchEvent(
      new CustomEvent('internalRadioGroupOptionChange', {
        bubbles: true,
        detail: e, // forward native input change event
      })
    );
  };

  private onBlur = (e: RadioGroupOptionBlurEventDetail): void => {
    e.stopImmediatePropagation();
    this.blur.emit(e);
  };

  private onHostClick = (): void => {
    this.inputElement.focus();
    this.inputElement.click();
  };
}
