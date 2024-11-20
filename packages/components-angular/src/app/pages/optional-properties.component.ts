import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-optional-properties',
  templateUrl: 'optional-properties.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OptionalPropertiesComponent {}
