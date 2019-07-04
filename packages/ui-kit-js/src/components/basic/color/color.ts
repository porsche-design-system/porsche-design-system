import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'p-color'
})
export class Color {
  @Prop() public colors?:
    | 'porsche-black'
    | 'porsche-light'
    | 'porsche-dark'
    | 'porsche-red'
    | 'porsche-dark-red'
    | 'surface-light'
    | 'surface-dark'
    | 'neutral-grey-1'
    | 'neutral-grey-2'
    | 'neutral-grey-3'
    | 'neutral-grey-4'
    | 'neutral-grey-5'
    | 'neutral-grey-6'
    | 'neutral-grey-7'
    | 'neutral-grey-8'
    | 'status-red'
    | 'status-green'
    | 'status-yellow'
    | 'state-focus';

  @Prop() public text?:
    | 'porsche-black'
    | 'porsche-light'
    | 'porsche-red'
    | 'neutral-grey-1'
    | 'neutral-grey-2'
    | 'neutral-grey-3'
    | 'neutral-grey-4'
    | 'neutral-grey-5'
    | 'neutral-grey-6'
    | 'neutral-grey-7'
    | 'neutral-grey-8'
    | 'inherit';
}
