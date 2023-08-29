import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { PinCodeUpdateEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-pin-code-example',
  template: `
    <p-pin-code [label]="'Some Label'" [length]="length" (update)="onUpdate($event)"></p-pin-code>
    <p-text>Current value: {{ currentValue }}</p-text>
    <p-text>Completely filled: {{ isComplete }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinCodeExampleControlledComponent {
  length = 4;
  currentValue = '';
  isComplete = false;

  onUpdate(e: CustomEvent<PinCodeUpdateEvent>) {
    this.currentValue = e.detail.value as string;
    this.isComplete = (e.detail.value as string).length === this.length;
  }
}
