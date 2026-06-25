import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" (click)="onClick()">
        Open Banner
      </p-button>

      <p-banner [open]="open" heading="Some Heading" headingTag="h3" description="Some Description" (dismiss)="onDismiss()"></p-banner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {
  open = false;

  onClick() {
    this.open = true;
  }
  onDismiss() {
    this.open = false;
  }
}
