import { Component } from '@angular/core';

type Route = {
  name: string;
  path: string;
};

@Component({
  selector: 'app-root',
  template: `
    <p-text>
      <b id="human-readable-browser-name"></b>
      <br />
      <span id="system-log"></span>
    </p-text>

    <p-divider></p-divider>

    <ng-container *ngFor="let route of routes">
      <a [routerLink]="route.path">
        <p-link-pure>{{ route.name }}</p-link-pure>
      </a>
    </ng-container>

    <p-divider></p-divider>

    <div id="app">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        outline: none;
      }
    `
  ]
})
export class AppComponent {
  public routes: Route[] = [
    { path: 'basic', name: 'Basic' },
    { path: 'action', name: 'Action' },
    { path: 'content', name: 'Content' },
    { path: 'form', name: 'Form' },
    { path: 'feedback', name: 'Feedback' },
    { path: 'icon', name: 'Icon' },
    { path: 'layout', name: 'Layout' },
    { path: 'navigation', name: 'Navigation' },
    { path: 'overview', name: 'Overview' }
  ];
}
