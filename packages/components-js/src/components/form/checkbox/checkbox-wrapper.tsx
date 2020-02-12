import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { insertSlottedStyles } from '../../../utils/slotted-styles';

@Component({
  tag: 'p-checkbox-wrapper',
  styleUrl: 'checkbox-wrapper.scss',
  shadow: true
})
export class CheckboxWrapper {

  @Element() public element!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop({reflect: true}) public state?: 'error' | 'none' = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Mask the visual appearance of a checkbox which has a state in-between checked and unchecked. */
  @Prop() public indeterminate?: boolean = false;

  @State() private input: HTMLInputElement;
  @State() private checked: boolean;
  @State() private disabled: boolean;

  public componentDidLoad() {

    this.setInput();
    this.setState();
    this.bindStateListener();

    const tagName = this.element.tagName.toLowerCase();
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

    insertSlottedStyles(this.element, style);
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('checkbox-wrapper__label'));
    const iconWrapperClasses = cx(
      prefix('checkbox-wrapper__icon-wrapper'),
      this.checked && prefix(`checkbox-wrapper__icon-wrapper--checked`),
      this.disabled && prefix(`checkbox-wrapper__icon-wrapper--disabled`),
      this.state !== 'none' && prefix(`checkbox-wrapper__icon-wrapper--${this.state}`)
    );
    const iconClasses = cx(
      prefix('checkbox-wrapper__icon'),
      this.checked && prefix(`checkbox-wrapper__icon--checked`)
    );
    const labelTextClasses = cx(
      prefix('checkbox-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('checkbox-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('checkbox-wrapper__label-text--disabled')
    );
    const messageClasses = cx(
      prefix('checkbox-wrapper__message'),
      this.state !== 'none' && prefix(`checkbox-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <label class={labelClasses}>
          <span class={iconWrapperClasses}>
            <p-icon class={iconClasses} name={this.indeterminate ? 'subtract' : 'check'} theme='dark' size='inherit' />
            <slot/>
          </span>
          <p-text class={labelTextClasses} tag='span' color='inherit' onClick={() => this.clickOnInput()}>
            {this.label ? this.label : <span><slot name='label'/></span>}
          </p-text>
        </label>
        {this.isMessageVisible &&
        <p-text class={messageClasses} color='inherit'>
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private get isMessageVisible(): boolean {
    return ['error'].includes(this.state);
  }

  private setInput(): void {
    this.input = this.element.querySelector('input[type="checkbox"]');
  }

  private clickOnInput(): void {
    this.input.click();
  }

  private setState(): void {
    this.checked = this.input.checked;
    this.disabled = this.input.disabled;
  }

  private bindStateListener(): void {
    this.input.addEventListener('change', () => {
      this.setState();
    });
  }
}
