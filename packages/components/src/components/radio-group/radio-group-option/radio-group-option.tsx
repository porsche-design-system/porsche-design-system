import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { LoadingMessage, loadingId } from '../../common/loading-message/loading-message';
import { messageId } from '../../common/state-message/state-message';
import type { RadioGroupChangeEventDetail } from '../radio-group/radio-group-utils';
import { getComponentCss } from './radio-group-option-styles';
import type { RadioGroupOptionInternalHTMLProps } from './radio-group-option-utils';

const propTypes: PropTypes<typeof RadioGroupOption> = {
  value: AllowedTypes.string,
  label: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 */
@Component({
  tag: 'p-radio-group-option',
  shadow: { delegatesFocus: true },
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

  private initialLoading: boolean = false;
  private inputElement!: HTMLInputElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-radio-group']);
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { selected: isSelected, name, state } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    const isOptionLoading = this.loading && !isSelected;
    const isLoading = isOptionLoading || this.host.loadingParent;

    attachComponentCss(this.host, getComponentCss, isDisabled, isLoading, state);

    const id = 'radio-group-option';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onClick={!isDisabled && !isLoading && this.onHostClick} onBlur={this.onBlur}>
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
              id={id}
              type="radio"
              name={name}
              checked={isSelected}
              disabled={isDisabled || isLoading}
              value={this.value}
              onClick={(e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
              }}
              onChange={this.onChange}
              onBlur={this.onBlur}
              aria-describedby={isLoading ? loadingId : `${messageId}`}
              aria-invalid={state === 'error' ? 'true' : null}
              aria-disabled={isDisabled || isLoading ? 'true' : null}
              ref={(el) => (this.inputElement = el)}
            />
            {/* true if this option should show its own loading state (option loading, NOT selected, parent NOT loading) */}
            {isOptionLoading && !this.host.loadingParent && (
              <PrefixedTagNames.pSpinner class="spinner" size="inherit" aria-hidden="true" />
            )}
          </div>
          {!this.host.loadingParent && (
            <LoadingMessage loading={isOptionLoading} initialLoading={this.initialLoading} />
          )}
        </div>
      </Host>
    );
  }

  private onChange = (e: RadioGroupChangeEventDetail): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.host.dispatchEvent(
      new CustomEvent('internalRadioGroupOptionChange', {
        bubbles: true,
        detail: e, // forward native input change event
      })
    );
  };

  private onBlur = (e: FocusEvent): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.host.dispatchEvent(
      new CustomEvent('internalRadioGroupOptionBlur', {
        bubbles: true,
      })
    );
  };

  private onHostClick = (): void => {
    this.inputElement.focus();
    this.inputElement.click();
  };
}
