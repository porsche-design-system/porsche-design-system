import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <p-text>
        <b id="human-readable-browser-name"></b>
        <br>
        <span id="system-log"></span>
      </p-text>
      <hr>
      <a [routerLink]="['basic']">
       <p-link-pure>Basic</p-link-pure>
      </a>
        <a [routerLink]="['action']">
          <p-link-pure>Action</p-link-pure>
        </a>
        <a [routerLink]="['feedback']">
          <p-link-pure>Feedback</p-link-pure>
        </a>
        <a [routerLink]="['icon']">
          <p-link-pure>Icon</p-link-pure>
        </a>
        <a [routerLink]="['layout']">
          <p-link-pure>Layout</p-link-pure>
        </a>
        <a [routerLink]="['navigation']">
          <p-link-pure>Navigation</p-link-pure>
        </a>
      <hr>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
