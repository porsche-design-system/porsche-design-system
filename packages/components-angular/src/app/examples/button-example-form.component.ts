import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-button-example-form',
  template: `
    <form (submit)="handleSubmit($event)">
      <p-button name="option" value="A" type="submit">Button A</p-button>
      <p-button name="option" value="B" type="submit">Button B</p-button>
    </form>

    <p>Last submitted data: {{ lastSubmittedData }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonExampleFormComponent {
  lastSubmittedData: string = 'none';

  handleSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const submitter = (e as SubmitEvent).submitter as HTMLButtonElement;
    submitter && formData.append(submitter.name, submitter.value);
    this.lastSubmittedData = Array.from(formData.entries())[0].join('=') || 'none';
  }
}
