import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-checkbox name="some-name" label="Some Label" value="some-value"></p-checkbox>
      <p-button type="submit">Submit</p-button>
      <p-button type="reset">Reset</p-button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class CheckboxExampleComponent {
  lastSubmittedData: string = '';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('some-name') as string;
  }
}
