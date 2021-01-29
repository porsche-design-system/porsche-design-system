import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as fromPages from './pages';

export type ExtendedRoute = Route & {
  name?: string;
  isDisabled?: boolean;
};

export const routes: ExtendedRoute[] = [
  {
    path: '',
    children: [],
    pathMatch: 'full',
  },
  {
    path: 'banner',
    component: fromPages.BannerComponent,
    name: 'Banner',
  },
  {
    path: 'button',
    component: fromPages.ButtonComponent,
    name: 'Button',
  },
  {
    path: 'button-pure',
    component: fromPages.ButtonPureComponent,
    name: 'Button Pure',
  },
  {
    path: 'checkbox-wrapper',
    component: fromPages.CheckboxWrapperComponent,
    name: 'Checkbox',
  },
  {
    path: 'content-wrapper',
    component: fromPages.ContentWrapperComponent,
    name: 'Content Wrapper',
  },
  {
    path: 'divider',
    component: fromPages.DividerComponent,
    name: 'Divider',
  },
  {
    path: 'fieldset-wrapper',
    component: fromPages.FieldsetWrapperComponent,
    name: 'Fieldset',
  },
  {
    path: 'flex',
    component: fromPages.FlexComponent,
    name: 'Flex',
  },
  {
    path: 'grid',
    component: fromPages.GridComponent,
    name: 'Grid',
  },
  {
    path: 'headline',
    component: fromPages.HeadlineComponent,
    name: 'Headline',
  },
  {
    path: 'icon',
    component: fromPages.IconComponent,
    name: 'Icon',
  },
  {
    path: 'link',
    component: fromPages.LinkComponent,
    name: 'Link',
  },
  {
    path: 'link-pure',
    component: fromPages.LinkPureComponent,
    name: 'Link Pure',
  },
  {
    path: 'link-social',
    component: fromPages.LinkSocialComponent,
    name: 'Link Social',
  },
  {
    path: 'marque',
    component: fromPages.MarqueComponent,
    name: 'Marque',
  },
  {
    path: 'modal-basic',
    component: fromPages.ModalBasicComponent,
    name: 'Modal Basic',
  },
  {
    path: 'modal-scrollable',
    component: fromPages.ModalScrollableComponent,
    name: 'Modal Scrollable',
  },
  {
    path: 'modal-prefixed',
    component: fromPages.ModalPrefixedComponent,
    name: 'Modal Prefixed',
  },
  {
    path: 'pagination',
    component: fromPages.PaginationComponent,
    name: 'Pagination',
  },
  {
    path: 'radio-button-wrapper',
    component: fromPages.RadioButtonWrapperComponent,
    name: 'Radio Button',
  },
  {
    path: 'select-wrapper',
    component: fromPages.SelectWrapperComponent,
    name: 'Select',
  },
  {
    path: 'spinner',
    component: fromPages.SpinnerComponent,
    name: 'Spinner',
  },
  {
    path: 'tabs',
    component: fromPages.TabsComponent,
    name: 'Tabs',
  },
  {
    path: 'tabs-bar',
    component: fromPages.TabsBarComponent,
    name: 'Tabs Bar',
  },
  {
    path: 'text',
    component: fromPages.TextComponent,
    name: 'Text',
  },
  {
    path: 'text-field-wrapper',
    component: fromPages.TextFieldWrapperComponent,
    name: 'Text Field',
  },
  {
    path: 'text-list',
    component: fromPages.TextListComponent,
    name: 'Text List',
  },
  {
    path: 'textarea-wrapper',
    component: fromPages.TextareaWrapperComponent,
    name: 'Textarea',
  },
  {
    path: 'typography',
    component: fromPages.TypographyComponent,
    name: 'Typography',
  },
  {
    path: '---',
    name: '---',
    isDisabled: true,
    children: [],
  },
  {
    path: 'overview',
    component: fromPages.OverviewComponent,
    name: 'Overview',
  },
  {
    path: 'core-initializer',
    component: fromPages.CoreInitializerComponent,
    name: 'Core Initializer',
  },
  {
    path: 'core-initializer-prefixed',
    component: fromPages.CoreInitializerPrefixedComponent,
    name: 'Core Initializer Prefixed',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
