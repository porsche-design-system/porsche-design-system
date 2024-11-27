import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-flyout-example-form',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Flyout</p-button>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'Some Heading' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <form id="some-form" (submit)="onSubmit($event)">
        <p-checkbox name="some-checkbox" label="Some Label"></p-checkbox>
        <p-textarea name="some-textarea" label="Some Label"></p-textarea>
      </form>
      <p-button-group slot="footer">
        <p-button type="submit" form="some-form">Submit</p-button>
        <p-button type="reset" [variant]="'secondary'" form="some-form">Reset</p-button>
      </p-button-group>

      <p-text slot="sub-footer" innerHTML="Last submitted data:<br/><br/> {{ lastSubmittedData }}"></p-text>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FlyoutExampleFormComponent {
  isFlyoutOpen = false;
  lastSubmittedData: string = 'checkbox: none<br/>textarea: none';

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss() {
    this.isFlyoutOpen = false;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.lastSubmittedData = `checkbox: ${formData.get('some-checkbox') || 'none'} <br/>textarea: ${formData.get('some-textarea') || 'none'}`;
  }
}
