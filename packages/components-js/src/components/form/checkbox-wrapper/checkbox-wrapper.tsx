import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles,
  randomString
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
  private labelId = randomString();

  public componentWillLoad(): void {
    this.setInput();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('checkbox-wrapper__label'));
    const fakeCheckboxClasses = cx(
      prefix('checkbox-wrapper__fake-checkbox'),
      (this.checked || this.indeterminate) && prefix('checkbox-wrapper__fake-checkbox--checked'),
      this.disabled && prefix('checkbox-wrapper__fake-checkbox--disabled'),
      this.state !== 'none' && prefix(`checkbox-wrapper__fake-checkbox--${this.state}`)
    );
    const iconClasses = cx(
      prefix('checkbox-wrapper__icon'),
      (this.checked || this.indeterminate) && prefix('checkbox-wrapper__icon--checked')
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
        <label class={labelClasses} id={this.state === 'error' && this.labelId}>
          {this.isLabelVisible &&
          <p-text class={labelTextClasses} tag='span' color='inherit' onClick={(e: MouseEvent) => this.labelClick(e)}>
            {this.label ? this.label : <span><slot name='label'/></span>}
          </p-text>
          }
          <span class={fakeCheckboxClasses}>
            <p-icon class={iconClasses} name={this.indeterminate ? 'minus' : 'check'} theme='dark' size='inherit' />
            <slot/>
          </span>
        </label>
        {this.isMessageVisible &&
        <p-text
          class={messageClasses}
          color='inherit'
          role={this.state === 'error' && 'alert'}
          aria-describedby={this.state === 'error' && this.labelId}
        >
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
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
    return ['success','error'].includes(this.state) && this.isMessageDefined;
  }

  private setInput(): void {
    this.input = this.host.querySelector('input[type="checkbox"]');
    this.input.setAttribute('aria-label', this.label);
  }

  private labelClick(event: MouseEvent): void {
    /**
     * we only want to simulate the checkbox click by label click
     * for real shadow dom, else the native behaviour works out
     * of the box.
     * also we don't want to click to the input, if a link is
     * clicked.
     */
    if (
      this.host.shadowRoot && this.host.shadowRoot.host
      && (event.target as HTMLElement).closest('a') === null
    ) {
      this.input.click();
    }
  }

  private setState(): void {
    this.checked = this.input.checked;
    this.disabled = this.input.disabled;
    this.indeterminate = this.input.indeterminate;
  }

  private bindStateListener(): void {
    transitionListener(this.input, 'border-top-color', () => {
      this.setState();
    });
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
