import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as fromPages from './pages';
import * as fromExamples from './examples';

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
    path: 'button-group',
    component: fromPages.ButtonGroupComponent,
    name: 'Button Group',
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
    path: 'modal-fullscreen',
    component: fromPages.ModalFullscreenComponent,
    name: 'Modal Fullscreen',
  },
  {
    path: 'modal-fullscreen-breakpoint',
    component: fromPages.ModalFullscreenBreakpointComponent,
    name: 'Modal Fullscreen Breakpoint',
  },
  {
    path: 'modal-prefixed',
    component: fromPages.ModalPrefixedComponent,
    name: 'Modal Prefixed',
  },
  {
    path: 'modal-scrollable',
    component: fromPages.ModalScrollableComponent,
    name: 'Modal Scrollable',
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
    path: 'switch',
    component: fromPages.SwitchComponent,
    name: 'Switch',
  },
  {
    path: 'table',
    component: fromPages.TableComponent,
    name: 'Table',
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
  {
    path: 'events',
    component: fromPages.EventsComponent,
    name: 'Events',
  },
  {
    path: 'form-wrapper-binding',
    component: fromPages.FormWrapperBindingComponent,
    name: 'Form Wrapper Binding',
  },
  {
    path: '---',
    name: '---',
    isDisabled: true,
    children: [],
  },
  {
    path: 'table-example-basic',
    component: fromExamples.TableExampleBasicComponent,
    name: 'Table Example Basic',
  },
  {
    path: 'table-example-advanced',
    component: fromExamples.TableExampleAdvancedComponent,
    name: 'Table Example Advanced',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
