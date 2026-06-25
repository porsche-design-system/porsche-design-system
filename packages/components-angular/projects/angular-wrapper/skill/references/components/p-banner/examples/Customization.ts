import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
      <p-button type="button" (click)="onClick()">
        Open Banner
      </p-button>

      <p-banner [open]="open" class="[--p-banner-top:8px] [--p-banner-bottom:8px] [--p-banner-inset-x:8px] [--p-banner-max-w:70ch]" (dismiss)="onDismiss()">
        <p-heading slot="heading" size="sm" weight="semibold">
          Some heading
        </p-heading>
        <p-text slot="description">
          Some description. You can also add inline 
          <p-link-pure href="https://porsche.com" icon="none" [underline]="true">
            links
          </p-link-pure>
           to route to another page.
        </p-text>
      </p-banner>
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
