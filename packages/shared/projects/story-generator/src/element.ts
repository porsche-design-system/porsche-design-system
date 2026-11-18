import type * as Components from '@porsche-design-system/components-react/ssr';
import type { InternalTagName, TagName } from '@porsche-design-system/shared';
import type { ComponentPropsWithoutRef, JSX } from 'react';

// PDS component tags, except the internal ones (p-accordion, p-banner...)
export type ConfiguratorTagNames = Exclude<TagName, InternalTagName>;
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
    ? PropTypeMapping[T]
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

/** `p-link-tile` → `PLinkTile`, the name of its component in `@porsche-design-system/components-react`. */
type PascalCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Capitalize<Head>}${PascalCase<Tail>}`
  : Capitalize<S>;

/** The props of every PDS component, read from its React component. */
export type PropTypeMapping = {
  [Tag in ConfiguratorTagNames]: Omit<ComponentPropsWithoutRef<(typeof Components)[PascalCase<Tag>]>, 'key'>;
};
