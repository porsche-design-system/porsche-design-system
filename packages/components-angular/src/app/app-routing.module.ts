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
    name: 'Accordion',
    path: 'accordion',
    component: fromPages.AccordionComponent,
  },
  {
    name: 'Banner',
    path: 'banner',
    component: fromPages.BannerComponent,
  },
  {
    name: 'Button',
    path: 'button',
    component: fromPages.ButtonComponent,
  },
  {
    name: 'Button Group',
    path: 'button-group',
    component: fromPages.ButtonGroupComponent,
  },
  {
    name: 'Button Pure',
    path: 'button-pure',
    component: fromPages.ButtonPureComponent,
  },
  {
    name: 'Checkbox',
    path: 'checkbox-wrapper',
    component: fromPages.CheckboxWrapperComponent,
  },
  {
    name: 'Content Wrapper',
    path: 'content-wrapper',
    component: fromPages.ContentWrapperComponent,
  },
  {
    name: 'Divider',
    path: 'divider',
    component: fromPages.DividerComponent,
  },
  {
    name: 'Fieldset',
    path: 'fieldset-wrapper',
    component: fromPages.FieldsetWrapperComponent,
  },
  {
    name: 'Flex',
    path: 'flex',
    component: fromPages.FlexComponent,
  },
  {
    name: 'Grid',
    path: 'grid',
    component: fromPages.GridComponent,
  },
  {
    name: 'Headline',
    path: 'headline',
    component: fromPages.HeadlineComponent,
  },
  {
    name: 'Icon',
    path: 'icon',
    component: fromPages.IconComponent,
  },
  {
    name: 'Inline Notification',
    path: 'inline-notification',
    component: fromPages.InlineNotificationComponent,
  },
  {
    name: 'Link',
    path: 'link',
    component: fromPages.LinkComponent,
  },
  {
    name: 'Link Pure',
    path: 'link-pure',
    component: fromPages.LinkPureComponent,
  },
  {
    name: 'Link Social',
    path: 'link-social',
    component: fromPages.LinkSocialComponent,
  },
  {
    name: 'Marque',
    path: 'marque',
    component: fromPages.MarqueComponent,
  },
  {
    name: 'Modal Basic',
    path: 'modal-basic',
    component: fromPages.ModalBasicComponent,
  },
  {
    name: 'Modal Fullscreen',
    path: 'modal-fullscreen',
    component: fromPages.ModalFullscreenComponent,
  },
  {
    name: 'Modal Fullscreen Breakpoint',
    path: 'modal-fullscreen-breakpoint',
    component: fromPages.ModalFullscreenBreakpointComponent,
  },
  {
    name: 'Modal Prefixed',
    path: 'modal-prefixed',
    component: fromPages.ModalPrefixedComponent,
  },
  {
    name: 'Modal Scrollable',
    path: 'modal-scrollable',
    component: fromPages.ModalScrollableComponent,
  },
  {
    name: 'Pagination',
    path: 'pagination',
    component: fromPages.PaginationComponent,
  },
  {
    name: 'Popover',
    path: 'popover',
    component: fromPages.PopoverComponent,
  },
  {
    name: 'Radio Button',
    path: 'radio-button-wrapper',
    component: fromPages.RadioButtonWrapperComponent,
  },
  {
    name: 'Select',
    path: 'select-wrapper',
    component: fromPages.SelectWrapperComponent,
  },
  {
    name: 'Spinner',
    path: 'spinner',
    component: fromPages.SpinnerComponent,
  },
  {
    name: 'Switch',
    path: 'switch',
    component: fromPages.SwitchComponent,
  },
  {
    name: 'Table',
    path: 'table',
    component: fromPages.TableComponent,
  },
  {
    name: 'Tabs',
    path: 'tabs',
    component: fromPages.TabsComponent,
  },
  {
    name: 'Tabs Bar',
    path: 'tabs-bar',
    component: fromPages.TabsBarComponent,
  },
  {
    name: 'Text',
    path: 'text',
    component: fromPages.TextComponent,
  },
  {
    name: 'Text Field',
    path: 'text-field-wrapper',
    component: fromPages.TextFieldWrapperComponent,
  },
  {
    name: 'Text List',
    path: 'text-list',
    component: fromPages.TextListComponent,
  },
  {
    name: 'Textarea',
    path: 'textarea-wrapper',
    component: fromPages.TextareaWrapperComponent,
  },
  {
    name: 'Toast Basic',
    path: 'toast-basic',
    component: fromPages.ToastBasicComponent,
  },
  {
    name: 'Toast Basic Dark',
    path: 'toast-basic-dark',
    component: fromPages.ToastBasicDarkComponent,
  },
  {
    name: 'Toast Basic Long Text',
    path: 'toast-basic-long-text',
    component: fromPages.ToastBasicLongTextComponent,
  },
  {
    name: 'Toast Offset',
    path: 'toast-offset',
    component: fromPages.ToastOffsetComponent,
  },
  {
    name: 'Toast Prefixed',
    path: 'toast-prefixed',
    component: fromPages.ToastPrefixedComponent,
  },
  {
    name: 'Typography Fallback Strategy',
    path: 'typography-fallback-strategy',
    component: fromPages.TypographyFallbackStrategyComponent,
  },
  {
    name: 'Typography Latin',
    path: 'typography-latin',
    component: fromPages.TypographyLatinComponent,
  },
  {
    name: 'Typography Greek & Coptic',
    path: 'typography-greek-and-coptic',
    component: fromPages.TypographyGreekAndCopticComponent,
  },
  {
    name: 'Typography Cyril',
    path: 'typography-cyril',
    component: fromPages.TypographyCyrilComponent,
  },
  {
    name: '---',
    path: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Overview',
    path: 'overview',
    component: fromPages.OverviewComponent,
  },
  {
    name: 'Core Initializer',
    path: 'core-initializer',
    component: fromPages.CoreInitializerComponent,
  },
  {
    name: 'Core Initializer Prefixed',
    path: 'core-initializer-prefixed',
    component: fromPages.CoreInitializerPrefixedComponent,
  },
  {
    name: 'Events',
    path: 'events',
    component: fromPages.EventsComponent,
  },
  {
    name: 'Form Wrapper Binding',
    path: 'form-wrapper-binding',
    component: fromPages.FormWrapperBindingComponent,
  },
  {
    name: '---',
    path: '---',
    isDisabled: true,
    children: [],
  },
  {
    name: 'Accordion Example',
    path: 'accordion-example',
    component: fromExamples.AccordionExampleComponent,
  },
  {
    name: 'Inline Notification Example Events',
    path: 'inline-notification-example-events',
    component: fromExamples.InlineNotificationExampleEventsComponent,
  },
  {
    name: 'Inline Notification Example Action Button',
    path: 'inline-notification-example-action-button',
    component: fromExamples.InlineNotificationExampleActionButtonComponent,
  },
  {
    name: 'Table Example Basic',
    path: 'table-example-basic',
    component: fromExamples.TableExampleBasicComponent,
  },
  {
    name: 'Table Example Sorting',
    path: 'table-example-sorting',
    component: fromExamples.TableExampleSortingComponent,
  },
  {
    name: 'Table Example Advanced',
    path: 'table-example-advanced',
    component: fromExamples.TableExampleAdvancedComponent,
  },
  {
    name: 'Tabs Bar Example',
    path: 'tabs-bar-example',
    component: fromExamples.TabsBarExampleComponent,
  },
  {
    name: 'Toast Example',
    path: 'toast-example',
    component: fromExamples.ToastExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
