import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'navigation',
  template: `
    <p-tabs-bar [activeTabIndex]="activeTabIndex" (update)="update.emit($event.detail.activeTabIndex)">
      <a *ngIf="true === true" [routerLink]="getRoute('page-1')">Tab One</a>
      <a *ngIf="true === true" [routerLink]="getRoute('page-2')">Tab Two</a>
      <a *ngIf="true === true" [routerLink]="getRoute('page-3')">Tab Three</a>
    </p-tabs-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() activeTabIndex = 0;
  @Input() baseRoute: string = 'tabs-bar-navigation-bug';
  @Output() update = new EventEmitter<number>();

  getRoute(url: string): string {
    return `/${this.baseRoute}/${url}`;
  }
}
