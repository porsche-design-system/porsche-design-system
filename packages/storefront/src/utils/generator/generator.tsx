import type { StoryState } from '@/models/story';
import {
  PAccordion,
  type PAccordionProps,
  PBanner,
  type PBannerProps,
  PButton,
  PButtonGroup,
  type PButtonGroupProps,
  type PButtonProps,
  PButtonPure,
  type PButtonPureProps,
  PButtonTile,
  type PButtonTileProps,
  PCanvas,
  type PCanvasProps,
  PCarousel,
  type PCarouselProps,
  PCheckbox,
  type PCheckboxProps,
  PCheckboxWrapper,
  type PCheckboxWrapperProps,
  PContentWrapper,
  type PContentWrapperProps,
  PCrest,
  type PCrestProps,
  PDisplay,
  type PDisplayProps,
  PDivider,
  type PDividerProps,
  PFieldset,
  type PFieldsetProps,
  PFieldsetWrapper,
  type PFieldsetWrapperProps,
  PFlex,
  PFlexItem,
  type PFlexItemProps,
  type PFlexProps,
  PFlyout,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  type PFlyoutMultilevelItemProps,
  type PFlyoutMultilevelProps,
  type PFlyoutProps,
  PGrid,
  PGridItem,
  type PGridItemProps,
  type PGridProps,
  PHeading,
  type PHeadingProps,
  PHeadline,
  type PHeadlineProps,
  PIcon,
  type PIconProps,
  PInlineNotification,
  type PInlineNotificationProps,
  PLink,
  type PLinkProps,
  PLinkPure,
  type PLinkPureProps,
  PLinkSocial,
  type PLinkSocialProps,
  PLinkTile,
  PLinkTileModelSignature,
  type PLinkTileModelSignatureProps,
  PLinkTileProduct,
  type PLinkTileProductProps,
  type PLinkTileProps,
  PMarque,
  type PMarqueProps,
  PModal,
  type PModalProps,
  PModelSignature,
  type PModelSignatureProps,
  PMultiSelect,
  PMultiSelectOption,
  type PMultiSelectOptionProps,
  type PMultiSelectProps,
  POptgroup,
  type POptgroupProps,
  PPagination,
  type PPaginationProps,
  PPinCode,
  type PPinCodeProps,
  PPopover,
  type PPopoverProps,
  PRadioButtonWrapper,
  type PRadioButtonWrapperProps,
  PScroller,
  type PScrollerProps,
  PSegmentedControl,
  PSegmentedControlItem,
  type PSegmentedControlItemProps,
  type PSegmentedControlProps,
  PSelect,
  PSelectOption,
  type PSelectOptionProps,
  type PSelectProps,
  PSelectWrapper,
  type PSelectWrapperProps,
  PSheet,
  type PSheetProps,
  PSpinner,
  type PSpinnerProps,
  PStepperHorizontal,
  PStepperHorizontalItem,
  type PStepperHorizontalItemProps,
  type PStepperHorizontalProps,
  PSwitch,
  type PSwitchProps,
  PTable,
  PTableBody,
  type PTableBodyProps,
  PTableCell,
  type PTableCellProps,
  PTableHead,
  PTableHeadCell,
  type PTableHeadCellProps,
  type PTableHeadProps,
  PTableHeadRow,
  type PTableHeadRowProps,
  type PTableProps,
  PTableRow,
  type PTableRowProps,
  PTabs,
  PTabsBar,
  type PTabsBarProps,
  PTabsItem,
  type PTabsItemProps,
  type PTabsProps,
  PTag,
  PTagDismissible,
  type PTagDismissibleProps,
  type PTagProps,
  PText,
  PTextFieldWrapper,
  type PTextFieldWrapperProps,
  PTextList,
  PTextListItem,
  type PTextListItemProps,
  type PTextListProps,
  type PTextProps,
  PTextarea,
  type PTextareaProps,
  PTextareaWrapper,
  type PTextareaWrapperProps,
  PToast,
  type PToastProps,
  PWordmark,
  type PWordmarkProps,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';
import React, { type ReactNode } from 'react';

type SafePropTypeMapping = {
  [K in Exclude<TagName, 'p-toast-item' | 'p-select-wrapper-dropdown'>]: K extends keyof PropTypeMapping
    ? PropTypeMapping[K]
    : never;
};
// PDS component tags without internal/child components (p-accordion, p-banner...)
export type ConfiguratorTagNames = keyof SafePropTypeMapping;
// HTML tags (a, img, div...) or PDS component tags (p-accordion, p-banner...)
export type HTMLTagOrComponent = keyof JSX.IntrinsicElements | ConfiguratorTagNames;

export type ElementConfig<T extends HTMLTagOrComponent> = {
  /**
   * The tag name of the element, which can be an HTML element (e.g., 'div', 'button')
   * or a PDS component (e.g., 'p-button', 'p-accordion').
   */
  tag: T;
  /**
   * Properties the element will be configured with.
   * - If the tag is an HTML element, this contains standard HTML attributes.
   * - If the tag is a PDS component, this includes component-specific props.
   */
  properties?: HTMLElementOrComponentProps<T>;
  /**
   * Custom event configuration for handling user interactions.
   * Defines which events the element listens for and how they update state.
   * This is also necessary to generate the markup of the controlled states.
   */
  events?: EventsConfig<T>;
  /**
   * Optional child elements, which can be:
   * - Text content (string)
   * - Another ElementConfig object (nested component structure)
   * - Undefined (for optional children)
   */
  children?: (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

/**
 * Represents the properties of T which can be either a PDS Component or an HTML Element
 */
export type HTMLElementOrComponentProps<T extends HTMLTagOrComponent> = T extends keyof JSX.IntrinsicElements
  ? Partial<JSX.IntrinsicElements[T]>
  : T extends ConfiguratorTagNames
    ? SafePropTypeMapping[T]
    : never;

type EventProps<T> = Pick<T, Extract<keyof T, `on${string}`>>;

export type EventsConfig<T extends HTMLTagOrComponent> = {
  [eventName in keyof EventProps<HTMLElementOrComponentProps<T>>]: EventConfig;
};

/**
 * Custom event configuration for handling user interactions.
 * Defines which events the element listens for and how they update state.
 * This is also necessary to generate the markup of the controlled states.
 */
export type EventConfig = {
  /**
   * TODO: Currently not optimal since the element is only referenced through the tag
   * The tag of the element to update when the event is called
   */
  target: string;
  /**
   * The property which the value/event value will be applied to
   */
  prop: string;
  /**
   * The value to apply. This is used if the value is directly set and not part of the event callback.
   */
  value?: any;
  /**
   * The key of the event callback detail to use. E.g. if the value is stored under e.detail.open this would be 'open'.
   */
  eventValueKey?: string;
  /**
   * The type of the event callback. E.g. if (e: CustomEvent<AccordionUpdateEventDetail>) this would be CustomEvent<AccordionUpdateEventDetail>
   */
  eventType?: string;
  /**
   * Can be used to negate the value which will be applied. E.g. (e) => (e.target.liked = !e.detail.liked)
   */
  negateValue?: boolean;
};

export type PropTypeMapping = {
  'p-accordion': PAccordionProps;
  'p-banner': PBannerProps;
  'p-button': PButtonProps;
  'p-button-group': PButtonGroupProps;
  'p-button-pure': PButtonPureProps;
  'p-button-tile': PButtonTileProps;
  'p-canvas': PCanvasProps;
  'p-carousel': PCarouselProps;
  'p-checkbox': PCheckboxProps;
  'p-checkbox-wrapper': PCheckboxWrapperProps;
  'p-content-wrapper': PContentWrapperProps;
  'p-crest': PCrestProps;
  'p-display': PDisplayProps;
  'p-divider': PDividerProps;
  'p-fieldset': PFieldsetProps;
  'p-fieldset-wrapper': PFieldsetWrapperProps;
  'p-flex': PFlexProps;
  'p-flex-item': PFlexItemProps;
  'p-flyout': PFlyoutProps;
  'p-flyout-multilevel': PFlyoutMultilevelProps;
  'p-flyout-multilevel-item': PFlyoutMultilevelItemProps;
  'p-grid': PGridProps;
  'p-grid-item': PGridItemProps;
  'p-heading': PHeadingProps;
  'p-headline': PHeadlineProps;
  'p-icon': PIconProps;
  'p-inline-notification': PInlineNotificationProps;
  'p-link': PLinkProps;
  'p-link-pure': PLinkPureProps;
  'p-link-social': PLinkSocialProps;
  'p-link-tile': PLinkTileProps;
  'p-link-tile-model-signature': PLinkTileModelSignatureProps;
  'p-link-tile-product': PLinkTileProductProps;
  'p-marque': PMarqueProps;
  'p-modal': PModalProps;
  'p-model-signature': PModelSignatureProps;
  'p-multi-select': PMultiSelectProps;
  'p-multi-select-option': PMultiSelectOptionProps;
  'p-optgroup': POptgroupProps;
  'p-pagination': PPaginationProps;
  'p-pin-code': PPinCodeProps;
  'p-popover': PPopoverProps;
  'p-radio-button-wrapper': PRadioButtonWrapperProps;
  'p-scroller': PScrollerProps;
  'p-segmented-control': PSegmentedControlProps;
  'p-segmented-control-item': PSegmentedControlItemProps;
  'p-select': PSelectProps;
  'p-select-option': PSelectOptionProps;
  'p-select-wrapper': PSelectWrapperProps;
  'p-sheet': PSheetProps;
  'p-spinner': PSpinnerProps;
  'p-stepper-horizontal': PStepperHorizontalProps;
  'p-stepper-horizontal-item': PStepperHorizontalItemProps;
  'p-switch': PSwitchProps;
  'p-table': PTableProps;
  'p-table-body': PTableBodyProps;
  'p-table-cell': PTableCellProps;
  'p-table-head-cell': PTableHeadCellProps;
  'p-table-row': PTableRowProps;
  'p-table-head-row': PTableHeadRowProps;
  'p-table-head': PTableHeadProps;
  'p-tabs': PTabsProps;
  'p-tabs-item': PTabsItemProps;
  'p-tabs-bar': PTabsBarProps;
  'p-tag': PTagProps;
  'p-tag-dismissible': PTagDismissibleProps;
  'p-text': PTextProps;
  'p-text-field-wrapper': PTextFieldWrapperProps;
  'p-text-list': PTextListProps;
  'p-text-list-item': PTextListItemProps;
  'p-textarea': PTextareaProps;
  'p-textarea-wrapper': PTextareaWrapperProps;
  'p-toast': PToastProps;
  'p-wordmark': PWordmarkProps;
};

const componentMap: Record<ConfiguratorTagNames, React.ElementType> = {
  'p-accordion': PAccordion,
  'p-banner': PBanner,
  'p-button': PButton,
  'p-button-group': PButtonGroup,
  'p-button-pure': PButtonPure,
  'p-button-tile': PButtonTile,
  'p-canvas': PCanvas,
  'p-carousel': PCarousel,
  'p-checkbox': PCheckbox,
  'p-checkbox-wrapper': PCheckboxWrapper,
  'p-content-wrapper': PContentWrapper,
  'p-crest': PCrest,
  'p-display': PDisplay,
  'p-divider': PDivider,
  'p-fieldset': PFieldset,
  'p-fieldset-wrapper': PFieldsetWrapper,
  'p-flex': PFlex,
  'p-flex-item': PFlexItem,
  'p-flyout': PFlyout,
  'p-flyout-multilevel': PFlyoutMultilevel,
  'p-flyout-multilevel-item': PFlyoutMultilevelItem,
  'p-grid': PGrid,
  'p-grid-item': PGridItem,
  'p-heading': PHeading,
  'p-headline': PHeadline,
  'p-icon': PIcon,
  'p-inline-notification': PInlineNotification,
  'p-link': PLink,
  'p-link-pure': PLinkPure,
  'p-link-social': PLinkSocial,
  'p-link-tile': PLinkTile,
  'p-link-tile-model-signature': PLinkTileModelSignature,
  'p-link-tile-product': PLinkTileProduct,
  'p-marque': PMarque,
  'p-modal': PModal,
  'p-model-signature': PModelSignature,
  'p-multi-select': PMultiSelect,
  'p-multi-select-option': PMultiSelectOption,
  'p-optgroup': POptgroup,
  'p-pagination': PPagination,
  'p-pin-code': PPinCode,
  'p-popover': PPopover,
  'p-radio-button-wrapper': PRadioButtonWrapper,
  'p-scroller': PScroller,
  'p-segmented-control': PSegmentedControl,
  'p-segmented-control-item': PSegmentedControlItem,
  'p-select': PSelect,
  'p-select-option': PSelectOption,
  'p-select-wrapper': PSelectWrapper,
  'p-sheet': PSheet,
  'p-spinner': PSpinner,
  'p-stepper-horizontal': PStepperHorizontal,
  'p-stepper-horizontal-item': PStepperHorizontalItem,
  'p-switch': PSwitch,
  'p-table': PTable,
  'p-table-body': PTableBody,
  'p-table-cell': PTableCell,
  'p-table-head-cell': PTableHeadCell,
  'p-table-row': PTableRow,
  'p-table-head-row': PTableHeadRow,
  'p-table-head': PTableHead,
  'p-tabs': PTabs,
  'p-tabs-item': PTabsItem,
  'p-tabs-bar': PTabsBar,
  'p-tag': PTag,
  'p-tag-dismissible': PTagDismissible,
  'p-text': PText,
  'p-text-field-wrapper': PTextFieldWrapper,
  'p-text-list': PTextList,
  'p-text-list-item': PTextListItem,
  'p-textarea': PTextarea,
  'p-textarea-wrapper': PTextareaWrapper,
  'p-toast': PToast,
  'p-wordmark': PWordmark,
};

// TODO: Better to lazily import components? Suspense and loading needed
const getPDSReactComponentLazy = (tag: string) => {
  return React.lazy(() =>
    import('@porsche-design-system/components-react/ssr').then((module) => {
      const component = module[pascalCase(tag)];
      if (!component) {
        throw new Error(`Component ${pascalCase(tag)} not found.`);
      }
      return { default: component as React.ComponentType<any> };
    })
  );
};

export const createElements = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  updateState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>>
): ReactNode => {
  return configs.map((config, index) => createElement(config, index, updateState));
};

export const createElement = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  key: number,
  updateState: React.Dispatch<React.SetStateAction<StoryState<HTMLTagOrComponent>>>
): ReactNode => {
  if (!config) return null;
  if (typeof config === 'string') return config;

  const { tag, properties = {}, events = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  const ReactComponent = isPDSComponent ? componentMap[tag as ConfiguratorTagNames] : tag;

  const eventEntries = Object.entries(events);

  const handleEvent = ({ prop, eventValueKey, negateValue, value }: EventConfig) => {
    return (event: any) => {
      const eventValue = eventValueKey ? event.detail[eventValueKey] : value;
      const newValue = negateValue ? !eventValue : eventValue;
      updateState((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          [prop]: newValue,
        },
      }));
    };
  };

  const propsWithEvents =
    eventEntries.length > 0
      ? {
          ...properties,
          ...eventEntries.reduce((acc, [eventName, eventInfo]) => {
            acc[eventName] = handleEvent(eventInfo);
            return acc;
          }, {} as any),
        }
      : properties;

  return React.createElement(
    ReactComponent,
    { key, ...propsWithEvents },
    ...(children || []).map((child, index) => createElement(child, index, updateState))
  );
};
