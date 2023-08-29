import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-pin-code-example',
  template: `
    <form (submit)="onSubmit($event)">
      <p-pin-code [label]="'Some Label'" [name]="'pin-code'"></p-pin-code>
      <p-button type="submit">Submit</p-button>
    </form>
    <p-text>Last submitted data: {{ lastSubmittedValue }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinCodeExampleComponent {
  lastSubmittedValue = 'none';

  onSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedValue = Array.from(formData.values()).join(', ') || 'none';
  }
}
