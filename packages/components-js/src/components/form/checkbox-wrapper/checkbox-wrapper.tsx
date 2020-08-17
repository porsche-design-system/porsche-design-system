import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../utils';
import { FormState } from '../../../types';

@Component({
  tag: 'p-checkbox-wrapper',
  styleUrl: 'checkbox-wrapper.scss',
  shadow: true
})
export class CheckboxWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private checked: boolean;
  @State() private disabled: boolean;
  @State() private indeterminate: boolean;

  private input: HTMLInputElement;

  public componentWillLoad(): void {
    this.setInput();
    this.setAriaAttributes();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public render(): JSX.Element {
    const labelClasses = prefix('checkbox-wrapper__label');
    const fakeCheckboxClasses = {
      [prefix('checkbox-wrapper__fake-checkbox')]: true,
      [prefix('checkbox-wrapper__fake-checkbox--checked')]: this.checked || this.indeterminate,
      [prefix('checkbox-wrapper__fake-checkbox--disabled')]: this.disabled,
      [prefix(`checkbox-wrapper__fake-checkbox--${this.state}`)]: this.state !== 'none'
    };
    const iconClasses = {
      [prefix('checkbox-wrapper__icon')]: true,
      [prefix('checkbox-wrapper__icon--checked')]: this.checked || this.indeterminate
    };
    const labelTextClasses = {
      [prefix('checkbox-wrapper__label-text')]: true,
      [prefix('checkbox-wrapper__label-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('checkbox-wrapper__label-text-', this.hideLabel, ['hidden', 'visible'])
    };
    const messageClasses = {
      [prefix('checkbox-wrapper__message')]: true,
      [prefix(`checkbox-wrapper__message--${this.state}`)]: this.state !== 'none'
    };

    return (
      <Host>
        <label class={labelClasses}>
          {this.isLabelVisible && (
            <p-text class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || (
                <span>
                  <slot name="label" />
                </span>
              )}
            </p-text>
          )}
          <span class={fakeCheckboxClasses}>
            <p-icon
              class={iconClasses}
              name={this.indeterminate ? 'minus' : 'check'}
              theme="dark"
              size="inherit"
              aria-hidden="true"
            />
            <slot />
          </span>
        </label>
        {this.isMessageVisible && (
          <p-text class={messageClasses} color="inherit" role={this.state === 'error' && 'alert'}>
            {this.message || (
              <span>
                <slot name="message" />
              </span>
            )}
          </p-text>
        )}
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!this.host.querySelector('[slot="label"]');
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private setInput(): void {
    this.input = this.host.querySelector('input[type="checkbox"]');
  }

  /*
   * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
   */
  private setAriaAttributes(): void {
    if (this.label && this.message) {
      this.input.setAttribute('aria-label', `${this.label}. ${this.message}`);
    } else if (this.label) {
      this.input.setAttribute('aria-label', this.label);
    }

    if (this.state === 'error') {
      this.input.setAttribute('aria-invalid', 'true');
    } else {
      this.input.removeAttribute('aria-invalid');
    }
  }

  private labelClick = (event: MouseEvent): void => {
    /**
     * we only want to simulate the checkbox click by label click
     * for real shadow dom, else the native behaviour works out
     * of the box.
     * also we don't want to click to the input, if a link is
     * clicked.
     */
    if (this.host.shadowRoot?.host && (event.target as HTMLElement).closest('a') === null) {
      this.input.focus();
      this.input.click();
    }
  };

  private setState = (): void => {
    this.checked = this.input.checked;
    this.disabled = this.input.disabled;
    this.indeterminate = this.input.indeterminate;
  };

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', this.setState);
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
