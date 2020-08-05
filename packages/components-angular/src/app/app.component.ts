import { Component } from '@angular/core';
import { Router } from '@angular/router';

type Route = {
  name: string;
  path: string;
};

@Component({
  selector: 'app-root',
  template: `
    <select (change)="changeRoute($event.target.value)">
      <option disabled selected>Select a page</option>
      <ng-container *ngFor="let route of routes">
        <option [value]="route.path">{{ route.name }}</option>
      </ng-container>
    </select>
    <div id="app">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  public routes: Route[] = [
    {path: 'button', name: 'Button'},
    {path: 'button-pure', name: 'Button Pure'},
    {path: 'checkbox-wrapper', name: 'Checkbox'},
    {path: 'content-wrapper', name: 'Content Wrapper'},
    {path: 'divider', name: 'Divider'},
    {path: 'fieldset-wrapper', name: 'Fieldset'},
    {path: 'flex', name: 'Flex'},
    {path: 'grid', name: 'Grid'},
    {path: 'headline', name: 'Headline'},
    {path: 'icon', name: 'Icon'},
    {path: 'link', name: 'Link'},
    {path: 'link-pure', name: 'Link Pure'},
    {path: 'link-social', name: 'Link Social'},
    {path: 'marque', name: 'Marque'},
    {path: 'overview', name: 'Overview'},
    {path: 'pagination', name: 'Pagination'},
    {path: 'radio-button-wrapper', name: 'Radio Button'},
    {path: 'select-wrapper', name: 'Select'},
    {path: 'spinner', name: 'Spinner'},
    {path: 'text', name: 'Text'},
    {path: 'text-field-wrapper', name: 'Text Field'},
    {path: 'text-list', name: 'Text List'},
    {path: 'textarea-wrapper', name: 'Textarea'},
    {path: 'typography', name: 'Typography'}
  ];

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
