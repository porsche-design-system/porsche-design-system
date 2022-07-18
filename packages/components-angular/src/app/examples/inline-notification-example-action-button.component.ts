import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'inline-notification-example-action-button',
  template: `
    <p-inline-notification
      [heading]="'Some heading'"
      [description]="'Some description.'"
      [actionLabel]="'Retry'"
      [actionIcon]="'reset'"
      [actionLoading]="isLoading"
      (action)="onAction()"
    ></p-inline-notification>
    <button type="button" (click)="onAction()">Reset \`actionLoading\`</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationExampleActionButton {
  isLoading = false;

  onAction() {
    this.isLoading = !this.isLoading;
  }
}
