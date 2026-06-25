import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" [aria]="{'aria-haspopup': 'dialog'}" (click)="onClick()">
        Open Flyout
      </p-button>

      <p-flyout [open]="open" [aria]="{'aria-label': 'Some Heading'}" (dismiss)="onDismiss()">
        <p-heading slot="header" size="large" tag="h2">
          Some Heading
        </p-heading>
        <p-text>
          Some Content
        </p-text>
        <div slot="footer">
          <p-button type="button">
            Proceed
          </p-button>
          <p-button type="button" variant="secondary">
            Cancel
          </p-button>
        </div>
        <p-text slot="sub-footer">
          Some additional Sub-Footer
        </p-text>
      </p-flyout>
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
