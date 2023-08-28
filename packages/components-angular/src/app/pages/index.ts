import type { ExtendedRoute } from '../app-routing.module';
import { CoreInitializerPrefixedComponent } from './core-initializer-prefixed.component';
import { EventsComponent } from './events.component';
import { FormWrapperBindingComponent } from './form-wrapper-binding.component';
import { OptionalPropertiesComponent } from './optional-properties.component';
import { TableComponent } from './table.component';
import { UtilitiesComponent } from './utilities.component';

export const pages = [
  CoreInitializerPrefixedComponent,
  EventsComponent,
  FormWrapperBindingComponent,
  OptionalPropertiesComponent,
  TableComponent,
  UtilitiesComponent,
];

export * from './core-initializer-prefixed.component';
export * from './events.component';
export * from './form-wrapper-binding.component';
export * from './optional-properties.component';
export * from './table.component';
export * from './utilities.component';

/* Auto Generated Below */
export * from './generated/core-initializer.component';
export * from './generated/overview-flaky.component';
export * from './generated/overview-notifications.component';
export * from './generated/overview.component';
import { AccordionComponent } from './generated/accordion.component';
import { BannerComponent } from './generated/banner.component';
import { ButtonComponent } from './generated/button.component';
import { ButtonGroupComponent } from './generated/button-group.component';
import { ButtonPureComponent } from './generated/button-pure.component';
import { ButtonTileComponent } from './generated/button-tile.component';
import { CarouselComponent } from './generated/carousel.component';
import { CheckboxWrapperComponent } from './generated/checkbox-wrapper.component';
import { ContentWrapperComponent } from './generated/content-wrapper.component';
import { CoreInitializerComponent } from './generated/core-initializer.component';
import { CrestComponent } from './generated/crest.component';
import { DisplayComponent } from './generated/display.component';
import { DividerComponent } from './generated/divider.component';
import { FieldsetComponent } from './generated/fieldset.component';
import { FieldsetWrapperComponent } from './generated/fieldset-wrapper.component';
import { FlexComponent } from './generated/flex.component';
import { FlyoutComponent } from './generated/flyout.component';
import { GridComponent } from './generated/grid.component';
import { HeadingComponent } from './generated/heading.component';
import { HeadlineComponent } from './generated/headline.component';
import { IconComponent } from './generated/icon.component';
import { InlineNotificationComponent } from './generated/inline-notification.component';
import { LinkComponent } from './generated/link.component';
import { LinkPureComponent } from './generated/link-pure.component';
import { LinkSocialComponent } from './generated/link-social.component';
import { LinkTileComponent } from './generated/link-tile.component';
import { LinkTileModelSignatureComponent } from './generated/link-tile-model-signature.component';
import { MarqueComponent } from './generated/marque.component';
import { ModalComponent } from './generated/modal.component';
import { ModelSignatureComponent } from './generated/model-signature.component';
import { OverviewComponent } from './generated/overview.component';
import { OverviewFlakyComponent } from './generated/overview-flaky.component';
import { OverviewNotificationsComponent } from './generated/overview-notifications.component';
import { PaginationComponent } from './generated/pagination.component';
import { PopoverComponent } from './generated/popover.component';
import { RadioButtonWrapperComponent } from './generated/radio-button-wrapper.component';
import { ScrollerComponent } from './generated/scroller.component';
import { SegmentedControlComponent } from './generated/segmented-control.component';
import { SelectWrapperComponent } from './generated/select-wrapper.component';
import { SpinnerComponent } from './generated/spinner.component';
import { StepperHorizontalComponent } from './generated/stepper-horizontal.component';
import { SwitchComponent } from './generated/switch.component';
import { TabsComponent } from './generated/tabs.component';
import { TabsBarComponent } from './generated/tabs-bar.component';
import { TagComponent } from './generated/tag.component';
import { TagDismissibleComponent } from './generated/tag-dismissible.component';
import { TextComponent } from './generated/text.component';
import { TextareaWrapperComponent } from './generated/textarea-wrapper.component';
import { TextFieldWrapperComponent } from './generated/text-field-wrapper.component';
import { TextListComponent } from './generated/text-list.component';
import { ToastBasicComponent } from './generated/toast-basic.component';
import { ToastBasicDarkComponent } from './generated/toast-basic-dark.component';
import { ToastBasicLongTextComponent } from './generated/toast-basic-long-text.component';
import { ToastBasicStateNeutralComponent } from './generated/toast-basic-state-neutral.component';
import { ToastOffsetComponent } from './generated/toast-offset.component';
import { ToastPrefixedComponent } from './generated/toast-prefixed.component';
import { TypographyCyrilComponent } from './generated/typography-cyril.component';
import { TypographyFallbackStrategyComponent } from './generated/typography-fallback-strategy.component';
import { TypographyGreekAndCopticComponent } from './generated/typography-greek-and-coptic.component';
import { TypographyLatinComponent } from './generated/typography-latin.component';
import { WordmarkComponent } from './generated/wordmark.component';

export const generatedPages = [
  AccordionComponent,
  BannerComponent,
  ButtonComponent,
  ButtonGroupComponent,
  ButtonPureComponent,
  ButtonTileComponent,
  CarouselComponent,
  CheckboxWrapperComponent,
  ContentWrapperComponent,
  CoreInitializerComponent,
  CrestComponent,
  DisplayComponent,
  DividerComponent,
  FieldsetComponent,
  FieldsetWrapperComponent,
  FlexComponent,
  FlyoutComponent,
  GridComponent,
  HeadingComponent,
  HeadlineComponent,
  IconComponent,
  InlineNotificationComponent,
  LinkComponent,
  LinkPureComponent,
  LinkSocialComponent,
  LinkTileComponent,
  LinkTileModelSignatureComponent,
  MarqueComponent,
  ModalComponent,
  ModelSignatureComponent,
  OverviewComponent,
  OverviewFlakyComponent,
  OverviewNotificationsComponent,
  PaginationComponent,
  PopoverComponent,
  RadioButtonWrapperComponent,
  ScrollerComponent,
  SegmentedControlComponent,
  SelectWrapperComponent,
  SpinnerComponent,
  StepperHorizontalComponent,
  SwitchComponent,
  TabsComponent,
  TabsBarComponent,
  TagComponent,
  TagDismissibleComponent,
  TextComponent,
  TextareaWrapperComponent,
  TextFieldWrapperComponent,
  TextListComponent,
  ToastBasicComponent,
  ToastBasicDarkComponent,
  ToastBasicLongTextComponent,
  ToastBasicStateNeutralComponent,
  ToastOffsetComponent,
  ToastPrefixedComponent,
  TypographyCyrilComponent,
  TypographyFallbackStrategyComponent,
  TypographyGreekAndCopticComponent,
  TypographyLatinComponent,
  WordmarkComponent,
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
    name: 'Button',
    path: 'button',
    component: ButtonComponent,
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
    name: 'Button Tile',
    path: 'button-tile',
    component: ButtonTileComponent,
  },
  {
    name: 'Carousel',
    path: 'carousel',
    component: CarouselComponent,
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
    name: 'Crest',
    path: 'crest',
    component: CrestComponent,
  },
  {
    name: 'Display',
    path: 'display',
    component: DisplayComponent,
  },
  {
    name: 'Divider',
    path: 'divider',
    component: DividerComponent,
  },
  {
    name: 'Fieldset',
    path: 'fieldset',
    component: FieldsetComponent,
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
    name: 'Flyout',
    path: 'flyout',
    component: FlyoutComponent,
  },
  {
    name: 'Grid',
    path: 'grid',
    component: GridComponent,
  },
  {
    name: 'Heading',
    path: 'heading',
    component: HeadingComponent,
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
    name: 'Link',
    path: 'link',
    component: LinkComponent,
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
    name: 'Link Tile',
    path: 'link-tile',
    component: LinkTileComponent,
  },
  {
    name: 'Link Tile Model Signature',
    path: 'link-tile-model-signature',
    component: LinkTileModelSignatureComponent,
  },
  {
    name: 'Marque',
    path: 'marque',
    component: MarqueComponent,
  },
  {
    name: 'Modal',
    path: 'modal',
    component: ModalComponent,
  },
  {
    name: 'Model Signature',
    path: 'model-signature',
    component: ModelSignatureComponent,
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
    name: 'Scroller',
    path: 'scroller',
    component: ScrollerComponent,
  },
  {
    name: 'Segmented Control',
    path: 'segmented-control',
    component: SegmentedControlComponent,
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
    name: 'Stepper Horizontal',
    path: 'stepper-horizontal',
    component: StepperHorizontalComponent,
  },
  {
    name: 'Switch',
    path: 'switch',
    component: SwitchComponent,
  },
  {
    name: 'Tabs',
    path: 'tabs',
    component: TabsComponent,
  },
  {
    name: 'Tabs Bar',
    path: 'tabs-bar',
    component: TabsBarComponent,
  },
  {
    name: 'Tag',
    path: 'tag',
    component: TagComponent,
  },
  {
    name: 'Tag Dismissible',
    path: 'tag-dismissible',
    component: TagDismissibleComponent,
  },
  {
    name: 'Text',
    path: 'text',
    component: TextComponent,
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
    name: 'Textarea Wrapper',
    path: 'textarea-wrapper',
    component: TextareaWrapperComponent,
  },
  {
    name: 'Toast Basic',
    path: 'toast-basic',
    component: ToastBasicComponent,
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
    name: 'Toast Basic State Neutral',
    path: 'toast-basic-state-neutral',
    component: ToastBasicStateNeutralComponent,
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
  {
    name: 'Wordmark',
    path: 'wordmark',
    component: WordmarkComponent,
  },
];
