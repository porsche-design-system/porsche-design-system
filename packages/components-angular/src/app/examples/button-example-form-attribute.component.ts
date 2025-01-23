import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-button-example-form-attribute',
  template: `
    <form (submit)="handleSubmit($event)" id="some-form">
      <p-textarea name="some-name" label="Some Label"></p-textarea>
    </form>

    <p-button-group>
      <p-button type="submit" form="some-form">Submit</p-button>
      <p-button type="reset" form="some-form">Reset</p-button>
    </p-button-group>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ButtonExampleFormAttributeComponent {
  lastSubmittedData: string = 'none';

  handleSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = (formData.get('some-name') as string) || 'none';
  }
}
