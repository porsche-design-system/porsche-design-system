import type {
  PAccordionProps,
  PAiTagProps,
  PBannerProps,
  PButtonProps,
  PButtonPureProps,
  PButtonTileProps,
  PCanvasProps,
  PCarouselProps,
  PCheckboxProps,
  PCrestProps,
  PDisplayProps,
  PDividerProps,
  PDrilldownItemProps,
  PDrilldownLinkProps,
  PDrilldownProps,
  PFieldsetProps,
  PFlagProps,
  PFlyoutProps,
  PHeadingProps,
  PIconProps,
  PInlineNotificationProps,
  PInputDateProps,
  PInputEmailProps,
  PInputMonthProps,
  PInputNumberProps,
  PInputPasswordProps,
  PInputSearchProps,
  PInputTelProps,
  PInputTextProps,
  PInputTimeProps,
  PInputUrlProps,
  PInputWeekProps,
  PLinkProps,
  PLinkPureProps,
  PLinkTileProductProps,
  PLinkTileProps,
  PModalProps,
  PModelSignatureProps,
  PMultiSelectOptionProps,
  PMultiSelectProps,
  POptgroupProps,
  PPaginationProps,
  PPinCodeProps,
  PPopoverProps,
  PRadioGroupOptionProps,
  PRadioGroupProps,
  PScrollerProps,
  PSegmentedControlItemProps,
  PSegmentedControlProps,
  PSelectOptionProps,
  PSelectProps,
  PSheetProps,
  PSpinnerProps,
  PStepperHorizontalItemProps,
  PStepperHorizontalProps,
  PSwitchProps,
  PTableBodyProps,
  PTableCellProps,
  PTableHeadCellProps,
  PTableHeadProps,
  PTableHeadRowProps,
  PTableProps,
  PTableRowProps,
  PTabsBarProps,
  PTabsItemProps,
  PTabsProps,
  PTagDismissibleProps,
  PTagProps,
  PTextareaProps,
  PTextListItemProps,
  PTextListProps,
  PTextProps,
  PToastProps,
  PWordmarkProps,
} from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import type { JSX } from 'react';

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
  preventDefault?: boolean;
  /**
   * Toggles the current boolean value of `prop` instead of applying a fixed `value`.
   * Useful for a trigger button that should both open and close a controlled component
   * (e.g. p-popover's slotted button flipping `open`).
   */
  toggleValue?: boolean;
};

export type PropTypeMapping = {
  'p-accordion': PAccordionProps;
  'p-ai-tag': PAiTagProps;
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
