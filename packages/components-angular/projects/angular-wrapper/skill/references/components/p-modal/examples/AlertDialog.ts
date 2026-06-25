import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" [aria]="{'aria-haspopup': 'dialog'}" (click)="onClick()">
        Open Modal
      </p-button>

      <p-modal [open]="open" [aria]="{'role': 'alertdialog'}" [disableBackdropClick]="true" (dismiss)="onDismiss()">
        <p-heading slot="header" size="large" tag="h2">
          Some important Heading
        </p-heading>
        <p-text>
          Some important Content
        </p-text>
        <div slot="footer" role="group" class="flex flex-wrap gap-fluid-sm max-xs:flex-col">
          <p-button type="button">
            Accept
          </p-button>
          <p-button type="button" variant="secondary">
            Deny
          </p-button>
        </div>
      </p-modal>
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
