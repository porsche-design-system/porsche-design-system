import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation-page-1',
  template: `<p-heading>Page 1</p-heading>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationPage1Component {}
