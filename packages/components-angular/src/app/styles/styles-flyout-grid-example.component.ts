import { Component } from '@angular/core';

@Component({
  selector: 'page-styles-flyout-grid-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      div.wrapper {
        opacity: 0;
        overflow-x: hidden;
        max-width: 1180px;
        box-sizing: border-box;
        padding-top: 100px;
        padding-right: $pds-spacing-fluid-large;
        padding-bottom: 150px;
        padding-left: $pds-spacing-fluid-large;
        --pds-internal-grid-outer-column: calc(#{$pds-spacing-fluid-large} - #{$pds-grid-gap});
        --pds-internal-grid-margin: calc(#{$pds-spacing-fluid-large} * -1);
      }
    `,
  ],
  template: `
    <div class="wrapper">
      <grid-layout [visualizer]="visualizer" />
    </div>
    <p-flyout [open]="true">
      <div slot="header">
        <p-heading tag="h5" size="large"> Sticky Heading </p-heading>
        <p-text size="small">Sticky header text</p-text>
      </div>
      <grid-layout [visualizer]="visualizer" />
      <div slot="footer">
        <p-button type="button">Footer Button</p-button>
      </div>
      <div slot="sub-footer">Some Sub Footer Content</div>
    </p-flyout>
  `,
})
export class StylesFlyoutGridExampleComponent {
  visualizer = false;
}
