import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import {
  getHTMLElement,
  getPrefixedTagNames,
  insertSlottedStyles,
  isRequired,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAriaAttributes,
  transitionListener,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';

@Component({
  tag: 'p-checkbox-wrapper',
  styleUrl: 'checkbox-wrapper.scss',
  shadow: true,
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

  public connectedCallback(): void {
    this.setInput();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    this.setAriaAttributes();
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
      [prefix(`checkbox-wrapper__fake-checkbox--${this.state}`)]: this.state !== 'none',
    };
    const iconClasses = {
      [prefix('checkbox-wrapper__icon')]: true,
      [prefix('checkbox-wrapper__icon--checked')]: this.checked || this.indeterminate,
    };
    const labelTextClasses = {
      [prefix('checkbox-wrapper__label-text')]: true,
      [prefix('checkbox-wrapper__label-text--disabled')]: this.disabled,
      ...mapBreakpointPropToPrefixedClasses('checkbox-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    };
    const messageClasses = {
      [prefix('checkbox-wrapper__message')]: true,
      [prefix(`checkbox-wrapper__message--${this.state}`)]: this.state !== 'none',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-icon', 'p-text']);

    return (
      <Host>
        <label class={labelClasses}>
          {this.isLabelVisible && (
            <PrefixedTagNames.pText class={labelTextClasses} tag="span" color="inherit" onClick={this.labelClick}>
              {this.label || <slot name="label" />}
              {isRequired(this.input) && <span class={prefix('checkbox-wrapper__required')} />}
            </PrefixedTagNames.pText>
          )}
          <span class={fakeCheckboxClasses}>
            <PrefixedTagNames.pIcon
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
          <PrefixedTagNames.pText class={messageClasses} color="inherit" role={this.state === 'error' ? 'alert' : null}>
            {this.message || <slot name="message" />}
          </PrefixedTagNames.pText>
        )}
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!getHTMLElement(this.host, '[slot="label"]');
  }

  private get isMessageVisible(): boolean {
    return (
      !!(this.message || getHTMLElement(this.host, '[slot="message"]')) && ['success', 'error'].includes(this.state)
    );
  }

  private setInput(): void {
    this.input = getHTMLElement(this.host, 'input[type="checkbox"]');
  }

  /*
   * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
   */
  private setAriaAttributes(): void {
    setAriaAttributes(this.input, {
      label: this.label,
      message: this.message,
      state: this.state,
    });
  }

  private labelClick = (event: MouseEvent): void => {
    /**
     * we only want to simulate the checkbox click by label click
     * for real shadow dom, else the native behaviour works out of the box.
     * also we don't want to click to the input, if a link is clicked.
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
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      -webkit-transition: color .24s ease !important;
      transition: color .24s ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
