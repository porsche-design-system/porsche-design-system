import { Component } from '@angular/core';

@Component({
  selector: 'page-styles-grid-example',
  template: `<grid-layout [visualizeGrid]="visualizer" />`,
  standalone: false,
})
export class StylesGridExampleComponent {
  visualizer = true;
}
