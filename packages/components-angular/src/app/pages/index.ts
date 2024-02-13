import type { ExtendedRoute } from '../app-routing.module';
import { CoreInitializerPrefixedComponent } from './core-initializer-prefixed.component';
import { EventsComponent } from './events.component';
import { FormWrapperBindingComponent } from './form-wrapper-binding.component';
import { OptionalPropertiesComponent } from './optional-properties.component';
import { ThemeInjectionComponent } from './theme-injection.component';
import { UtilitiesComponent } from './utilities.component';
import { tabsBarNavigationComponents } from './tabs-bar-navigation';
import { tabsBarNavigationBugComponents } from './tabs-bar-navigation-bug';

export const pages = [
  CoreInitializerPrefixedComponent,
  EventsComponent,
  FormWrapperBindingComponent,
  OptionalPropertiesComponent,
  ThemeInjectionComponent,
  UtilitiesComponent,
  ...tabsBarNavigationComponents,
  ...tabsBarNavigationBugComponents,
];

export * from './core-initializer-prefixed.component';
export * from './events.component';
export * from './form-wrapper-binding.component';
export * from './optional-properties.component';
export * from './theme-injection.component';
export * from './utilities.component';
export * from './tabs-bar-navigation';
export * from './tabs-bar-navigation-bug';

/* Auto Generated Below */
export * from './generated/core-initializer.component';
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
import { FlyoutBasicComponent } from './generated/flyout-basic.component';
import { FlyoutFooterComponent } from './generated/flyout-footer.component';
import { FlyoutFooterScrollableContentComponent } from './generated/flyout-footer-scrollable-content.component';
import { FlyoutGridComponent } from './generated/flyout-grid.component';
import { FlyoutHeaderComponent } from './generated/flyout-header.component';
import { FlyoutHeaderFooterComponent } from './generated/flyout-header-footer.component';
import { FlyoutHeaderFooterScrollableContentComponent } from './generated/flyout-header-footer-scrollable-content.component';
import { FlyoutHeaderFooterScrolledComponent } from './generated/flyout-header-footer-scrolled.component';
import { FlyoutHeaderFooterScrolledRelativeComponent } from './generated/flyout-header-footer-scrolled-relative.component';
import { FlyoutHeaderFooterSubfooterComponent } from './generated/flyout-header-footer-subfooter.component';
import { FlyoutHeaderFooterSubfooterPositionLeftComponent } from './generated/flyout-header-footer-subfooter-position-left.component';
import { FlyoutHeaderFooterSubfooterPositionStartComponent } from './generated/flyout-header-footer-subfooter-position-start.component';
import { FlyoutHeaderFooterSubfooterScrollableContentComponent } from './generated/flyout-header-footer-subfooter-scrollable-content.component';
import { FlyoutHeaderFooterSubfooterScrolledComponent } from './generated/flyout-header-footer-subfooter-scrolled.component';
import { FlyoutHeaderFooterSubfooterScrolledOverlapComponent } from './generated/flyout-header-footer-subfooter-scrolled-overlap.component';
import { FlyoutHeaderFooterSubfooterSlottedAnchorComponent } from './generated/flyout-header-footer-subfooter-slotted-anchor.component';
import { FlyoutHeaderScrollableContentComponent } from './generated/flyout-header-scrollable-content.component';
import { FlyoutMaxWidthContentComponent } from './generated/flyout-max-width-content.component';
import { FlyoutMaxWidthContentPositionLeftComponent } from './generated/flyout-max-width-content-position-left.component';
import { FlyoutMaxWidthContentPositionStartComponent } from './generated/flyout-max-width-content-position-start.component';
import { FlyoutNavigationComponent } from './generated/flyout-navigation.component';
import { FlyoutNavigationActiveIdentifierComponent } from './generated/flyout-navigation-active-identifier.component';
import { FlyoutNavigationBasicComponent } from './generated/flyout-navigation-basic.component';
import { FlyoutNavigationPrefixedComponent } from './generated/flyout-navigation-prefixed.component';
import { FlyoutNavigationScrolledComponent } from './generated/flyout-navigation-scrolled.component';
import { FlyoutPositionLeftComponent } from './generated/flyout-position-left.component';
import { FlyoutPositionStartComponent } from './generated/flyout-position-start.component';
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
import { LinkTileProductComponent } from './generated/link-tile-product.component';
import { MarqueComponent } from './generated/marque.component';
import { ModalComponent } from './generated/modal.component';
import { ModalBasicComponent } from './generated/modal-basic.component';
import { ModalDisableCloseButtonComponent } from './generated/modal-disable-close-button.component';
import { ModalFullscreenComponent } from './generated/modal-fullscreen.component';
import { ModalFullscreenResponsiveComponent } from './generated/modal-fullscreen-responsive.component';
import { ModalScrollableComponent } from './generated/modal-scrollable.component';
import { ModalSlottedHeadingComponent } from './generated/modal-slotted-heading.component';
import { ModalStickyFooterComponent } from './generated/modal-sticky-footer.component';
import { ModalStretchToFullWidthComponent } from './generated/modal-stretch-to-full-width.component';
import { ModalWithoutDismissButtonComponent } from './generated/modal-without-dismiss-button.component';
import { ModalWithoutHeadingComponent } from './generated/modal-without-heading.component';
import { ModelSignatureComponent } from './generated/model-signature.component';
import { MultiSelectComponent } from './generated/multi-select.component';
import { OverviewComponent } from './generated/overview.component';
import { OverviewNotificationsComponent } from './generated/overview-notifications.component';
import { PaginationComponent } from './generated/pagination.component';
import { PinCodeComponent } from './generated/pin-code.component';
import { PopoverComponent } from './generated/popover.component';
import { RadioButtonWrapperComponent } from './generated/radio-button-wrapper.component';
import { ScrollerComponent } from './generated/scroller.component';
import { SegmentedControlComponent } from './generated/segmented-control.component';
import { SelectComponent } from './generated/select.component';
import { SelectWrapperComponent } from './generated/select-wrapper.component';
import { SpinnerComponent } from './generated/spinner.component';
import { StepperHorizontalComponent } from './generated/stepper-horizontal.component';
import { SwitchComponent } from './generated/switch.component';
import { TableComponent } from './generated/table.component';
import { TabsComponent } from './generated/tabs.component';
import { TabsBarComponent } from './generated/tabs-bar.component';
import { TagComponent } from './generated/tag.component';
import { TagDismissibleComponent } from './generated/tag-dismissible.component';
import { TextComponent } from './generated/text.component';
import { TextareaWrapperComponent } from './generated/textarea-wrapper.component';
import { TextFieldWrapperComponent } from './generated/text-field-wrapper.component';
import { TextListComponent } from './generated/text-list.component';
import { ToastComponent } from './generated/toast.component';
import { ToastBasicComponent } from './generated/toast-basic.component';
import { ToastMultilineComponent } from './generated/toast-multiline.component';
import { ToastOffsetComponent } from './generated/toast-offset.component';
import { ToastPrefixedComponent } from './generated/toast-prefixed.component';
import { ToastStateNeutralComponent } from './generated/toast-state-neutral.component';
import { ToastStateSuccessComponent } from './generated/toast-state-success.component';
import { TypographyCyrilComponent } from './generated/typography-cyril.component';
import { TypographyFallbackComponent } from './generated/typography-fallback.component';
import { TypographyGreekAndCopticComponent } from './generated/typography-greek-and-coptic.component';
import { TypographyLatinComponent } from './generated/typography-latin.component';
import { TypographyMiddleEastComponent } from './generated/typography-middle-east.component';
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
  FlyoutBasicComponent,
  FlyoutFooterComponent,
  FlyoutFooterScrollableContentComponent,
  FlyoutGridComponent,
  FlyoutHeaderComponent,
  FlyoutHeaderFooterComponent,
  FlyoutHeaderFooterScrollableContentComponent,
  FlyoutHeaderFooterScrolledComponent,
  FlyoutHeaderFooterScrolledRelativeComponent,
  FlyoutHeaderFooterSubfooterComponent,
  FlyoutHeaderFooterSubfooterPositionLeftComponent,
  FlyoutHeaderFooterSubfooterPositionStartComponent,
  FlyoutHeaderFooterSubfooterScrollableContentComponent,
  FlyoutHeaderFooterSubfooterScrolledComponent,
  FlyoutHeaderFooterSubfooterScrolledOverlapComponent,
  FlyoutHeaderFooterSubfooterSlottedAnchorComponent,
  FlyoutHeaderScrollableContentComponent,
  FlyoutMaxWidthContentComponent,
  FlyoutMaxWidthContentPositionLeftComponent,
  FlyoutMaxWidthContentPositionStartComponent,
  FlyoutNavigationComponent,
  FlyoutNavigationActiveIdentifierComponent,
  FlyoutNavigationBasicComponent,
  FlyoutNavigationPrefixedComponent,
  FlyoutNavigationScrolledComponent,
  FlyoutPositionLeftComponent,
  FlyoutPositionStartComponent,
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
  LinkTileProductComponent,
  MarqueComponent,
  ModalComponent,
  ModalBasicComponent,
  ModalDisableCloseButtonComponent,
  ModalFullscreenComponent,
  ModalFullscreenResponsiveComponent,
  ModalScrollableComponent,
  ModalSlottedHeadingComponent,
  ModalStickyFooterComponent,
  ModalStretchToFullWidthComponent,
  ModalWithoutDismissButtonComponent,
  ModalWithoutHeadingComponent,
  ModelSignatureComponent,
  MultiSelectComponent,
  OverviewComponent,
  OverviewNotificationsComponent,
  PaginationComponent,
  PinCodeComponent,
  PopoverComponent,
  RadioButtonWrapperComponent,
  ScrollerComponent,
  SegmentedControlComponent,
  SelectComponent,
  SelectWrapperComponent,
  SpinnerComponent,
  StepperHorizontalComponent,
  SwitchComponent,
  TableComponent,
  TabsComponent,
  TabsBarComponent,
  TagComponent,
  TagDismissibleComponent,
  TextComponent,
  TextareaWrapperComponent,
  TextFieldWrapperComponent,
  TextListComponent,
  ToastComponent,
  ToastBasicComponent,
  ToastMultilineComponent,
  ToastOffsetComponent,
  ToastPrefixedComponent,
  ToastStateNeutralComponent,
  ToastStateSuccessComponent,
  TypographyCyrilComponent,
  TypographyFallbackComponent,
  TypographyGreekAndCopticComponent,
  TypographyLatinComponent,
  TypographyMiddleEastComponent,
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
    name: 'Flyout Basic',
    path: 'flyout-basic',
    component: FlyoutBasicComponent,
  },
  {
    name: 'Flyout Footer',
    path: 'flyout-footer',
    component: FlyoutFooterComponent,
  },
  {
    name: 'Flyout Footer Scrollable Content',
    path: 'flyout-footer-scrollable-content',
    component: FlyoutFooterScrollableContentComponent,
  },
  {
    name: 'Flyout Grid',
    path: 'flyout-grid',
    component: FlyoutGridComponent,
  },
  {
    name: 'Flyout Header',
    path: 'flyout-header',
    component: FlyoutHeaderComponent,
  },
  {
    name: 'Flyout Header Footer',
    path: 'flyout-header-footer',
    component: FlyoutHeaderFooterComponent,
  },
  {
    name: 'Flyout Header Footer Scrollable Content',
    path: 'flyout-header-footer-scrollable-content',
    component: FlyoutHeaderFooterScrollableContentComponent,
  },
  {
    name: 'Flyout Header Footer Scrolled',
    path: 'flyout-header-footer-scrolled',
    component: FlyoutHeaderFooterScrolledComponent,
  },
  {
    name: 'Flyout Header Footer Scrolled Relative',
    path: 'flyout-header-footer-scrolled-relative',
    component: FlyoutHeaderFooterScrolledRelativeComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter',
    path: 'flyout-header-footer-subfooter',
    component: FlyoutHeaderFooterSubfooterComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Position Left',
    path: 'flyout-header-footer-subfooter-position-left',
    component: FlyoutHeaderFooterSubfooterPositionLeftComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Position Start',
    path: 'flyout-header-footer-subfooter-position-start',
    component: FlyoutHeaderFooterSubfooterPositionStartComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Scrollable Content',
    path: 'flyout-header-footer-subfooter-scrollable-content',
    component: FlyoutHeaderFooterSubfooterScrollableContentComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Scrolled',
    path: 'flyout-header-footer-subfooter-scrolled',
    component: FlyoutHeaderFooterSubfooterScrolledComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Scrolled Overlap',
    path: 'flyout-header-footer-subfooter-scrolled-overlap',
    component: FlyoutHeaderFooterSubfooterScrolledOverlapComponent,
  },
  {
    name: 'Flyout Header Footer Subfooter Slotted Anchor',
    path: 'flyout-header-footer-subfooter-slotted-anchor',
    component: FlyoutHeaderFooterSubfooterSlottedAnchorComponent,
  },
  {
    name: 'Flyout Header Scrollable Content',
    path: 'flyout-header-scrollable-content',
    component: FlyoutHeaderScrollableContentComponent,
  },
  {
    name: 'Flyout Max Width Content',
    path: 'flyout-max-width-content',
    component: FlyoutMaxWidthContentComponent,
  },
  {
    name: 'Flyout Max Width Content Position Left',
    path: 'flyout-max-width-content-position-left',
    component: FlyoutMaxWidthContentPositionLeftComponent,
  },
  {
    name: 'Flyout Max Width Content Position Start',
    path: 'flyout-max-width-content-position-start',
    component: FlyoutMaxWidthContentPositionStartComponent,
  },
  {
    name: 'Flyout Navigation',
    path: 'flyout-navigation',
    component: FlyoutNavigationComponent,
  },
  {
    name: 'Flyout Navigation Active Identifier',
    path: 'flyout-navigation-active-identifier',
    component: FlyoutNavigationActiveIdentifierComponent,
  },
  {
    name: 'Flyout Navigation Basic',
    path: 'flyout-navigation-basic',
    component: FlyoutNavigationBasicComponent,
  },
  {
    name: 'Flyout Navigation Prefixed',
    path: 'flyout-navigation-prefixed',
    component: FlyoutNavigationPrefixedComponent,
  },
  {
    name: 'Flyout Navigation Scrolled',
    path: 'flyout-navigation-scrolled',
    component: FlyoutNavigationScrolledComponent,
  },
  {
    name: 'Flyout Position Left',
    path: 'flyout-position-left',
    component: FlyoutPositionLeftComponent,
  },
  {
    name: 'Flyout Position Start',
    path: 'flyout-position-start',
    component: FlyoutPositionStartComponent,
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
    name: 'Link Tile Product',
    path: 'link-tile-product',
    component: LinkTileProductComponent,
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
    name: 'Modal Basic',
    path: 'modal-basic',
    component: ModalBasicComponent,
  },
  {
    name: 'Modal Disable Close Button',
    path: 'modal-disable-close-button',
    component: ModalDisableCloseButtonComponent,
  },
  {
    name: 'Modal Fullscreen',
    path: 'modal-fullscreen',
    component: ModalFullscreenComponent,
  },
  {
    name: 'Modal Fullscreen Responsive',
    path: 'modal-fullscreen-responsive',
    component: ModalFullscreenResponsiveComponent,
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
    name: 'Modal Sticky Footer',
    path: 'modal-sticky-footer',
    component: ModalStickyFooterComponent,
  },
  {
    name: 'Modal Stretch To Full Width',
    path: 'modal-stretch-to-full-width',
    component: ModalStretchToFullWidthComponent,
  },
  {
    name: 'Modal Without Dismiss Button',
    path: 'modal-without-dismiss-button',
    component: ModalWithoutDismissButtonComponent,
  },
  {
    name: 'Modal Without Heading',
    path: 'modal-without-heading',
    component: ModalWithoutHeadingComponent,
  },
  {
    name: 'Model Signature',
    path: 'model-signature',
    component: ModelSignatureComponent,
  },
  {
    name: 'Multi Select',
    path: 'multi-select',
    component: MultiSelectComponent,
  },
  {
    name: 'Pagination',
    path: 'pagination',
    component: PaginationComponent,
  },
  {
    name: 'Pin Code',
    path: 'pin-code',
    component: PinCodeComponent,
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
    name: 'Select',
    path: 'select',
    component: SelectComponent,
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
    name: 'Table',
    path: 'table',
    component: TableComponent,
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
    name: 'Toast',
    path: 'toast',
    component: ToastComponent,
  },
  {
    name: 'Toast Basic',
    path: 'toast-basic',
    component: ToastBasicComponent,
  },
  {
    name: 'Toast Multiline',
    path: 'toast-multiline',
    component: ToastMultilineComponent,
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
    name: 'Toast State Neutral',
    path: 'toast-state-neutral',
    component: ToastStateNeutralComponent,
  },
  {
    name: 'Toast State Success',
    path: 'toast-state-success',
    component: ToastStateSuccessComponent,
  },
  {
    name: 'Typography Cyril',
    path: 'typography-cyril',
    component: TypographyCyrilComponent,
  },
  {
    name: 'Typography Fallback',
    path: 'typography-fallback',
    component: TypographyFallbackComponent,
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
    name: 'Typography Middle East',
    path: 'typography-middle-east',
    component: TypographyMiddleEastComponent,
  },
  {
    name: 'Wordmark',
    path: 'wordmark',
    component: WordmarkComponent,
  },
];
