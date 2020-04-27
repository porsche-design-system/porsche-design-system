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
  tag: 'p-select-wrapper',
  styleUrl: 'select-wrapper.scss',
  shadow: true
})
export class SelectWrapper {

  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Custom styled select data-list. */
  @Prop() public variant?: 'native' | 'custom' = 'native';

  @State() private disabled: boolean;
  @State() private fakeOptionListHidden = true;

  private select: HTMLSelectElement;
  private options: NodeListOf<HTMLOptionElement>;
  private labelId = randomString();

  public componentWillLoad(): void {
    this.setSelect();
    this.variant === 'custom' && this.disableSelectDropDown();
    this.setOptions();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();
  }

  public render(): JSX.Element {

    const labelClasses = cx(prefix('select-wrapper__label'));
    const labelTextClasses = cx(
      prefix('select-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('select-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('select-wrapper__label-text--disabled')
    );
    const fakeSelectClasses = cx(
      prefix('select-wrapper__fake-select'),
      this.disabled && prefix('select-wrapper__fake-select--disabled'),
      this.state !== 'none' && prefix(`select-wrapper__fake-select--${this.state}`)
    );
    const fakeOptionListClasses = cx(
      prefix('select-wrapper__fake-option-list'),
      this.fakeOptionListHidden && prefix('select-wrapper__fake-option-list--hidden')
    );
    const iconClasses = cx(
      prefix('select-wrapper__icon'),
      this.disabled && prefix('select-wrapper__icon--disabled')
    );
    const messageClasses = cx(
      prefix('select-wrapper__message'),
      this.state !== 'none' && prefix(`select-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <label class={labelClasses} id={this.state === 'error' && this.labelId}>
          {this.isLabelVisible &&
          <p-text class={labelTextClasses} tag='span' color='inherit' onClick={() => this.labelClick()}>
            {this.label ? this.label : <span><slot name='label'/></span>}
          </p-text>
          }
          <span class={fakeSelectClasses}>
            <p-icon class={iconClasses} name='arrow-head-down' color='inherit'/>
            <slot/>
            {this.variant === 'custom' &&
            <span class={fakeOptionListClasses} role="listbox" aria-activedescendant="option1" tabIndex={-1}>
              {
                Array.from(this.options).map((option: HTMLOptionElement, key: any) =>
                  <span id={key} role='option'>{option.text}</span>
                )
              }
            </span>
            }
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
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private setSelect(): void {
    this.select = this.host.querySelector('select');
    this.select.setAttribute('aria-label', this.label);
  }

  private disableSelectDropDown(): void {
    this.select.onmousedown = ((e) => {
      e.preventDefault();
      this.toggleCustomDataList();
    });
    this.select.onkeydown = ((e:KeyboardEvent) => {
      if(e.code  === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Space') {
        e.preventDefault();
      }
    });
  }

  private toggleCustomDataList(): void {
    this.fakeOptionListHidden = this.fakeOptionListHidden === false;
  }

  private setOptions(): void  {
    this.options = this.select.querySelectorAll('option');
  }

  private setState(): void {
    this.disabled = this.select.disabled;
  }

  private labelClick(): void {
    this.select.focus();
  }

  private bindStateListener(): void {
    transitionListener(this.select, 'border-top-color', () => {
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
