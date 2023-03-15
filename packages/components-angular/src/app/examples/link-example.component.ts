import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

// only angular router support needed
// extend existing wrappers or offer new one or custom directive?
// https://github.com/ionic-team/ionic-framework/blob/main/angular/src/directives/navigation/router-link-delegate.ts
// respect locationStrategy, prevent default
// routerLinkActive, https://angular.io/api/router/Router#isactive

@Component({
  selector: 'page-link-example',
  template: `
    <p-link href="/">Link 1 default</p-link>
    <p-link href="/" (click)="onClick($event)">Link 2 click listener</p-link>
    <p-link [routerLink]="'/'">Link 3 routerLink</p-link>
    <p-link href="/" [routerLink]="'/'">Link 3 routerLink with href</p-link>
    <p-link href="/" [routerLink]="'/'" (click)="$event.preventDefault()"
      >Link 3 routerLink with href and prevent</p-link
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkExampleComponent {
  constructor(private router: Router) {}

  onClick = (e: MouseEvent) => {
    e.preventDefault();
    this.router.navigateByUrl((e.target as any).href);
  };
}
