import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-option-value-timing-bug-page-b',
  template: `
    <option-value-timing-bug-navigation />
    <p-heading>Page B</p-heading>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OptionValueTimingBugPageBComponent {}
