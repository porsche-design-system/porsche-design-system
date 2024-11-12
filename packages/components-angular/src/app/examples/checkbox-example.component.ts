import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-checkbox-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-checkbox name="some-name" label="Some Label" value="some-value" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleComponent {
  lastSubmittedData: string = '';

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = formData.get('some-name') as string;
  }
}
