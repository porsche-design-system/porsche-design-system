import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { PinCodeUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-pin-code-example-controlled',
  template: `
    <p-pin-code [label]="'Some Label'" [length]="4" [value]="currentValue" (update)="onUpdate($event)"></p-pin-code>
    <p-text>Current value: [{{ currentValue }}]</p-text>
    <p-text>Completely filled: {{ isComplete }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinCodeExampleControlledComponent {
  currentValue = '';
  isComplete = false;

  onUpdate(e: CustomEvent<PinCodeUpdateEvent>) {
    this.currentValue = e.detail.value;
    this.isComplete = e.detail.isComplete;
  }
}
