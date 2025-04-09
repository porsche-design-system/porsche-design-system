import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-input-password-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-input-password name="some-name" label="Some Label"></p-input-password>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InputPasswordExampleComponent {
  lastSubmittedData: string = '';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('some-name') as string;
  }
}
