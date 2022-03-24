import { ChangeDetectionStrategy, Component } from '@angular/core';
import { themeLight, textSmall } from '@porsche-design-system/components-angular/utilities/jss';
import { paramCase } from 'change-case';

@Component({
  selector: 'page-utilities',
  styles: [``],
  template: `<div [style]="getStyle()">{{ themeLight.brand }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilitiesComponent {
  themeLight = themeLight;

  getStyle = (): string => {
    return Object.entries({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100px',
      width: '100px',
      color: '#fff',
      background: themeLight.brand,
      ...textSmall,
    })
      .map(([key, value]) => [paramCase(key), value].join(':'))
      .join(';');
  };
}
