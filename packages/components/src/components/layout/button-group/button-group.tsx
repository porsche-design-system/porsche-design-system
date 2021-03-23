import { Component, h } from '@stencil/core';

@Component({
  tag: 'p-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  public render(): JSX.Element {
    const buttonGroupClasses = {};
    return (
      <div class={buttonGroupClasses}>
        <slot />
      </div>
    );
  }
}
