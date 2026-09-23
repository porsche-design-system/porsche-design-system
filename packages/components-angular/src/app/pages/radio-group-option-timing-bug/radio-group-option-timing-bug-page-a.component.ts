import { ChangeDetectionStrategy, Component } from '@angular/core';

export enum EventType {
  REGULAR = 'REGULAR',
  SPECIAL = 'SPECIAL',
}

@Component({
  selector: 'page-radio-group-option-timing-bug-page-a',
  template: `
    <radio-group-option-timing-bug-navigation />
    <p-heading>Page A</p-heading>
    <p-text>
      Open the flyout, close it, navigate to Page B and back, then open the flyout again. The options are bound as
      properties via <code>[value]</code> and must still be rendered.
    </p-text>
    <p-button id="open-flyout" (click)="isFlyoutOpen = true">Open Flyout</p-button>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="isFlyoutOpen = false">
      <p-heading slot="header" size="large" tag="h2">Create event</p-heading>
      <p-radio-group name="event-type" label="Event type" [value]="eventType">
        <p-radio-group-option id="option-regular" [value]="EventType.REGULAR" label="Normal event"></p-radio-group-option>
        <p-radio-group-option id="option-special" [value]="EventType.SPECIAL" label="Special event"></p-radio-group-option>
      </p-radio-group>
    </p-flyout>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class RadioGroupOptionTimingBugPageAComponent {
  protected readonly EventType = EventType;
  isFlyoutOpen = false;
  eventType: EventType = EventType.REGULAR;
}
