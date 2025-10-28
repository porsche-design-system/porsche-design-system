import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-inline-notification-example-action-button',
  template: `
    <p-inline-notification
      [heading]="'Some heading'"
      [headingTag]="'h4'"
      [description]="'Some description.'"
      [actionLabel]="'Retry'"
      [actionIcon]="'reset'"
      [actionLoading]="isLoading"
      (action)="onAction()"
    ></p-inline-notification>
    <button type="button" (click)="onAction()">Reset \`actionLoading\`</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InlineNotificationExampleActionButtonComponent {
  isLoading = false;

  onAction() {
    this.isLoading = !this.isLoading;
  }
}
