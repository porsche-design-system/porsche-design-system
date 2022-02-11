import type { ExtendedRoute } from '../app-routing.module';
import { CoreInitializerPrefixedComponent } from './core-initializer-prefixed.component';
import { EventsComponent } from './events.component';
import { TableComponent } from './table.component';
import { FormWrapperBindingComponent } from './form-wrapper-binding.component';

export const pages = [CoreInitializerPrefixedComponent, EventsComponent, FormWrapperBindingComponent, TableComponent];

export * from './core-initializer-prefixed.component';
export * from './events.component';
export * from './form-wrapper-binding.component';
export * from './table.component';

/* Auto Generated Below */
export * from './core-initializer.component';
export * from './overview.component';
import { AccordionComponent } from './accordion.component';
import { BannerComponent } from './banner.component';
import { ButtonComponent } from './button.component';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonPureComponent } from './button-pure.component';
import { CheckboxWrapperComponent } from './checkbox-wrapper.component';
import { ContentWrapperComponent } from './content-wrapper.component';
import { CoreInitializerComponent } from './core-initializer.component';
import { DividerComponent } from './divider.component';
import { FieldsetWrapperComponent } from './fieldset-wrapper.component';
import { FlexComponent } from './flex.component';
import { GridComponent } from './grid.component';
import { HeadlineComponent } from './headline.component';
import { IconComponent } from './icon.component';
import { InlineNotificationComponent } from './inline-notification.component';
import { LinkComponent } from './link.component';
import { LinkPureComponent } from './link-pure.component';
import { LinkSocialComponent } from './link-social.component';
import { MarqueComponent } from './marque.component';
import { ModalBasicComponent } from './modal-basic.component';
import { ModalFullscreenComponent } from './modal-fullscreen.component';
import { ModalFullscreenBreakpointComponent } from './modal-fullscreen-breakpoint.component';
import { ModalFullWidthSlotComponent } from './modal-full-width-slot.component';
import { ModalNoHeadingComponent } from './modal-no-heading.component';
import { ModalPrefixedComponent } from './modal-prefixed.component';
import { ModalScrollableComponent } from './modal-scrollable.component';
import { ModalSlottedHeadingComponent } from './modal-slotted-heading.component';
import { OverviewComponent } from './overview.component';
import { PaginationComponent } from './pagination.component';
import { PopoverComponent } from './popover.component';
import { RadioButtonWrapperComponent } from './radio-button-wrapper.component';
import { SelectWrapperComponent } from './select-wrapper.component';
import { SpinnerComponent } from './spinner.component';
import { SwitchComponent } from './switch.component';
import { TabsComponent } from './tabs.component';
import { TabsBarComponent } from './tabs-bar.component';
import { TextComponent } from './text.component';
import { TextareaWrapperComponent } from './textarea-wrapper.component';
import { TextFieldWrapperComponent } from './text-field-wrapper.component';
import { TextListComponent } from './text-list.component';
import { ToastBasicComponent } from './toast-basic.component';
import { ToastBasicDarkComponent } from './toast-basic-dark.component';
import { ToastBasicLongTextComponent } from './toast-basic-long-text.component';
import { ToastOffsetComponent } from './toast-offset.component';
import { ToastPrefixedComponent } from './toast-prefixed.component';
import { TypographyCyrilComponent } from './typography-cyril.component';
import { TypographyFallbackStrategyComponent } from './typography-fallback-strategy.component';
import { TypographyGreekAndCopticComponent } from './typography-greek-and-coptic.component';
import { TypographyLatinComponent } from './typography-latin.component';

export const generatedPages = [
  AccordionComponent,
  BannerComponent,
  ButtonGroupComponent,
  ButtonPureComponent,
  ButtonComponent,
  CheckboxWrapperComponent,
  ContentWrapperComponent,
  CoreInitializerComponent,
  DividerComponent,
  FieldsetWrapperComponent,
  FlexComponent,
  GridComponent,
  HeadlineComponent,
  IconComponent,
  InlineNotificationComponent,
  LinkPureComponent,
  LinkSocialComponent,
  LinkComponent,
  MarqueComponent,
  ModalBasicComponent,
  ModalFullWidthSlotComponent,
  ModalFullscreenBreakpointComponent,
  ModalFullscreenComponent,
  ModalNoHeadingComponent,
  ModalPrefixedComponent,
  ModalScrollableComponent,
  ModalSlottedHeadingComponent,
  OverviewComponent,
  PaginationComponent,
  PopoverComponent,
  RadioButtonWrapperComponent,
  SelectWrapperComponent,
  SpinnerComponent,
  SwitchComponent,
  TabsBarComponent,
  TabsComponent,
  TextFieldWrapperComponent,
  TextListComponent,
  TextComponent,
  TextareaWrapperComponent,
  ToastBasicDarkComponent,
  ToastBasicLongTextComponent,
  ToastBasicComponent,
  ToastOffsetComponent,
  ToastPrefixedComponent,
  TypographyCyrilComponent,
  TypographyFallbackStrategyComponent,
  TypographyGreekAndCopticComponent,
  TypographyLatinComponent,
];

export const generatedRoutes: ExtendedRoute[] = [
  {
    name: 'Accordion',
    path: 'accordion',
    element: <AccordionComponent />,
  },
  {
    name: 'Banner',
    path: 'banner',
    element: <BannerComponent />,
  },
  {
    name: 'Button Group',
    path: 'button-group',
    element: <ButtonGroupComponent />,
  },
  {
    name: 'Button Pure',
    path: 'button-pure',
    element: <ButtonPureComponent />,
  },
  {
    name: 'Button',
    path: 'button',
    element: <ButtonComponent />,
  },
  {
    name: 'Checkbox Wrapper',
    path: 'checkbox-wrapper',
    element: <CheckboxWrapperComponent />,
  },
  {
    name: 'Content Wrapper',
    path: 'content-wrapper',
    element: <ContentWrapperComponent />,
  },
  {
    name: 'Divider',
    path: 'divider',
    element: <DividerComponent />,
  },
  {
    name: 'Fieldset Wrapper',
    path: 'fieldset-wrapper',
    element: <FieldsetWrapperComponent />,
  },
  {
    name: 'Flex',
    path: 'flex',
    element: <FlexComponent />,
  },
  {
    name: 'Grid',
    path: 'grid',
    element: <GridComponent />,
  },
  {
    name: 'Headline',
    path: 'headline',
    element: <HeadlineComponent />,
  },
  {
    name: 'Icon',
    path: 'icon',
    element: <IconComponent />,
  },
  {
    name: 'Inline Notification',
    path: 'inline-notification',
    element: <InlineNotificationComponent />,
  },
  {
    name: 'Link Pure',
    path: 'link-pure',
    element: <LinkPureComponent />,
  },
  {
    name: 'Link Social',
    path: 'link-social',
    element: <LinkSocialComponent />,
  },
  {
    name: 'Link',
    path: 'link',
    element: <LinkComponent />,
  },
  {
    name: 'Marque',
    path: 'marque',
    element: <MarqueComponent />,
  },
  {
    name: 'Modal Basic',
    path: 'modal-basic',
    element: <ModalBasicComponent />,
  },
  {
    name: 'Modal Full Width Slot',
    path: 'modal-full-width-slot',
    element: <ModalFullWidthSlotComponent />,
  },
  {
    name: 'Modal Fullscreen Breakpoint',
    path: 'modal-fullscreen-breakpoint',
    element: <ModalFullscreenBreakpointComponent />,
  },
  {
    name: 'Modal Fullscreen',
    path: 'modal-fullscreen',
    element: <ModalFullscreenComponent />,
  },
  {
    name: 'Modal No Heading',
    path: 'modal-no-heading',
    element: <ModalNoHeadingComponent />,
  },
  {
    name: 'Modal Prefixed',
    path: 'modal-prefixed',
    element: <ModalPrefixedComponent />,
  },
  {
    name: 'Modal Scrollable',
    path: 'modal-scrollable',
    element: <ModalScrollableComponent />,
  },
  {
    name: 'Modal Slotted Heading',
    path: 'modal-slotted-heading',
    element: <ModalSlottedHeadingComponent />,
  },
  {
    name: 'Pagination',
    path: 'pagination',
    element: <PaginationComponent />,
  },
  {
    name: 'Popover',
    path: 'popover',
    element: <PopoverComponent />,
  },
  {
    name: 'Radio Button Wrapper',
    path: 'radio-button-wrapper',
    element: <RadioButtonWrapperComponent />,
  },
  {
    name: 'Select Wrapper',
    path: 'select-wrapper',
    element: <SelectWrapperComponent />,
  },
  {
    name: 'Spinner',
    path: 'spinner',
    element: <SpinnerComponent />,
  },
  {
    name: 'Switch',
    path: 'switch',
    element: <SwitchComponent />,
  },
  {
    name: 'Tabs Bar',
    path: 'tabs-bar',
    element: <TabsBarComponent />,
  },
  {
    name: 'Tabs',
    path: 'tabs',
    element: <TabsComponent />,
  },
  {
    name: 'Text Field Wrapper',
    path: 'text-field-wrapper',
    element: <TextFieldWrapperComponent />,
  },
  {
    name: 'Text List',
    path: 'text-list',
    element: <TextListComponent />,
  },
  {
    name: 'Text',
    path: 'text',
    element: <TextComponent />,
  },
  {
    name: 'Textarea Wrapper',
    path: 'textarea-wrapper',
    element: <TextareaWrapperComponent />,
  },
  {
    name: 'Toast Basic Dark',
    path: 'toast-basic-dark',
    element: <ToastBasicDarkComponent />,
  },
  {
    name: 'Toast Basic Long Text',
    path: 'toast-basic-long-text',
    element: <ToastBasicLongTextComponent />,
  },
  {
    name: 'Toast Basic',
    path: 'toast-basic',
    element: <ToastBasicComponent />,
  },
  {
    name: 'Toast Offset',
    path: 'toast-offset',
    element: <ToastOffsetComponent />,
  },
  {
    name: 'Toast Prefixed',
    path: 'toast-prefixed',
    element: <ToastPrefixedComponent />,
  },
  {
    name: 'Typography Cyril',
    path: 'typography-cyril',
    element: <TypographyCyrilComponent />,
  },
  {
    name: 'Typography Fallback Strategy',
    path: 'typography-fallback-strategy',
    element: <TypographyFallbackStrategyComponent />,
  },
  {
    name: 'Typography Greek And Coptic',
    path: 'typography-greek-and-coptic',
    element: <TypographyGreekAndCopticComponent />,
  },
  {
    name: 'Typography Latin',
    path: 'typography-latin',
    element: <TypographyLatinComponent />,
  },
];
