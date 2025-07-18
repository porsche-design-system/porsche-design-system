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
import { DrilldownComponent } from './generated/drilldown.component';
import { DrilldownActiveIdentifierComponent } from './generated/drilldown-active-identifier.component';
import { DrilldownBasicComponent } from './generated/drilldown-basic.component';
import { DrilldownCssVariables_1Component } from './generated/drilldown-css-variables-1.component';
import { DrilldownCssVariables_2Component } from './generated/drilldown-css-variables-2.component';
import { DrilldownCssVariables_3Component } from './generated/drilldown-css-variables-3.component';
import { DrilldownCssVariables_4Component } from './generated/drilldown-css-variables-4.component';
import { DrilldownCssVariables_5Component } from './generated/drilldown-css-variables-5.component';
import { DrilldownDeeplyNested_1stComponent } from './generated/drilldown-deeply-nested-1st.component';
import { DrilldownDeeplyNested_2ndComponent } from './generated/drilldown-deeply-nested-2nd.component';
import { DrilldownDeeplyNested_3rdComponent } from './generated/drilldown-deeply-nested-3rd.component';
import { DrilldownDeeplyNested_4thComponent } from './generated/drilldown-deeply-nested-4th.component';
import { DrilldownDeeplyNested_5thComponent } from './generated/drilldown-deeply-nested-5th.component';
import { DrilldownLongTextComponent } from './generated/drilldown-long-text.component';
import { DrilldownPrefixedComponent } from './generated/drilldown-prefixed.component';
import { DrilldownScrolledComponent } from './generated/drilldown-scrolled.component';
import { DrilldownSlottedButtonHeaderComponent } from './generated/drilldown-slotted-button-header.component';
import { FieldsetComponent } from './generated/fieldset.component';
import { FieldsetWrapperComponent } from './generated/fieldset-wrapper.component';
import { FlexComponent } from './generated/flex.component';
import { Flyout_1Component } from './generated/flyout-1.component';
import { Flyout_2Component } from './generated/flyout-2.component';
import { FlyoutBasicComponent } from './generated/flyout-basic.component';
import { FlyoutCssVariables_1Component } from './generated/flyout-css-variables-1.component';
import { FlyoutCssVariables_2Component } from './generated/flyout-css-variables-2.component';
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
import { FlyoutPositionLeftComponent } from './generated/flyout-position-left.component';
import { FlyoutPositionStartComponent } from './generated/flyout-position-start.component';
import { FlyoutPrefixedComponent } from './generated/flyout-prefixed.component';
import { GridComponent } from './generated/grid.component';
import { HeadingComponent } from './generated/heading.component';
import { HeadlineComponent } from './generated/headline.component';
import { IconComponent } from './generated/icon.component';
import { InlineNotificationComponent } from './generated/inline-notification.component';
import { InputNumberComponent } from './generated/input-number.component';
import { InputPasswordComponent } from './generated/input-password.component';
import { InputSearchComponent } from './generated/input-search.component';
import { InputTextComponent } from './generated/input-text.component';
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
import { MultiSelectOpenedBottomComponent } from './generated/multi-select-opened-bottom.component';
import { MultiSelectOpenedMaxHeightComponent } from './generated/multi-select-opened-max-height.component';
import { MultiSelectOpenedMinHeightComponent } from './generated/multi-select-opened-min-height.component';
import { MultiSelectOpenedScrollContextComponent } from './generated/multi-select-opened-scroll-context.component';
import { MultiSelectOpenedTopComponent } from './generated/multi-select-opened-top.component';
import { MultiSelectOpenedWithAndWithoutOptgroupsComponent } from './generated/multi-select-opened-with-and-without-optgroups.component';
import { MultiSelectOpenedWithDisabledHighlightedSelectedComponent } from './generated/multi-select-opened-with-disabled-highlighted-selected.component';
import { MultiSelectOpenedWithFilterButNoResultsComponent } from './generated/multi-select-opened-with-filter-but-no-results.component';
import { MultiSelectOpenedWithMultipleSelectedOptionsComponent } from './generated/multi-select-opened-with-multiple-selected-options.component';
import { MultiSelectOpenedWithOptgroupsComponent } from './generated/multi-select-opened-with-optgroups.component';
import { MultiSelectOpenedWithOptgroupsDisabledComponent } from './generated/multi-select-opened-with-optgroups-disabled.component';
import { OverviewComponent } from './generated/overview.component';
import { PaginationComponent } from './generated/pagination.component';
import { PinCodeComponent } from './generated/pin-code.component';
import { PopoverComponent } from './generated/popover.component';
import { PopoverBasicComponent } from './generated/popover-basic.component';
import { PopoverBasicSlottedComponent } from './generated/popover-basic-slotted.component';
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
import { SelectCompactComponent } from './generated/select-compact.component';
import { SelectOpenedBottomComponent } from './generated/select-opened-bottom.component';
import { SelectOpenedFilterComponent } from './generated/select-opened-filter.component';
import { SelectOpenedFilterNoResultsComponent } from './generated/select-opened-filter-no-results.component';
import { SelectOpenedFilterNoResultsCompactComponent } from './generated/select-opened-filter-no-results-compact.component';
import { SelectOpenedMaxHeightComponent } from './generated/select-opened-max-height.component';
import { SelectOpenedMinHeightComponent } from './generated/select-opened-min-height.component';
import { SelectOpenedScrollContextComponent } from './generated/select-opened-scroll-context.component';
import { SelectOpenedTopComponent } from './generated/select-opened-top.component';
import { SelectOpenedWithAndWithoutOptgroupsComponent } from './generated/select-opened-with-and-without-optgroups.component';
import { SelectOpenedWithDisabledHighlightedSelectedComponent } from './generated/select-opened-with-disabled-highlighted-selected.component';
import { SelectOpenedWithOptgroupsComponent } from './generated/select-opened-with-optgroups.component';
import { SelectOpenedWithOptgroupsDisabledComponent } from './generated/select-opened-with-optgroups-disabled.component';
import { SelectOpenedWithSelectedEmptyOptionComponent } from './generated/select-opened-with-selected-empty-option.component';
import { SelectOpenedWithSlottedImagesComponent } from './generated/select-opened-with-slotted-images.component';
import { SelectScaling_0Component } from './generated/select-scaling-0.component';
import { SelectScaling_0_5Component } from './generated/select-scaling-0-5.component';
import { SelectScaling_0_8Component } from './generated/select-scaling-0-8.component';
import { SelectScaling_1Component } from './generated/select-scaling-1.component';
import { SelectScaling_2Component } from './generated/select-scaling-2.component';
import { SelectWrapperComponent } from './generated/select-wrapper.component';
import { SelectWrapperOpenedScrollContextComponent } from './generated/select-wrapper-opened-scroll-context.component';
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
  DrilldownComponent,
  DrilldownActiveIdentifierComponent,
  DrilldownBasicComponent,
  DrilldownCssVariables_1Component,
  DrilldownCssVariables_2Component,
  DrilldownCssVariables_3Component,
  DrilldownCssVariables_4Component,
  DrilldownCssVariables_5Component,
  DrilldownDeeplyNested_1stComponent,
  DrilldownDeeplyNested_2ndComponent,
  DrilldownDeeplyNested_3rdComponent,
  DrilldownDeeplyNested_4thComponent,
  DrilldownDeeplyNested_5thComponent,
  DrilldownLongTextComponent,
  DrilldownPrefixedComponent,
  DrilldownScrolledComponent,
  DrilldownSlottedButtonHeaderComponent,
  FieldsetComponent,
  FieldsetWrapperComponent,
  FlexComponent,
  Flyout_1Component,
  Flyout_2Component,
  FlyoutBasicComponent,
  FlyoutCssVariables_1Component,
  FlyoutCssVariables_2Component,
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
  FlyoutPositionLeftComponent,
  FlyoutPositionStartComponent,
  FlyoutPrefixedComponent,
  GridComponent,
  HeadingComponent,
  HeadlineComponent,
  IconComponent,
  InlineNotificationComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputSearchComponent,
  InputTextComponent,
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
  MultiSelectOpenedBottomComponent,
  MultiSelectOpenedMaxHeightComponent,
  MultiSelectOpenedMinHeightComponent,
  MultiSelectOpenedScrollContextComponent,
  MultiSelectOpenedTopComponent,
  MultiSelectOpenedWithAndWithoutOptgroupsComponent,
  MultiSelectOpenedWithDisabledHighlightedSelectedComponent,
  MultiSelectOpenedWithFilterButNoResultsComponent,
  MultiSelectOpenedWithMultipleSelectedOptionsComponent,
  MultiSelectOpenedWithOptgroupsComponent,
  MultiSelectOpenedWithOptgroupsDisabledComponent,
  OverviewComponent,
  PaginationComponent,
  PinCodeComponent,
  PopoverComponent,
  PopoverBasicComponent,
  PopoverBasicSlottedComponent,
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
  SelectCompactComponent,
  SelectOpenedBottomComponent,
  SelectOpenedFilterComponent,
  SelectOpenedFilterNoResultsComponent,
  SelectOpenedFilterNoResultsCompactComponent,
  SelectOpenedMaxHeightComponent,
  SelectOpenedMinHeightComponent,
  SelectOpenedScrollContextComponent,
  SelectOpenedTopComponent,
  SelectOpenedWithAndWithoutOptgroupsComponent,
  SelectOpenedWithDisabledHighlightedSelectedComponent,
  SelectOpenedWithOptgroupsComponent,
  SelectOpenedWithOptgroupsDisabledComponent,
  SelectOpenedWithSelectedEmptyOptionComponent,
  SelectOpenedWithSlottedImagesComponent,
  SelectScaling_0Component,
  SelectScaling_0_5Component,
  SelectScaling_0_8Component,
  SelectScaling_1Component,
  SelectScaling_2Component,
  SelectWrapperComponent,
  SelectWrapperOpenedScrollContextComponent,
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
    name: 'Drilldown',
    path: 'drilldown',
    component: DrilldownComponent,
  },
  {
    name: 'Drilldown Active Identifier',
    path: 'drilldown-active-identifier',
    component: DrilldownActiveIdentifierComponent,
  },
  {
    name: 'Drilldown Basic',
    path: 'drilldown-basic',
    component: DrilldownBasicComponent,
  },
  {
    name: 'Drilldown Css Variables 1',
    path: 'drilldown-css-variables-1',
    component: DrilldownCssVariables_1Component,
  },
  {
    name: 'Drilldown Css Variables 2',
    path: 'drilldown-css-variables-2',
    component: DrilldownCssVariables_2Component,
  },
  {
    name: 'Drilldown Css Variables 3',
    path: 'drilldown-css-variables-3',
    component: DrilldownCssVariables_3Component,
  },
  {
    name: 'Drilldown Css Variables 4',
    path: 'drilldown-css-variables-4',
    component: DrilldownCssVariables_4Component,
  },
  {
    name: 'Drilldown Css Variables 5',
    path: 'drilldown-css-variables-5',
    component: DrilldownCssVariables_5Component,
  },
  {
    name: 'Drilldown Deeply Nested 1st',
    path: 'drilldown-deeply-nested-1st',
    component: DrilldownDeeplyNested_1stComponent,
  },
  {
    name: 'Drilldown Deeply Nested 2nd',
    path: 'drilldown-deeply-nested-2nd',
    component: DrilldownDeeplyNested_2ndComponent,
  },
  {
    name: 'Drilldown Deeply Nested 3rd',
    path: 'drilldown-deeply-nested-3rd',
    component: DrilldownDeeplyNested_3rdComponent,
  },
  {
    name: 'Drilldown Deeply Nested 4th',
    path: 'drilldown-deeply-nested-4th',
    component: DrilldownDeeplyNested_4thComponent,
  },
  {
    name: 'Drilldown Deeply Nested 5th',
    path: 'drilldown-deeply-nested-5th',
    component: DrilldownDeeplyNested_5thComponent,
  },
  {
    name: 'Drilldown Long Text',
    path: 'drilldown-long-text',
    component: DrilldownLongTextComponent,
  },
  {
    name: 'Drilldown Prefixed',
    path: 'drilldown-prefixed',
    component: DrilldownPrefixedComponent,
  },
  {
    name: 'Drilldown Scrolled',
    path: 'drilldown-scrolled',
    component: DrilldownScrolledComponent,
  },
  {
    name: 'Drilldown Slotted Button Header',
    path: 'drilldown-slotted-button-header',
    component: DrilldownSlottedButtonHeaderComponent,
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
    name: 'Flyout Css Variables 1',
    path: 'flyout-css-variables-1',
    component: FlyoutCssVariables_1Component,
  },
  {
    name: 'Flyout Css Variables 2',
    path: 'flyout-css-variables-2',
    component: FlyoutCssVariables_2Component,
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
    name: 'Input Number',
    path: 'input-number',
    component: InputNumberComponent,
  },
  {
    name: 'Input Password',
    path: 'input-password',
    component: InputPasswordComponent,
  },
  {
    name: 'Input Search',
    path: 'input-search',
    component: InputSearchComponent,
  },
  {
    name: 'Input Text',
    path: 'input-text',
    component: InputTextComponent,
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
    name: 'Multi Select Opened Bottom',
    path: 'multi-select-opened-bottom',
    component: MultiSelectOpenedBottomComponent,
  },
  {
    name: 'Multi Select Opened Max Height',
    path: 'multi-select-opened-max-height',
    component: MultiSelectOpenedMaxHeightComponent,
  },
  {
    name: 'Multi Select Opened Min Height',
    path: 'multi-select-opened-min-height',
    component: MultiSelectOpenedMinHeightComponent,
  },
  {
    name: 'Multi Select Opened Scroll Context',
    path: 'multi-select-opened-scroll-context',
    component: MultiSelectOpenedScrollContextComponent,
  },
  {
    name: 'Multi Select Opened Top',
    path: 'multi-select-opened-top',
    component: MultiSelectOpenedTopComponent,
  },
  {
    name: 'Multi Select Opened With And Without Optgroups',
    path: 'multi-select-opened-with-and-without-optgroups',
    component: MultiSelectOpenedWithAndWithoutOptgroupsComponent,
  },
  {
    name: 'Multi Select Opened With Disabled Highlighted Selected',
    path: 'multi-select-opened-with-disabled-highlighted-selected',
    component: MultiSelectOpenedWithDisabledHighlightedSelectedComponent,
  },
  {
    name: 'Multi Select Opened With Filter But No Results',
    path: 'multi-select-opened-with-filter-but-no-results',
    component: MultiSelectOpenedWithFilterButNoResultsComponent,
  },
  {
    name: 'Multi Select Opened With Multiple Selected Options',
    path: 'multi-select-opened-with-multiple-selected-options',
    component: MultiSelectOpenedWithMultipleSelectedOptionsComponent,
  },
  {
    name: 'Multi Select Opened With Optgroups',
    path: 'multi-select-opened-with-optgroups',
    component: MultiSelectOpenedWithOptgroupsComponent,
  },
  {
    name: 'Multi Select Opened With Optgroups Disabled',
    path: 'multi-select-opened-with-optgroups-disabled',
    component: MultiSelectOpenedWithOptgroupsDisabledComponent,
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
    name: 'Popover Basic Slotted',
    path: 'popover-basic-slotted',
    component: PopoverBasicSlottedComponent,
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
    name: 'Select Compact',
    path: 'select-compact',
    component: SelectCompactComponent,
  },
  {
    name: 'Select Opened Bottom',
    path: 'select-opened-bottom',
    component: SelectOpenedBottomComponent,
  },
  {
    name: 'Select Opened Filter',
    path: 'select-opened-filter',
    component: SelectOpenedFilterComponent,
  },
  {
    name: 'Select Opened Filter No Results',
    path: 'select-opened-filter-no-results',
    component: SelectOpenedFilterNoResultsComponent,
  },
  {
    name: 'Select Opened Filter No Results Compact',
    path: 'select-opened-filter-no-results-compact',
    component: SelectOpenedFilterNoResultsCompactComponent,
  },
  {
    name: 'Select Opened Max Height',
    path: 'select-opened-max-height',
    component: SelectOpenedMaxHeightComponent,
  },
  {
    name: 'Select Opened Min Height',
    path: 'select-opened-min-height',
    component: SelectOpenedMinHeightComponent,
  },
  {
    name: 'Select Opened Scroll Context',
    path: 'select-opened-scroll-context',
    component: SelectOpenedScrollContextComponent,
  },
  {
    name: 'Select Opened Top',
    path: 'select-opened-top',
    component: SelectOpenedTopComponent,
  },
  {
    name: 'Select Opened With And Without Optgroups',
    path: 'select-opened-with-and-without-optgroups',
    component: SelectOpenedWithAndWithoutOptgroupsComponent,
  },
  {
    name: 'Select Opened With Disabled Highlighted Selected',
    path: 'select-opened-with-disabled-highlighted-selected',
    component: SelectOpenedWithDisabledHighlightedSelectedComponent,
  },
  {
    name: 'Select Opened With Optgroups',
    path: 'select-opened-with-optgroups',
    component: SelectOpenedWithOptgroupsComponent,
  },
  {
    name: 'Select Opened With Optgroups Disabled',
    path: 'select-opened-with-optgroups-disabled',
    component: SelectOpenedWithOptgroupsDisabledComponent,
  },
  {
    name: 'Select Opened With Selected Empty Option',
    path: 'select-opened-with-selected-empty-option',
    component: SelectOpenedWithSelectedEmptyOptionComponent,
  },
  {
    name: 'Select Opened With Slotted Images',
    path: 'select-opened-with-slotted-images',
    component: SelectOpenedWithSlottedImagesComponent,
  },
  {
    name: 'Select Scaling 0',
    path: 'select-scaling-0',
    component: SelectScaling_0Component,
  },
  {
    name: 'Select Scaling 0 5',
    path: 'select-scaling-0-5',
    component: SelectScaling_0_5Component,
  },
  {
    name: 'Select Scaling 0 8',
    path: 'select-scaling-0-8',
    component: SelectScaling_0_8Component,
  },
  {
    name: 'Select Scaling 1',
    path: 'select-scaling-1',
    component: SelectScaling_1Component,
  },
  {
    name: 'Select Scaling 2',
    path: 'select-scaling-2',
    component: SelectScaling_2Component,
  },
  {
    name: 'Select Wrapper',
    path: 'select-wrapper',
    component: SelectWrapperComponent,
  },
  {
    name: 'Select Wrapper Opened Scroll Context',
    path: 'select-wrapper-opened-scroll-context',
    component: SelectWrapperOpenedScrollContextComponent,
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
