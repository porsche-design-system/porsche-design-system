import { Component, Element, forceUpdate, h, Host, JSX, Prop } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getTagName,
  insertSlottedStyles,
  isDescriptionVisible,
  isLabelVisible,
  isMessageVisible,
  mapBreakpointPropToPrefixedClasses,
  setAriaAttributes,
  observeMutations,
  unobserveMutations,
} from '../../../utils';
import type { BreakpointCustomizable, FormState } from '../../../types';
import { getDescripton, getLabel, getMessage } from '../../../utils/form-component-utils';

@Component({
  tag: 'p-textarea-wrapper',
  styleUrl: 'textarea-wrapper.scss',
  shadow: true,
})
export class TextareaWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  private textarea: HTMLTextAreaElement;

  public connectedCallback(): void {
    this.addSlottedStyles();
    this.observeMutations();
  }

  public componentWillLoad(): void {
    this.textarea = getHTMLElementAndThrowIfUndefined(this.host, 'textarea');
    this.observeMutations();
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    setAriaAttributes(this.textarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public disconnectedCallback(): void {
    unobserveMutations(this.textarea);
  }

  public render(): JSX.Element {
    const { disabled } = this.textarea;
    const labelClasses = {
      ['label']: true,
      ['label--disabled']: disabled,
      [`label--${this.state}`]: this.state !== 'none',
      ...mapBreakpointPropToPrefixedClasses('label-', this.hideLabel, ['hidden', 'visible'], true),
    };

    return (
      <Host>
        <label class={labelClasses}>
          {isLabelVisible(this.host, this.label) &&
            getLabel(this.host, this.textarea, this.label, 'label__text', this.labelClick)}
          {isDescriptionVisible(this.host, this.description) &&
            getDescripton(this.host, this.description, 'label__text label__text--description')}
          <slot />
        </label>
        {isMessageVisible(this.host, this.message, this.state) && getMessage(this.host, this.message, this.state)}
      </Host>
    );
  }

  private labelClick = (): void => {
    this.textarea.focus();
  };

  private observeMutations = (): void => {
    observeMutations(this.textarea, ['disabled', 'readonly'], () => forceUpdate(this.host));
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
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
