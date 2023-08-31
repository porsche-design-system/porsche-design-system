import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-styles-grid-example',
  template: `<grid-layout [visualizer]="visualizer" />`,
})
export class StylesGridExampleComponent {
  visualizer = true;
}
