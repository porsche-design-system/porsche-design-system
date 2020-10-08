import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

@Component({
  tag: 'p-modal-footer'
})
export class ModalFooter {
  @Element() public host!: HTMLElement;

  /** If true, the footer will be scrollable with the content. */
  @Prop() public scrollable?: boolean = false;

  public render(): JSX.Element {
    return (
      <Host slot="footer">
        <slot />
      </Host>
    );
  }
}
