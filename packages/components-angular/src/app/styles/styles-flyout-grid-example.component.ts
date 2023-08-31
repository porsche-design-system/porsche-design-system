import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-styles-flyout-grid-example',
  template: `
    <p-flyout [open]="true">
      <grid-layout [visualizer]="visualizer" />
    </p-flyout>
  `,
})
export class StylesFlyoutGridExampleComponent {
  visualizer = false;
}
