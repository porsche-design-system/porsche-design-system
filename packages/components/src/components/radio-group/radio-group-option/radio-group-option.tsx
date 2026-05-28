import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getNamedSlot,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { LoadingMessage } from '../../common/loading-message/loading-message';
import type { RadioGroupChangeEventDetail } from '../radio-group/radio-group-utils';
import { getComponentCss } from './radio-group-option-styles';
import { getRadioGroupOptionAriaAttributes, type RadioGroupOptionInternalHTMLProps } from './radio-group-option-utils';

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

  /** The value for the option. */
  @Prop() public value?: string;

  /** Text content for a user-facing label. */
  @Prop() public label?: string;

  /** Disables the radio group option. The value will not be submitted with the form. */
  @Prop() public disabled?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  private initialLoading: boolean = false;

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
    const { selected: isSelected, state } = this.host;
    const isDisabled = this.disabled || this.host.disabledParent;
    const isOptionLoading = this.loading && !isSelected;
    const isLoading = isOptionLoading || this.host.loadingParent;

    attachComponentCss(this.host, getComponentCss, isDisabled, isLoading, state);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host
        onClick={!isDisabled && !isLoading && this.onHostClick}
        onBlur={this.onBlur}
        {...getRadioGroupOptionAriaAttributes(isSelected, isDisabled, isLoading, state)}
      >
        <div class="root">
          <div class="wrapper">
            <span
              class={{
                radio: true,
                'radio--checked': isSelected,
              }}
              aria-hidden="true"
            />
            {isOptionLoading && !this.host.loadingParent && (
              <PrefixedTagNames.pSpinner class="spinner" aria-hidden="true" />
            )}
          </div>
          <Label host={this.host} label={this.label} isDisabled={isDisabled} isLoading={isLoading} />
          {!this.host.loadingParent && (
            <LoadingMessage loading={isOptionLoading} initialLoading={this.initialLoading} />
          )}
        </div>
      </Host>
    );
  }

  private onHostClick = (e: MouseEvent): void => {
    if (this.host.selected || e.target === getNamedSlot(this.host, 'label-after')) {
      return;
    }
    this.emitSelectionChange(e);
  };

  private emitSelectionChange = (originalEvent: RadioGroupChangeEventDetail): void => {
    originalEvent.stopPropagation();
    originalEvent.stopImmediatePropagation();
    this.host.dispatchEvent(
      new CustomEvent('internalRadioGroupOptionChange', {
        bubbles: true,
        detail: originalEvent,
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
}
