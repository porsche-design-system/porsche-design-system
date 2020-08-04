import { Component } from '@angular/core';
import { PORSCHE_DESIGN_SYSTEM_READY_EVENT } from '@porsche-design-system/components-js';

@Component({
  selector: 'app-root',
  template: `
    <style>
      a {
        text-decoration: none;
        outline: none;
      }
    </style>
    <div id="app">
      <p-text>
        <b id="human-readable-browser-name"></b>
        <br>
        <span id="system-log"></span>
      </p-text>
      <p-divider></p-divider>
      <a [routerLink]="['basic']">
        <p-link-pure>Basic</p-link-pure>
      </a>
      <a [routerLink]="['action']">
        <p-link-pure>Action</p-link-pure>
      </a>
      <a [routerLink]="['content']">
        <p-link-pure>Content</p-link-pure>
      </a>
      <a [routerLink]="['form']">
        <p-link-pure>Form</p-link-pure>
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
      <p-divider></p-divider>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  ngOnInit(){
    document.addEventListener(PORSCHE_DESIGN_SYSTEM_READY_EVENT, () => {
      document.body.removeChild(document.getElementById('loader'));
      document.head.removeChild(document.getElementById('loader-style'));
    },{once: true});
  }
}
