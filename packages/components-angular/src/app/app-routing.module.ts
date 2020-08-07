import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as pages from './pages';

const appRoutes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'button',
    component: pages.ButtonComponent
  },
  {
    path: 'button-pure',
    component: pages.ButtonPureComponent
  },
  {
    path: 'checkbox-wrapper',
    component: pages.CheckboxWrapperComponent
  },
  {
    path: 'content-wrapper',
    component: pages.ContentWrapperComponent
  },
  {
    path: 'divider',
    component: pages.DividerComponent
  },
  {
    path: 'fieldset-wrapper',
    component: pages.FieldsetWrapperComponent
  },
  {
    path: 'flex',
    component: pages.FlexComponent
  },
  {
    path: 'grid',
    component: pages.GridComponent
  },
  {
    path: 'headline',
    component: pages.HeadlineComponent
  },
  {
    path: 'icon',
    component: pages.IconComponent
  },
  {
    path: 'link',
    component: pages.LinkComponent
  },
  {
    path: 'link-pure',
    component: pages.LinkPureComponent
  },
  {
    path: 'link-social',
    component: pages.LinkSocialComponent
  },
  {
    path: 'marque',
    component: pages.MarqueComponent
  },
  {
    path: 'overview',
    component: pages.OverviewComponent
  },
  {
    path: 'pagination',
    component: pages.PaginationComponent
  },
  {
    path: 'radio-button-wrapper',
    component: pages.RadioButtonWrapperComponent
  },
  {
    path: 'select-wrapper',
    component: pages.SelectWrapperComponent
  },
  {
    path: 'spinner',
    component: pages.SpinnerComponent
  },
  {
    path: 'text',
    component: pages.TextComponent
  },
  {
    path: 'text-field-wrapper',
    component: pages.TextFieldWrapperComponent
  },
  {
    path: 'text-list',
    component: pages.TextListComponent
  },
  {
    path: 'textarea-wrapper',
    component: pages.TextareaWrapperComponent
  },
  {
    path: 'textarea-wrapper',
    component: pages.TextareaWrapperComponent
  },
  {
    path: 'typography',
    component: pages.TypographyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
