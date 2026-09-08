import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

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
      <p-button slot="footer" type="submit" form="some-form">Submit</p-button>
      <p-button slot="footer" type="reset" [variant]="'secondary'" form="some-form">Reset</p-button>
      <p-text slot="sub-footer">
        Last submitted data:
        <br/><br/>
        checkbox: {{checkboxValue}}
        <br/>
        textarea: {{textareaValue}}
      </p-text>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class FlyoutExampleFormComponent {
  isFlyoutOpen = false;
  checkboxValue: string = 'none';
  textareaValue: string = 'none';

  onOpen() {
    this.isFlyoutOpen = true;
  }
  onDismiss() {
    this.isFlyoutOpen = false;
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    this.checkboxValue = formData.get('some-checkbox')?.toString() || 'none';
    this.textareaValue = formData.get('some-textarea')?.toString() || 'none';
  }
}
