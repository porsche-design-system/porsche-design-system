import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PinCodeUpdateEventDetail, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-pin-code-example-controlled',
  template: `
    <p-pin-code [label]="'Some Label'" [value]="value" (update)="onUpdate($event)"></p-pin-code>
    <p-text>Current value: {{ value }}</p-text>
    <p-text>Completely filled: {{ isComplete }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class PinCodeExampleControlledComponent {
  value = '';
  isComplete = false;

  onUpdate(e: CustomEvent<PinCodeUpdateEventDetail>) {
    this.value = e.detail.value;
    this.isComplete = e.detail.isComplete;
  }
}
