import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <p-inline-notification
      [heading]="'Some heading'"
      [headingTag]="'h3'"
      [description]="'Some description.'"
      [actionLabel]="'Retry'"
      [actionIcon]="'reset'"
      [actionLoading]="isLoading"
      (action)="onAction()"
    ></p-inline-notification>
    <p-button [type]="'button'" [compact]="true" (click)="onAction()">Reset \`actionLoading\`</p-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExampleComponent {
  isLoading = false;

  onAction() {
    this.isLoading = !this.isLoading;
  }
}
