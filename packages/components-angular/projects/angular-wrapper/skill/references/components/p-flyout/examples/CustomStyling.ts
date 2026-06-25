import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" [aria]="{'aria-haspopup': 'dialog'}" (click)="onClick()">
        Open Flyout
      </p-button>

      <p-flyout [open]="open" [aria]="{'aria-label': 'Some Heading'}" footerBehavior="fixed" class="[--p-flyout-width:90vw]" (dismiss)="onDismiss()">
        <div class="-mt-(--ref-p-flyout-pt) -mx-(--ref-p-flyout-px) h-[300px]">
          <img class="w-full h-full object-cover" src="assets/lights.jpg" alt="Some image description" />
        </div>
        <p-display class="mt-fluid-md" size="small" tag="h2">
          Some heading
        </p-display>
        <p-text class="mt-fluid-sm">
          Some paragraph.
        </p-text>
        <div slot="footer" class="grid grid-cols-[auto_1fr_auto] gap-static-sm justify-items-center">
          <p-button-pure icon="arrow-left" type="button" [hideLabel]="true">
            Prev
          </p-button-pure>
          <p-text>
            1/4
          </p-text>
          <p-button-pure icon="arrow-right" type="button" [hideLabel]="true">
            Next
          </p-button-pure>
        </div>
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
