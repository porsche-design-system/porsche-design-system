import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <p-button [type]="'button'" [compact]="true" (click)="onShow()">Show Inline Notification</p-button>
    @if (isActive) {
      <p-inline-notification
        [heading]="'Some heading'"
        [headingTag]="'h3'"
        [description]="'Some description.'"
        (dismiss)="onDismiss()"
      ></p-inline-notification>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExampleComponent {
  isActive = false;

  onShow() {
    this.isActive = true;
  }
  onDismiss() {
    this.isActive = false;
  }
}
