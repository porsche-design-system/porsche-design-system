import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-radio-group-option-timing-bug-page-b',
  template: `
    <radio-group-option-timing-bug-navigation />
    <p-heading>Page B</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RadioGroupOptionTimingBugPageBComponent {}
