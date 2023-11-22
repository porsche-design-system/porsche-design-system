import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tabs-bar-navigation-page-2',
  template: `<p-heading>Page 2</p-heading>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBarNavigationPage2Component {}
