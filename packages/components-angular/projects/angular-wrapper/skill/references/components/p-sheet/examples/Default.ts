import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" [aria]="{'aria-haspopup': 'dialog'}" (click)="onClick()">
        Open Sheet
      </p-button>

      <p-sheet [open]="open" [aria]="{'aria-label': 'Some Heading'}" (dismiss)="onDismiss()">
        <p-heading slot="header" size="large" tag="h2">
          Some Heading
        </p-heading>
        <p-text>
          Some Content
        </p-text>
      </p-sheet>
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
