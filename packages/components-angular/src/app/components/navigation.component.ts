import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'navigation',
  template: `
    <p-tabs-bar [activeTabIndex]="activeTabIndex">
      <a *ngIf="true === true" [routerLink]="'/tabs-bar-navigation/page-1'">Tab One</a>
      <a *ngIf="true === true" [routerLink]="'/tabs-bar-navigation/page-2'">Tab Two</a>
      <a *ngIf="true === true" [routerLink]="'/tabs-bar-navigation/page-3'">Tab Three</a>
    </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() activeTabIndex = 0;
}
