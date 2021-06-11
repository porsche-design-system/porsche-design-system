import { Component, h } from '@stencil/core';
// import { throwIfParentIsNotOfKind } from '../../../../utils';
// import { PanelStateChangeEvent } from '../../panel/panel-utils';

@Component({
  tag: 'p-accordion-item',
  // styleUrl: 'accordion-item.scss',
  shadow: true,
})
export class AccordionItem {
  // @Element() public host!: HTMLElement;
  //
  // /** Defines the title used in panel. */
  // @Prop() public title: string;
  //
  // /** Defines if the panel is open */
  // @Prop() public open: boolean;
  //
  // /** Emitted when panel state is changed. */
  // @Event({ bubbles: false }) public stateChange: EventEmitter<PanelStateChangeEvent>;
  //
  // public connectedCallback(): void {
  //   throwIfParentIsNotOfKind(this.host, 'pAccordion');
  // }
  //
  public render(): JSX.Element {
    return (
      <div></div>
      //     <p-panel title={this.title} open={this.open} onStatusChange={this.stateChange}>
      //       <slot />
      //     </p-panel>
    );
  }
}
