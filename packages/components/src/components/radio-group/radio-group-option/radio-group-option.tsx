import { AttachInternals, Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { LoadingMessage } from '../../common/loading-message/loading-message';
import type { RadioGroupChangeEventDetail } from '../radio-group/radio-group-utils';
import { getComponentCss } from './radio-group-option-styles';
import type { RadioGroupOptionInternalHTMLProps } from './radio-group-option-utils';

const propTypes: PropTypes<typeof RadioGroupOption> = {
  value: AllowedTypes.string,
  label: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
};

// Though "description" and "message" slots are technically available (provided by the "label" component),
// they are not documented here to avoid confusion since they are not intended for use within radio group options.
/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)." }
 */
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

  /** Disables the radio group option. The value will not be submitted with the form. */
  @Prop() public disabled?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  @AttachInternals() private internals: ElementInternals;

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

    // Workaround to get correct number and index of items announced by screen readers (e.g. "1 of 3")
    // Internals is used instead of sprouting aria role/attributes to the host element to not expose axe-core violations of nested ui elements
    const internals = this.internals;
    if (internals) {
      internals.role = 'radio';
      internals.ariaChecked = isSelected ? 'true' : 'false';
      internals.ariaDisabled = isDisabled || isLoading ? 'true' : null;
      internals.ariaInvalid = state === 'error' ? 'true' : null;
    }

    return (
      <Host onClick={!isDisabled && !isLoading && this.onHostClick} onBlur={this.onBlur}>
        <div class="root">
          <div class="wrapper">
            <input
              id={id}
              type="radio"
              name={name}
              checked={isSelected}
              disabled={isDisabled || isLoading}
              value={this.value}
              tabIndex={-1}
              aria-hidden="true"
              onClick={(e) => {
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.host.focus();
              }}
              onChange={this.onChange}
              ref={(el) => (this.inputElement = el)}
            />
            {/* true if this option should show its own loading state (option loading, NOT selected, parent NOT loading) */}
            {isOptionLoading && !this.host.loadingParent && (
              <PrefixedTagNames.pSpinner class="spinner" aria-hidden="true" />
            )}
          </div>
          <Label
            host={this.host}
            label={this.label}
            htmlFor={id}
            isDisabled={isDisabled}
            isLoading={isLoading}
            stopClickPropagation={true}
          />
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
    this.host.focus();
    this.inputElement.click();
  };
}
