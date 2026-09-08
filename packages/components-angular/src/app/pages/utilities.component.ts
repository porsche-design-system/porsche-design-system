import { ChangeDetectionStrategy, Component } from '@angular/core';
import { textSmallStyle, themeLight } from '@porsche-design-system/components-angular/emotion';
import { kebabCase } from 'change-case';

@Component({
  selector: 'page-utilities',
  styles: [``],
  template: `<div [style]="getStyle()">{{ themeLight.primary }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
      background: themeLight.primary,
      ...textSmallStyle,
    })
      .map(([key, value]) => [kebabCase(key), value].join(':'))
      .join(';');
  };
}
