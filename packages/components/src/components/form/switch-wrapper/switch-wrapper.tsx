import { JSX, Host, Component, Prop, h, Element, forceUpdate } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getTagName,
  insertSlottedStyles,
  setAriaAttributes,
  transitionListener,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';

@Component({
  tag: 'p-switch-wrapper',
  styleUrl: 'switch-wrapper.scss',
  shadow: true,
})
export class SwitchWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  private input: HTMLInputElement;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public componentWillLoad(): void {
    this.setInput();
    this.bindStateListener();
  }

  public componentDidLoad(): void {
    this.setAriaAttributes();
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public render(): JSX.Element {
    // const { checked, indeterminate, disabled } = this.input;
    // const labelClasses = prefix('switch-wrapper__label');
    // const fakeSwitchClasses = {
    //   [prefix('switch-wrapper__fake-switch')]: true,
    //   [prefix('switch-wrapper__fake-switch--checked')]: checked || indeterminate,
    //   [prefix('switch-wrapper__fake-switch--disabled')]: disabled,
    //   [prefix(`switch-wrapper__fake-switch--${this.state}`)]: this.state !== 'none',
    // };
    // const iconClasses = {
    //   [prefix('switch-wrapper__icon')]: true,
    //   [prefix('switch-wrapper__icon--checked')]: checked || indeterminate,
    // };
    // const labelTextClasses = {
    //   [prefix('switch-wrapper__label-text')]: true,
    //   [prefix('switch-wrapper__label-text--disabled')]: disabled,
    //   ...mapBreakpointPropToPrefixedClasses('switch-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
    // };
    // const messageClasses = {
    //   [prefix('switch-wrapper__message')]: true,
    //   [prefix(`switch-wrapper__message--${this.state}`)]: this.state !== 'none',
    // };
    //
    // const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <slot />
      </Host>
    );
  }

  // private get isLabelVisible(): boolean {
  //   return !!this.label || hasNamedSlot(this.host, 'label');
  // }
  //
  // private get isMessageVisible(): boolean {
  //   return !!(this.message || hasNamedSlot(this.host, 'message')) && ['success', 'error'].includes(this.state);
  // }

  private setInput(): void {
    this.input = getHTMLElementAndThrowIfUndefined(this.host, 'input[type="checkbox"]');
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

  // private labelClick = (event: MouseEvent): void => {
  //   /**
  //    * we only want to simulate the switch click by label click
  //    * for real shadow dom, else the native behaviour works out of the box.
  //    * also we don't want to click to the input, if a link is clicked.
  //    */
  //   if (this.host.shadowRoot?.host && (event.target as HTMLElement).closest('a') === null) {
  //     this.input.focus();
  //     this.input.click();
  //   }
  // };

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', () => forceUpdate(this.host));
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
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
