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
        <div class="grid grid-cols-[2fr_1fr] gap-static-md items-start">
          <div class="sticky top-[calc(var(--p-flyout-sticky-top,0)+16px)] p-static-md bg-surface">
            Some sticky element within content relying on --p-flyout-sticky-top
          </div>
          <div>
            <p-text>
              Some Content Begin
            </p-text>
            <div class="w-[10px] h-[120vh] bg-[deeppink]"></div>
            <p-text>
              Some Content End
            </p-text>
          </div>
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
