import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as fromPages from './pages';

export type ExtendedRoute = Route & {
  name?: string;
};

export const routes: ExtendedRoute[] = [
  {
    path: '',
    children: [],
    pathMatch: 'full'
  },
  {
    path: 'button',
    component: fromPages.ButtonComponent,
    name: 'Button'
  },
  {
    path: 'button-pure',
    component: fromPages.ButtonPureComponent,
    name: 'Button Pure'
  },
  {
    path: 'checkbox-wrapper',
    component: fromPages.CheckboxWrapperComponent,
    name: 'Checkbox'
  },
  {
    path: 'content-wrapper',
    component: fromPages.ContentWrapperComponent,
    name: 'Content Wrapper'
  },
  {
    path: 'divider',
    component: fromPages.DividerComponent,
    name: 'Divider'
  },
  {
    path: 'fieldset-wrapper',
    component: fromPages.FieldsetWrapperComponent,
    name: 'Fieldset'
  },
  {
    path: 'flex',
    component: fromPages.FlexComponent,
    name: 'Flex'
  },
  {
    path: 'grid',
    component: fromPages.GridComponent,
    name: 'Grid'
  },
  {
    path: 'headline',
    component: fromPages.HeadlineComponent,
    name: 'Headline'
  },
  {
    path: 'icon',
    component: fromPages.IconComponent,
    name: 'Icon'
  },
  {
    path: 'link',
    component: fromPages.LinkComponent,
    name: 'Link'
  },
  {
    path: 'link-pure',
    component: fromPages.LinkPureComponent,
    name: 'Link Pure'
  },
  {
    path: 'link-social',
    component: fromPages.LinkSocialComponent,
    name: 'Link Social'
  },
  {
    path: 'marque',
    component: fromPages.MarqueComponent,
    name: 'Marque'
  },
  {
    path: 'modal',
    component: fromPages.ModalComponent,
    name: 'Modal'
  },
  {
    path: 'overview',
    component: fromPages.OverviewComponent,
    name: 'Overview'
  },
  {
    path: 'pagination',
    component: fromPages.PaginationComponent,
    name: 'Pagination'
  },
  {
    path: 'radio-button-wrapper',
    component: fromPages.RadioButtonWrapperComponent,
    name: 'Radio Button'
  },
  {
    path: 'select-wrapper',
    component: fromPages.SelectWrapperComponent,
    name: 'Select'
  },
  {
    path: 'spinner',
    component: fromPages.SpinnerComponent,
    name: 'Spinner'
  },
  {
    path: 'text',
    component: fromPages.TextComponent,
    name: 'Text'
  },
  {
    path: 'text-field-wrapper',
    component: fromPages.TextFieldWrapperComponent,
    name: 'Text Field'
  },
  {
    path: 'text-list',
    component: fromPages.TextListComponent,
    name: 'Text List'
  },
  {
    path: 'textarea-wrapper',
    component: fromPages.TextareaWrapperComponent,
    name: 'Textarea'
  },
  {
    path: 'typography',
    component: fromPages.TypographyComponent,
    name: 'Typography'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
