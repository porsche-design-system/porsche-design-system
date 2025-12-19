import {
  PAccordion,
  type PAccordionProps,
  PBanner,
  type PBannerProps,
  PButton,
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
  PCrest,
  type PCrestProps,
  PDisplay,
  type PDisplayProps,
  PDivider,
  type PDividerProps,
  PDrilldown,
  PDrilldownItem,
  type PDrilldownItemProps,
  PDrilldownLink,
  type PDrilldownLinkProps,
  type PDrilldownProps,
  PFieldset,
  type PFieldsetProps,
  PFlag,
  type PFlagProps,
  PFlyout,
  type PFlyoutProps,
  PHeading,
  type PHeadingProps,
  PIcon,
  type PIconProps,
  PInlineNotification,
  type PInlineNotificationProps,
  PInputDate,
  type PInputDateProps,
  PInputEmail,
  type PInputEmailProps,
  PInputMonth,
  type PInputMonthProps,
  PInputNumber,
  type PInputNumberProps,
  PInputPassword,
  type PInputPasswordProps,
  PInputSearch,
  type PInputSearchProps,
  PInputTel,
  type PInputTelProps,
  PInputText,
  type PInputTextProps,
  PInputTime,
  type PInputTimeProps,
  PInputUrl,
  type PInputUrlProps,
  PInputWeek,
  type PInputWeekProps,
  PLink,
  type PLinkProps,
  PLinkPure,
  type PLinkPureProps,
  PLinkTile,
  PLinkTileProduct,
  type PLinkTileProductProps,
  type PLinkTileProps,
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
  PRadioGroup,
  PRadioGroupOption,
  type PRadioGroupOptionProps,
  type PRadioGroupProps,
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
  PTextarea,
  type PTextareaProps,
  PTextList,
  PTextListItem,
  type PTextListItemProps,
  type PTextListProps,
  type PTextProps,
  PToast,
  type PToastProps,
  PWordmark,
  type PWordmarkProps,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import React, { type ReactNode } from 'react';
import type { StoryState } from '@/models/story';

type SafePropTypeMapping = {
  [K in Exclude<TagName, 'p-toast-item' | 'p-select-wrapper-dropdown'>]: K extends keyof PropTypeMapping
    ? PropTypeMapping[K]
    : never;
};
// PDS component tags without internal/child components (p-accordion, p-banner...)
export type ConfiguratorTagNames = keyof SafePropTypeMapping;
// HTML tags (a, img, div...) or PDS component tags (p-accordion, p-banner...)
export type HTMLTagOrComponent = keyof JSX.IntrinsicElements | ConfiguratorTagNames;

// TODO: Create type for children and share with story generator return type. Maybe make ElementConfig also string | undefined?
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
   * TODO: We could automatically create this type as long as we follow the consistent naming scheme of <Component><EventName>EventDetail
   * The type of the event callback. E.g. if (e: CustomEvent<AccordionUpdateEventDetail>) this would be AccordionUpdateEventDetail
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
  'p-button-pure': PButtonPureProps;
  'p-button-tile': PButtonTileProps;
  'p-canvas': PCanvasProps;
  'p-carousel': PCarouselProps;
  'p-checkbox': PCheckboxProps;
  'p-crest': PCrestProps;
  'p-display': PDisplayProps;
  'p-divider': PDividerProps;
  'p-fieldset': PFieldsetProps;
  'p-flag': PFlagProps;
  'p-flyout': PFlyoutProps;
  'p-drilldown': PDrilldownProps;
  'p-drilldown-item': PDrilldownItemProps;
  'p-drilldown-link': PDrilldownLinkProps;
  'p-heading': PHeadingProps;
  'p-icon': PIconProps;
  'p-inline-notification': PInlineNotificationProps;
  'p-input-password': PInputPasswordProps;
  'p-input-number': PInputNumberProps;
  'p-input-date': PInputDateProps;
  'p-input-month': PInputMonthProps;
  'p-input-week': PInputWeekProps;
  'p-input-time': PInputTimeProps;
  'p-input-search': PInputSearchProps;
  'p-input-text': PInputTextProps;
  'p-input-email': PInputEmailProps;
  'p-input-tel': PInputTelProps;
  'p-input-url': PInputUrlProps;
  'p-link': PLinkProps;
  'p-link-pure': PLinkPureProps;
  'p-link-tile': PLinkTileProps;
  'p-link-tile-product': PLinkTileProductProps;
  'p-modal': PModalProps;
  'p-model-signature': PModelSignatureProps;
  'p-multi-select': PMultiSelectProps;
  'p-multi-select-option': PMultiSelectOptionProps;
  'p-optgroup': POptgroupProps;
  'p-pagination': PPaginationProps;
  'p-pin-code': PPinCodeProps;
  'p-popover': PPopoverProps;
  'p-radio-group': PRadioGroupProps;
  'p-radio-group-option': PRadioGroupOptionProps;
  'p-scroller': PScrollerProps;
  'p-segmented-control': PSegmentedControlProps;
  'p-segmented-control-item': PSegmentedControlItemProps;
  'p-select': PSelectProps;
  'p-select-option': PSelectOptionProps;
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
  'p-text-list': PTextListProps;
  'p-text-list-item': PTextListItemProps;
  'p-textarea': PTextareaProps;
  'p-toast': PToastProps;
  'p-wordmark': PWordmarkProps;
};

const componentMap: Record<ConfiguratorTagNames, React.ElementType> = {
  'p-accordion': PAccordion,
  'p-banner': PBanner,
  'p-button': PButton,
  'p-button-pure': PButtonPure,
  'p-button-tile': PButtonTile,
  'p-canvas': PCanvas,
  'p-carousel': PCarousel,
  'p-checkbox': PCheckbox,
  'p-crest': PCrest,
  'p-display': PDisplay,
  'p-divider': PDivider,
  'p-fieldset': PFieldset,
  'p-flag': PFlag,
  'p-flyout': PFlyout,
  'p-drilldown': PDrilldown,
  'p-drilldown-item': PDrilldownItem,
  'p-drilldown-link': PDrilldownLink,
  'p-heading': PHeading,
  'p-icon': PIcon,
  'p-inline-notification': PInlineNotification,
  'p-input-password': PInputPassword,
  'p-input-number': PInputNumber,
  'p-input-date': PInputDate,
  'p-input-month': PInputMonth,
  'p-input-week': PInputWeek,
  'p-input-time': PInputTime,
  'p-input-search': PInputSearch,
  'p-input-text': PInputText,
  'p-input-email': PInputEmail,
  'p-input-tel': PInputTel,
  'p-input-url': PInputUrl,
  'p-link': PLink,
  'p-link-pure': PLinkPure,
  'p-link-tile': PLinkTile,
  'p-link-tile-product': PLinkTileProduct,
  'p-modal': PModal,
  'p-model-signature': PModelSignature,
  'p-multi-select': PMultiSelect,
  'p-multi-select-option': PMultiSelectOption,
  'p-optgroup': POptgroup,
  'p-pagination': PPagination,
  'p-pin-code': PPinCode,
  'p-popover': PPopover,
  'p-radio-group': PRadioGroup,
  'p-radio-group-option': PRadioGroupOption,
  'p-scroller': PScroller,
  'p-segmented-control': PSegmentedControl,
  'p-segmented-control-item': PSegmentedControlItem,
  'p-select': PSelect,
  'p-select-option': PSelectOption,
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
  'p-text-list': PTextList,
  'p-text-list-item': PTextListItem,
  'p-textarea': PTextarea,
  'p-toast': PToast,
  'p-wordmark': PWordmark,
};

// TODO: Better to lazily import components? Suspense and loading needed
// const getPDSReactComponentLazy = (tag: string) => {
//   return React.lazy(() =>
//     import('@porsche-design-system/components-react/ssr').then((module) => {
//       const component = module[pascalCase(tag)];
//       if (!component) {
//         throw new Error(`Component ${pascalCase(tag)} not found.`);
//       }
//       return { default: component as React.ComponentType<any> };
//     })
//   );
// };

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
