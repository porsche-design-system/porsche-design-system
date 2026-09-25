import { ChangeDetectionStrategy, Component } from '@angular/core';

export enum EventType {
  REGULAR = 'REGULAR',
  SPECIAL = 'SPECIAL',
}

@Component({
  selector: 'page-option-value-timing-bug-page-a',
  template: `
    <option-value-timing-bug-navigation />
    <p-heading>Page A</p-heading>
    <p-text>
      Open the flyout, close it, navigate to Page B and back, then open the flyout again. The option values are bound as
      properties via <code>[value]</code>, so every option must still be rendered and the preselected one selected. The
      same applies to the drilldown items, whose identifiers are bound via <code>[identifier]</code>. Requires the app
      to be loaded with <code>?eventCoalescing</code>.
    </p-text>
    <p-button id="open-flyout" (click)="isFlyoutOpen = true">Open Flyout</p-button>
    <p-button id="open-drilldown" (click)="isDrilldownOpen = true">Open Drilldown</p-button>
    <p-flyout [open]="isFlyoutOpen" (dismiss)="isFlyoutOpen = false">
      <p-heading slot="header" size="large" tag="h2">Create event</p-heading>
      <div class="flex flex-col gap-fluid-md">
        <p-radio-group name="radio-group" label="Radio Group" [value]="eventType">
          <p-radio-group-option [value]="EventType.REGULAR" label="Normal event"></p-radio-group-option>
          <p-radio-group-option [value]="EventType.SPECIAL" label="Special event"></p-radio-group-option>
        </p-radio-group>
        <p-segmented-control name="segmented-control" label="Segmented Control" [value]="eventType">
          <p-segmented-control-item [value]="EventType.REGULAR" label="Normal event"></p-segmented-control-item>
          <p-segmented-control-item [value]="EventType.SPECIAL" label="Special event"></p-segmented-control-item>
        </p-segmented-control>
        <p-select name="select" label="Select" [value]="eventType">
          <p-select-option [value]="EventType.REGULAR">Normal event</p-select-option>
          <p-select-option [value]="EventType.SPECIAL">Special event</p-select-option>
        </p-select>
        <p-multi-select name="multi-select" label="Multi Select" [value]="eventTypes">
          <p-multi-select-option [value]="EventType.REGULAR">Normal event</p-multi-select-option>
          <p-multi-select-option [value]="EventType.SPECIAL">Special event</p-multi-select-option>
        </p-multi-select>
      </div>
    </p-flyout>
    <p-drilldown [open]="isDrilldownOpen" [activeIdentifier]="activeIdentifier" (dismiss)="isDrilldownOpen = false">
      <p-drilldown-item [identifier]="EventType.REGULAR" label="Normal event">
        <p-drilldown-link href="#">Normal event link</p-drilldown-link>
      </p-drilldown-item>
      <p-drilldown-item [identifier]="EventType.SPECIAL" label="Special event">
        <p-drilldown-link href="#">Special event link</p-drilldown-link>
      </p-drilldown-item>
    </p-drilldown>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class OptionValueTimingBugPageAComponent {
  protected readonly EventType = EventType;
  isFlyoutOpen = false;
  isDrilldownOpen = false;
  eventType: EventType = EventType.REGULAR;
  eventTypes: EventType[] = [EventType.REGULAR];
  activeIdentifier: EventType = EventType.SPECIAL;
}
