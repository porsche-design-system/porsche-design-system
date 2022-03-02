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
import { ButtonSkeletonComponent } from './button-skeleton.component';
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
  ButtonSkeletonComponent,
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
    component: AccordionComponent,
  },
  {
    name: 'Banner',
    path: 'banner',
    component: BannerComponent,
  },
  {
    name: 'Button Group',
    path: 'button-group',
    component: ButtonGroupComponent,
  },
  {
    name: 'Button Pure',
    path: 'button-pure',
    component: ButtonPureComponent,
  },
  {
    name: 'Button Skeleton',
    path: 'button-skeleton',
    component: ButtonSkeletonComponent,
  },
  {
    name: 'Button',
    path: 'button',
    component: ButtonComponent,
  },
  {
    name: 'Checkbox Wrapper',
    path: 'checkbox-wrapper',
    component: CheckboxWrapperComponent,
  },
  {
    name: 'Content Wrapper',
    path: 'content-wrapper',
    component: ContentWrapperComponent,
  },
  {
    name: 'Divider',
    path: 'divider',
    component: DividerComponent,
  },
  {
    name: 'Fieldset Wrapper',
    path: 'fieldset-wrapper',
    component: FieldsetWrapperComponent,
  },
  {
    name: 'Flex',
    path: 'flex',
    component: FlexComponent,
  },
  {
    name: 'Grid',
    path: 'grid',
    component: GridComponent,
  },
  {
    name: 'Headline',
    path: 'headline',
    component: HeadlineComponent,
  },
  {
    name: 'Icon',
    path: 'icon',
    component: IconComponent,
  },
  {
    name: 'Inline Notification',
    path: 'inline-notification',
    component: InlineNotificationComponent,
  },
  {
    name: 'Link Pure',
    path: 'link-pure',
    component: LinkPureComponent,
  },
  {
    name: 'Link Social',
    path: 'link-social',
    component: LinkSocialComponent,
  },
  {
    name: 'Link',
    path: 'link',
    component: LinkComponent,
  },
  {
    name: 'Marque',
    path: 'marque',
    component: MarqueComponent,
  },
  {
    name: 'Modal Basic',
    path: 'modal-basic',
    component: ModalBasicComponent,
  },
  {
    name: 'Modal Full Width Slot',
    path: 'modal-full-width-slot',
    component: ModalFullWidthSlotComponent,
  },
  {
    name: 'Modal Fullscreen Breakpoint',
    path: 'modal-fullscreen-breakpoint',
    component: ModalFullscreenBreakpointComponent,
  },
  {
    name: 'Modal Fullscreen',
    path: 'modal-fullscreen',
    component: ModalFullscreenComponent,
  },
  {
    name: 'Modal No Heading',
    path: 'modal-no-heading',
    component: ModalNoHeadingComponent,
  },
  {
    name: 'Modal Prefixed',
    path: 'modal-prefixed',
    component: ModalPrefixedComponent,
  },
  {
    name: 'Modal Scrollable',
    path: 'modal-scrollable',
    component: ModalScrollableComponent,
  },
  {
    name: 'Modal Slotted Heading',
    path: 'modal-slotted-heading',
    component: ModalSlottedHeadingComponent,
  },
  {
    name: 'Pagination',
    path: 'pagination',
    component: PaginationComponent,
  },
  {
    name: 'Popover',
    path: 'popover',
    component: PopoverComponent,
  },
  {
    name: 'Radio Button Wrapper',
    path: 'radio-button-wrapper',
    component: RadioButtonWrapperComponent,
  },
  {
    name: 'Select Wrapper',
    path: 'select-wrapper',
    component: SelectWrapperComponent,
  },
  {
    name: 'Spinner',
    path: 'spinner',
    component: SpinnerComponent,
  },
  {
    name: 'Switch',
    path: 'switch',
    component: SwitchComponent,
  },
  {
    name: 'Tabs Bar',
    path: 'tabs-bar',
    component: TabsBarComponent,
  },
  {
    name: 'Tabs',
    path: 'tabs',
    component: TabsComponent,
  },
  {
    name: 'Text Field Wrapper',
    path: 'text-field-wrapper',
    component: TextFieldWrapperComponent,
  },
  {
    name: 'Text List',
    path: 'text-list',
    component: TextListComponent,
  },
  {
    name: 'Text',
    path: 'text',
    component: TextComponent,
  },
  {
    name: 'Textarea Wrapper',
    path: 'textarea-wrapper',
    component: TextareaWrapperComponent,
  },
  {
    name: 'Toast Basic Dark',
    path: 'toast-basic-dark',
    component: ToastBasicDarkComponent,
  },
  {
    name: 'Toast Basic Long Text',
    path: 'toast-basic-long-text',
    component: ToastBasicLongTextComponent,
  },
  {
    name: 'Toast Basic',
    path: 'toast-basic',
    component: ToastBasicComponent,
  },
  {
    name: 'Toast Offset',
    path: 'toast-offset',
    component: ToastOffsetComponent,
  },
  {
    name: 'Toast Prefixed',
    path: 'toast-prefixed',
    component: ToastPrefixedComponent,
  },
  {
    name: 'Typography Cyril',
    path: 'typography-cyril',
    component: TypographyCyrilComponent,
  },
  {
    name: 'Typography Fallback Strategy',
    path: 'typography-fallback-strategy',
    component: TypographyFallbackStrategyComponent,
  },
  {
    name: 'Typography Greek And Coptic',
    path: 'typography-greek-and-coptic',
    component: TypographyGreekAndCopticComponent,
  },
  {
    name: 'Typography Latin',
    path: 'typography-latin',
    component: TypographyLatinComponent,
  },
];
