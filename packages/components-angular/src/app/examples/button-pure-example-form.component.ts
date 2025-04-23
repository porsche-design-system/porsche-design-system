import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-button-pure-example-form',
  template: `
    <form (submit)="handleSubmit($event)">
      <p-button-pure name="option" value="A" type="submit">Button A</p-button-pure>
      <p-button-pure name="option" value="B" type="submit">Button B</p-button-pure>
    </form>

    <p-text>Last submitted data: {{ lastSubmittedData }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class ButtonPureExampleFormComponent {
  lastSubmittedData: string = 'none';

  handleSubmit(e: Event): void {
    e.preventDefault();
    const submitter = (e as SubmitEvent).submitter as HTMLButtonElement;
    this.lastSubmittedData = submitter.name + '=' + submitter.value || 'none';
  }
}
