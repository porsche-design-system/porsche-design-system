import type { ExtendedRoute } from '../app-routing.module';
import { CoreInitializerPrefixedComponent } from './core-initializer-prefixed.component';
import { EventsComponent } from './events.component';
import { FormWrapperBindingComponent } from './form-wrapper-binding.component';
import { OptionalPropertiesComponent } from './optional-properties.component';
import { tabsBarNavigationComponents } from './tabs-bar-navigation';
import { tabsBarNavigationBugComponents } from './tabs-bar-navigation-bug';
import { ThemeInjectionComponent } from './theme-injection.component';
import { UtilitiesComponent } from './utilities.component';

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
export * from './generated/overview.component';
import { AccordionComponent } from './generated/accordion.component';
import { BannerComponent } from './generated/banner.component';
import { BannerBasicComponent } from './generated/banner-basic.component';
import { BannerErrorComponent } from './generated/banner-error.component';
import { BannerNeutralComponent } from './generated/banner-neutral.component';
import { BannerNoDismissComponent } from './generated/banner-no-dismiss.component';
import { BannerPersistentComponent } from './generated/banner-persistent.component';
import { BannerPrefixedComponent } from './generated/banner-prefixed.component';
import { BannerSlottedDescriptionHeadingComponent } from './generated/banner-slotted-description-heading.component';
import { BannerSlottedDescriptionTitleComponent } from './generated/banner-slotted-description-title.component';
import { BannerWarningComponent } from './generated/banner-warning.component';
import { ButtonComponent } from './generated/button.component';
import { ButtonGroupComponent } from './generated/button-group.component';
import { ButtonPureComponent } from './generated/button-pure.component';
import { ButtonTileComponent } from './generated/button-tile.component';
import { CanvasComponent } from './generated/canvas.component';
import { CanvasBackgroundComponent } from './generated/canvas-background.component';
import { CanvasBasicComponent } from './generated/canvas-basic.component';
import { CanvasCssVariablesComponent } from './generated/canvas-css-variables.component';
import { CanvasFooterComponent } from './generated/canvas-footer.component';
import { CanvasGridComponent } from './generated/canvas-grid.component';
import { CanvasHeaderEndComponent } from './generated/canvas-header-end.component';
import { CanvasHeaderStartComponent } from './generated/canvas-header-start.component';
import { CanvasNamedSlotsComponent } from './generated/canvas-named-slots.component';
import { CanvasScrollableComponent } from './generated/canvas-scrollable.component';
import { CanvasSidebarEndComponent } from './generated/canvas-sidebar-end.component';
import { CanvasSidebarStartComponent } from './generated/canvas-sidebar-start.component';
import { CanvasTitleComponent } from './generated/canvas-title.component';
import { CarouselComponent } from './generated/carousel.component';
import { CheckboxComponent } from './generated/checkbox.component';
import { CheckboxWrapperComponent } from './generated/checkbox-wrapper.component';
import { ContentWrapperComponent } from './generated/content-wrapper.component';
import { CoreInitializerComponent } from './generated/core-initializer.component';
import { CrestComponent } from './generated/crest.component';
import { DisplayComponent } from './generated/display.component';
import { DividerComponent } from './generated/divider.component';
import { FieldsetComponent } from './generated/fieldset.component';
import { FieldsetWrapperComponent } from './generated/fieldset-wrapper.component';
import { FlexComponent } from './generated/flex.component';
import { Flyout_1Component } from './generated/flyout-1.component';
import { Flyout_2Component } from './generated/flyout-2.component';
import { FlyoutBasicComponent } from './generated/flyout-basic.component';
import { FlyoutCssVariablesComponent } from './generated/flyout-css-variables.component';
import { FlyoutFixedFooterComponent } from './generated/flyout-fixed-footer.component';
import { FlyoutFixedFooterHeaderComponent } from './generated/flyout-fixed-footer-header.component';
import { FlyoutFixedFooterHeaderScrollableContentComponent } from './generated/flyout-fixed-footer-header-scrollable-content.component';
import { FlyoutFixedFooterHeaderSubfooterComponent } from './generated/flyout-fixed-footer-header-subfooter.component';
import { FlyoutFixedFooterHeaderSubfooterScrollableContentComponent } from './generated/flyout-fixed-footer-header-subfooter-scrollable-content.component';
import { FlyoutFixedFooterScrollableContentComponent } from './generated/flyout-fixed-footer-scrollable-content.component';
import { FlyoutFixedFooterScrollableContentScrolledComponent } from './generated/flyout-fixed-footer-scrollable-content-scrolled.component';
import { FlyoutFixedFooterSubfooterComponent } from './generated/flyout-fixed-footer-subfooter.component';
import { FlyoutFixedFooterSubfooterScrollableContentComponent } from './generated/flyout-fixed-footer-subfooter-scrollable-content.component';
import { FlyoutFixedFooterSubfooterScrollableContentScrolledComponent } from './generated/flyout-fixed-footer-subfooter-scrollable-content-scrolled.component';
import { FlyoutFooterComponent } from './generated/flyout-footer.component';
import { FlyoutFooterScrollableContentComponent } from './generated/flyout-footer-scrollable-content.component';
import { FlyoutFooterScrolledComponent } from './generated/flyout-footer-scrolled.component';
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
import { FlyoutHeaderScrollableContentComponent } from './generated/flyout-header-scrollable-content.component';
import { FlyoutMultilevelComponent } from './generated/flyout-multilevel.component';
import { FlyoutMultilevelActiveIdentifierComponent } from './generated/flyout-multilevel-active-identifier.component';
import { FlyoutMultilevelBasicComponent } from './generated/flyout-multilevel-basic.component';
import { FlyoutMultilevelDeeplyNested_1stComponent } from './generated/flyout-multilevel-deeply-nested-1st.component';
import { FlyoutMultilevelDeeplyNested_2ndComponent } from './generated/flyout-multilevel-deeply-nested-2nd.component';
import { FlyoutMultilevelDeeplyNested_3rdComponent } from './generated/flyout-multilevel-deeply-nested-3rd.component';
import { FlyoutMultilevelDeeplyNested_4thComponent } from './generated/flyout-multilevel-deeply-nested-4th.component';
import { FlyoutMultilevelDeeplyNested_5thComponent } from './generated/flyout-multilevel-deeply-nested-5th.component';
import { FlyoutMultilevelLongTextComponent } from './generated/flyout-multilevel-long-text.component';
import { FlyoutMultilevelPrefixedComponent } from './generated/flyout-multilevel-prefixed.component';
import { FlyoutMultilevelScrolledComponent } from './generated/flyout-multilevel-scrolled.component';
import { FlyoutPositionLeftComponent } from './generated/flyout-position-left.component';
import { FlyoutPositionStartComponent } from './generated/flyout-position-start.component';
import { FlyoutPrefixedComponent } from './generated/flyout-prefixed.component';
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
import { ModalBackdropBlurComponent } from './generated/modal-backdrop-blur.component';
import { ModalBackdropShadingComponent } from './generated/modal-backdrop-shading.component';
import { ModalBasicComponent } from './generated/modal-basic.component';
import { ModalCssVariablesComponent } from './generated/modal-css-variables.component';
import { ModalDisableCloseButtonComponent } from './generated/modal-disable-close-button.component';
import { ModalFooterScrolledComponent } from './generated/modal-footer-scrolled.component';
import { ModalFullscreenComponent } from './generated/modal-fullscreen.component';
import { ModalFullscreenResponsiveComponent } from './generated/modal-fullscreen-responsive.component';
import { ModalGridComponent } from './generated/modal-grid.component';
import { ModalPrefixedComponent } from './generated/modal-prefixed.component';
import { ModalScrollableComponent } from './generated/modal-scrollable.component';
import { ModalSlottedHeaderComponent } from './generated/modal-slotted-header.component';
import { ModalSlottedHeadingComponent } from './generated/modal-slotted-heading.component';
import { ModalStickyFooterComponent } from './generated/modal-sticky-footer.component';
import { ModalStretchToFullWidthComponent } from './generated/modal-stretch-to-full-width.component';
import { ModalWithoutDismissButtonComponent } from './generated/modal-without-dismiss-button.component';
import { ModalWithoutHeadingComponent } from './generated/modal-without-heading.component';
import { ModelSignatureComponent } from './generated/model-signature.component';
import { MultiSelectComponent } from './generated/multi-select.component';
import { OverviewComponent } from './generated/overview.component';
import { PaginationComponent } from './generated/pagination.component';
import { PinCodeComponent } from './generated/pin-code.component';
import { PopoverComponent } from './generated/popover.component';
import { PopoverBasicComponent } from './generated/popover-basic.component';
import { PopoverBottomComponent } from './generated/popover-bottom.component';
import { PopoverEdgeCaseComponent } from './generated/popover-edge-case.component';
import { PopoverLeftComponent } from './generated/popover-left.component';
import { PopoverRightComponent } from './generated/popover-right.component';
import { PopoverScrolledComponent } from './generated/popover-scrolled.component';
import { PopoverTopComponent } from './generated/popover-top.component';
import { RadioButtonWrapperComponent } from './generated/radio-button-wrapper.component';
import { ScrollerComponent } from './generated/scroller.component';
import { SegmentedControlComponent } from './generated/segmented-control.component';
import { SelectComponent } from './generated/select.component';
import { SelectWrapperComponent } from './generated/select-wrapper.component';
import { SheetComponent } from './generated/sheet.component';
import { SheetBasicComponent } from './generated/sheet-basic.component';
import { SheetGridComponent } from './generated/sheet-grid.component';
import { SheetPrefixedComponent } from './generated/sheet-prefixed.component';
import { SheetScrollableComponent } from './generated/sheet-scrollable.component';
import { SheetScrolledComponent } from './generated/sheet-scrolled.component';
import { SheetWithoutDismissButtonComponent } from './generated/sheet-without-dismiss-button.component';
import { SheetWithoutHeadingComponent } from './generated/sheet-without-heading.component';
import { SpinnerComponent } from './generated/spinner.component';
import { StepperHorizontalComponent } from './generated/stepper-horizontal.component';
import { SwitchComponent } from './generated/switch.component';
import { TableComponent } from './generated/table.component';
import { TabsComponent } from './generated/tabs.component';
import { TabsBarComponent } from './generated/tabs-bar.component';
import { TagComponent } from './generated/tag.component';
import { TagDismissibleComponent } from './generated/tag-dismissible.component';
import { TextComponent } from './generated/text.component';
import { TextareaComponent } from './generated/textarea.component';
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
import { TypographyGreekCopticComponent } from './generated/typography-greek-coptic.component';
import { TypographyLatinComponent } from './generated/typography-latin.component';
import { TypographyMiddleEastComponent } from './generated/typography-middle-east.component';
import { TypographyThaiComponent } from './generated/typography-thai.component';
import { WordmarkComponent } from './generated/wordmark.component';

export const generatedPages = [
  AccordionComponent,
  BannerComponent,
  BannerBasicComponent,
  BannerErrorComponent,
  BannerNeutralComponent,
  BannerNoDismissComponent,
  BannerPersistentComponent,
  BannerPrefixedComponent,
  BannerSlottedDescriptionHeadingComponent,
  BannerSlottedDescriptionTitleComponent,
  BannerWarningComponent,
  ButtonComponent,
  ButtonGroupComponent,
  ButtonPureComponent,
  ButtonTileComponent,
  CanvasComponent,
  CanvasBackgroundComponent,
  CanvasBasicComponent,
  CanvasCssVariablesComponent,
  CanvasFooterComponent,
  CanvasGridComponent,
  CanvasHeaderEndComponent,
  CanvasHeaderStartComponent,
  CanvasNamedSlotsComponent,
  CanvasScrollableComponent,
  CanvasSidebarEndComponent,
  CanvasSidebarStartComponent,
  CanvasTitleComponent,
  CarouselComponent,
  CheckboxComponent,
  CheckboxWrapperComponent,
  ContentWrapperComponent,
  CoreInitializerComponent,
  CrestComponent,
  DisplayComponent,
  DividerComponent,
  FieldsetComponent,
  FieldsetWrapperComponent,
  FlexComponent,
  Flyout_1Component,
  Flyout_2Component,
  FlyoutBasicComponent,
  FlyoutCssVariablesComponent,
  FlyoutFixedFooterComponent,
  FlyoutFixedFooterHeaderComponent,
  FlyoutFixedFooterHeaderScrollableContentComponent,
  FlyoutFixedFooterHeaderSubfooterComponent,
  FlyoutFixedFooterHeaderSubfooterScrollableContentComponent,
  FlyoutFixedFooterScrollableContentComponent,
  FlyoutFixedFooterScrollableContentScrolledComponent,
  FlyoutFixedFooterSubfooterComponent,
  FlyoutFixedFooterSubfooterScrollableContentComponent,
  FlyoutFixedFooterSubfooterScrollableContentScrolledComponent,
  FlyoutFooterComponent,
  FlyoutFooterScrollableContentComponent,
  FlyoutFooterScrolledComponent,
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
  FlyoutHeaderScrollableContentComponent,
  FlyoutMultilevelComponent,
  FlyoutMultilevelActiveIdentifierComponent,
  FlyoutMultilevelBasicComponent,
  FlyoutMultilevelDeeplyNested_1stComponent,
  FlyoutMultilevelDeeplyNested_2ndComponent,
  FlyoutMultilevelDeeplyNested_3rdComponent,
  FlyoutMultilevelDeeplyNested_4thComponent,
  FlyoutMultilevelDeeplyNested_5thComponent,
  FlyoutMultilevelLongTextComponent,
  FlyoutMultilevelPrefixedComponent,
  FlyoutMultilevelScrolledComponent,
  FlyoutPositionLeftComponent,
  FlyoutPositionStartComponent,
  FlyoutPrefixedComponent,
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
  ModalBackdropBlurComponent,
  ModalBackdropShadingComponent,
  ModalBasicComponent,
  ModalCssVariablesComponent,
  ModalDisableCloseButtonComponent,
  ModalFooterScrolledComponent,
  ModalFullscreenComponent,
  ModalFullscreenResponsiveComponent,
  ModalGridComponent,
  ModalPrefixedComponent,
  ModalScrollableComponent,
  ModalSlottedHeaderComponent,
  ModalSlottedHeadingComponent,
  ModalStickyFooterComponent,
  ModalStretchToFullWidthComponent,
  ModalWithoutDismissButtonComponent,
  ModalWithoutHeadingComponent,
  ModelSignatureComponent,
  MultiSelectComponent,
  OverviewComponent,
  PaginationComponent,
  PinCodeComponent,
  PopoverComponent,
  PopoverBasicComponent,
  PopoverBottomComponent,
  PopoverEdgeCaseComponent,
  PopoverLeftComponent,
  PopoverRightComponent,
  PopoverScrolledComponent,
  PopoverTopComponent,
  RadioButtonWrapperComponent,
  ScrollerComponent,
  SegmentedControlComponent,
  SelectComponent,
  SelectWrapperComponent,
  SheetComponent,
  SheetBasicComponent,
  SheetGridComponent,
  SheetPrefixedComponent,
  SheetScrollableComponent,
  SheetScrolledComponent,
  SheetWithoutDismissButtonComponent,
  SheetWithoutHeadingComponent,
  SpinnerComponent,
  StepperHorizontalComponent,
  SwitchComponent,
  TableComponent,
  TabsComponent,
  TabsBarComponent,
  TagComponent,
  TagDismissibleComponent,
  TextComponent,
  TextareaComponent,
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
  TypographyGreekCopticComponent,
  TypographyLatinComponent,
  TypographyMiddleEastComponent,
  TypographyThaiComponent,
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
    name: 'Banner Basic',
    path: 'banner-basic',
    component: BannerBasicComponent,
  },
  {
    name: 'Banner Error',
    path: 'banner-error',
    component: BannerErrorComponent,
  },
  {
    name: 'Banner Neutral',
    path: 'banner-neutral',
    component: BannerNeutralComponent,
  },
  {
    name: 'Banner No Dismiss',
    path: 'banner-no-dismiss',
    component: BannerNoDismissComponent,
  },
  {
    name: 'Banner Persistent',
    path: 'banner-persistent',
    component: BannerPersistentComponent,
  },
  {
    name: 'Banner Prefixed',
    path: 'banner-prefixed',
    component: BannerPrefixedComponent,
  },
  {
    name: 'Banner Slotted Description Heading',
    path: 'banner-slotted-description-heading',
    component: BannerSlottedDescriptionHeadingComponent,
  },
  {
    name: 'Banner Slotted Description Title',
    path: 'banner-slotted-description-title',
    component: BannerSlottedDescriptionTitleComponent,
  },
  {
    name: 'Banner Warning',
    path: 'banner-warning',
    component: BannerWarningComponent,
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
    name: 'Canvas',
    path: 'canvas',
    component: CanvasComponent,
  },
  {
    name: 'Canvas Background',
    path: 'canvas-background',
    component: CanvasBackgroundComponent,
  },
  {
    name: 'Canvas Basic',
    path: 'canvas-basic',
    component: CanvasBasicComponent,
  },
  {
    name: 'Canvas Css Variables',
    path: 'canvas-css-variables',
    component: CanvasCssVariablesComponent,
  },
  {
    name: 'Canvas Footer',
    path: 'canvas-footer',
    component: CanvasFooterComponent,
  },
  {
    name: 'Canvas Grid',
    path: 'canvas-grid',
    component: CanvasGridComponent,
  },
  {
    name: 'Canvas Header End',
    path: 'canvas-header-end',
    component: CanvasHeaderEndComponent,
  },
  {
    name: 'Canvas Header Start',
    path: 'canvas-header-start',
    component: CanvasHeaderStartComponent,
  },
  {
    name: 'Canvas Named Slots',
    path: 'canvas-named-slots',
    component: CanvasNamedSlotsComponent,
  },
  {
    name: 'Canvas Scrollable',
    path: 'canvas-scrollable',
    component: CanvasScrollableComponent,
  },
  {
    name: 'Canvas Sidebar End',
    path: 'canvas-sidebar-end',
    component: CanvasSidebarEndComponent,
  },
  {
    name: 'Canvas Sidebar Start',
    path: 'canvas-sidebar-start',
    component: CanvasSidebarStartComponent,
  },
  {
    name: 'Canvas Title',
    path: 'canvas-title',
    component: CanvasTitleComponent,
  },
  {
    name: 'Carousel',
    path: 'carousel',
    component: CarouselComponent,
  },
  {
    name: 'Checkbox',
    path: 'checkbox',
    component: CheckboxComponent,
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
    name: 'Flyout 1',
    path: 'flyout-1',
    component: Flyout_1Component,
  },
  {
    name: 'Flyout 2',
    path: 'flyout-2',
    component: Flyout_2Component,
  },
  {
    name: 'Flyout Basic',
    path: 'flyout-basic',
    component: FlyoutBasicComponent,
  },
  {
    name: 'Flyout Css Variables',
    path: 'flyout-css-variables',
    component: FlyoutCssVariablesComponent,
  },
  {
    name: 'Flyout Fixed Footer',
    path: 'flyout-fixed-footer',
    component: FlyoutFixedFooterComponent,
  },
  {
    name: 'Flyout Fixed Footer Header',
    path: 'flyout-fixed-footer-header',
    component: FlyoutFixedFooterHeaderComponent,
  },
  {
    name: 'Flyout Fixed Footer Header Scrollable Content',
    path: 'flyout-fixed-footer-header-scrollable-content',
    component: FlyoutFixedFooterHeaderScrollableContentComponent,
  },
  {
    name: 'Flyout Fixed Footer Header Subfooter',
    path: 'flyout-fixed-footer-header-subfooter',
    component: FlyoutFixedFooterHeaderSubfooterComponent,
  },
  {
    name: 'Flyout Fixed Footer Header Subfooter Scrollable Content',
    path: 'flyout-fixed-footer-header-subfooter-scrollable-content',
    component: FlyoutFixedFooterHeaderSubfooterScrollableContentComponent,
  },
  {
    name: 'Flyout Fixed Footer Scrollable Content',
    path: 'flyout-fixed-footer-scrollable-content',
    component: FlyoutFixedFooterScrollableContentComponent,
  },
  {
    name: 'Flyout Fixed Footer Scrollable Content Scrolled',
    path: 'flyout-fixed-footer-scrollable-content-scrolled',
    component: FlyoutFixedFooterScrollableContentScrolledComponent,
  },
  {
    name: 'Flyout Fixed Footer Subfooter',
    path: 'flyout-fixed-footer-subfooter',
    component: FlyoutFixedFooterSubfooterComponent,
  },
  {
    name: 'Flyout Fixed Footer Subfooter Scrollable Content',
    path: 'flyout-fixed-footer-subfooter-scrollable-content',
    component: FlyoutFixedFooterSubfooterScrollableContentComponent,
  },
  {
    name: 'Flyout Fixed Footer Subfooter Scrollable Content Scrolled',
    path: 'flyout-fixed-footer-subfooter-scrollable-content-scrolled',
    component: FlyoutFixedFooterSubfooterScrollableContentScrolledComponent,
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
    name: 'Flyout Footer Scrolled',
    path: 'flyout-footer-scrolled',
    component: FlyoutFooterScrolledComponent,
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
    name: 'Flyout Header Scrollable Content',
    path: 'flyout-header-scrollable-content',
    component: FlyoutHeaderScrollableContentComponent,
  },
  {
    name: 'Flyout Multilevel',
    path: 'flyout-multilevel',
    component: FlyoutMultilevelComponent,
  },
  {
    name: 'Flyout Multilevel Active Identifier',
    path: 'flyout-multilevel-active-identifier',
    component: FlyoutMultilevelActiveIdentifierComponent,
  },
  {
    name: 'Flyout Multilevel Basic',
    path: 'flyout-multilevel-basic',
    component: FlyoutMultilevelBasicComponent,
  },
  {
    name: 'Flyout Multilevel Deeply Nested 1st',
    path: 'flyout-multilevel-deeply-nested-1st',
    component: FlyoutMultilevelDeeplyNested_1stComponent,
  },
  {
    name: 'Flyout Multilevel Deeply Nested 2nd',
    path: 'flyout-multilevel-deeply-nested-2nd',
    component: FlyoutMultilevelDeeplyNested_2ndComponent,
  },
  {
    name: 'Flyout Multilevel Deeply Nested 3rd',
    path: 'flyout-multilevel-deeply-nested-3rd',
    component: FlyoutMultilevelDeeplyNested_3rdComponent,
  },
  {
    name: 'Flyout Multilevel Deeply Nested 4th',
    path: 'flyout-multilevel-deeply-nested-4th',
    component: FlyoutMultilevelDeeplyNested_4thComponent,
  },
  {
    name: 'Flyout Multilevel Deeply Nested 5th',
    path: 'flyout-multilevel-deeply-nested-5th',
    component: FlyoutMultilevelDeeplyNested_5thComponent,
  },
  {
    name: 'Flyout Multilevel Long Text',
    path: 'flyout-multilevel-long-text',
    component: FlyoutMultilevelLongTextComponent,
  },
  {
    name: 'Flyout Multilevel Prefixed',
    path: 'flyout-multilevel-prefixed',
    component: FlyoutMultilevelPrefixedComponent,
  },
  {
    name: 'Flyout Multilevel Scrolled',
    path: 'flyout-multilevel-scrolled',
    component: FlyoutMultilevelScrolledComponent,
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
    name: 'Flyout Prefixed',
    path: 'flyout-prefixed',
    component: FlyoutPrefixedComponent,
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
    name: 'Modal Backdrop Blur',
    path: 'modal-backdrop-blur',
    component: ModalBackdropBlurComponent,
  },
  {
    name: 'Modal Backdrop Shading',
    path: 'modal-backdrop-shading',
    component: ModalBackdropShadingComponent,
  },
  {
    name: 'Modal Basic',
    path: 'modal-basic',
    component: ModalBasicComponent,
  },
  {
    name: 'Modal Css Variables',
    path: 'modal-css-variables',
    component: ModalCssVariablesComponent,
  },
  {
    name: 'Modal Disable Close Button',
    path: 'modal-disable-close-button',
    component: ModalDisableCloseButtonComponent,
  },
  {
    name: 'Modal Footer Scrolled',
    path: 'modal-footer-scrolled',
    component: ModalFooterScrolledComponent,
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
    name: 'Modal Grid',
    path: 'modal-grid',
    component: ModalGridComponent,
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
    name: 'Modal Slotted Header',
    path: 'modal-slotted-header',
    component: ModalSlottedHeaderComponent,
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
    name: 'Popover Basic',
    path: 'popover-basic',
    component: PopoverBasicComponent,
  },
  {
    name: 'Popover Bottom',
    path: 'popover-bottom',
    component: PopoverBottomComponent,
  },
  {
    name: 'Popover Edge Case',
    path: 'popover-edge-case',
    component: PopoverEdgeCaseComponent,
  },
  {
    name: 'Popover Left',
    path: 'popover-left',
    component: PopoverLeftComponent,
  },
  {
    name: 'Popover Right',
    path: 'popover-right',
    component: PopoverRightComponent,
  },
  {
    name: 'Popover Scrolled',
    path: 'popover-scrolled',
    component: PopoverScrolledComponent,
  },
  {
    name: 'Popover Top',
    path: 'popover-top',
    component: PopoverTopComponent,
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
    name: 'Sheet',
    path: 'sheet',
    component: SheetComponent,
  },
  {
    name: 'Sheet Basic',
    path: 'sheet-basic',
    component: SheetBasicComponent,
  },
  {
    name: 'Sheet Grid',
    path: 'sheet-grid',
    component: SheetGridComponent,
  },
  {
    name: 'Sheet Prefixed',
    path: 'sheet-prefixed',
    component: SheetPrefixedComponent,
  },
  {
    name: 'Sheet Scrollable',
    path: 'sheet-scrollable',
    component: SheetScrollableComponent,
  },
  {
    name: 'Sheet Scrolled',
    path: 'sheet-scrolled',
    component: SheetScrolledComponent,
  },
  {
    name: 'Sheet Without Dismiss Button',
    path: 'sheet-without-dismiss-button',
    component: SheetWithoutDismissButtonComponent,
  },
  {
    name: 'Sheet Without Heading',
    path: 'sheet-without-heading',
    component: SheetWithoutHeadingComponent,
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
    name: 'Textarea',
    path: 'textarea',
    component: TextareaComponent,
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
    name: 'Typography Greek Coptic',
    path: 'typography-greek-coptic',
    component: TypographyGreekCopticComponent,
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
    name: 'Typography Thai',
    path: 'typography-thai',
    component: TypographyThaiComponent,
  },
  {
    name: 'Wordmark',
    path: 'wordmark',
    component: WordmarkComponent,
  },
];
