import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-input-password-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-input-password name="some-name" label="Some Label"></p-input-password>
      <p-button type="submit">Submit</p-button>
      <p-button type="reset">Reset</p-button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputPasswordExampleComponent {
  lastSubmittedData: string = '';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('some-name') as string;
  }
}
