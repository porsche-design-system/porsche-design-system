import type { PropOptions } from '@porsche-design-system/components/dist/types/stencil-public-runtime';
import type { TagName } from '@porsche-design-system/shared';

export type PropMeta = {
  description?: string;
  type: string;
  defaultValue: boolean | number | string | object | null;
  allowedValues?: 'boolean' | 'number' | 'string' | object | string[] | number[];
  deprecatedValues?: string[];
  isRequired?: boolean;
  isDeprecated?: boolean;
  isExperimental?: boolean;
  isBreakpointCustomizable?: boolean;
  isAria?: boolean;
  isArray?: boolean;
  propOptions?: PropOptions;
};

export type EventMeta = {
  description?: string;
  type: string;
  typeDetail?: string;
  isDeprecated?: boolean;
};

/**
 * @slot Annotation specified in `<component>.tsx`. Documented type includes a `name: string` field which is transformed into key of `slotsMeta`.
 * Metadata defining the relevant slot information in a component.
 */
export type SlotMeta = {
  description?: string;
  isRequired?: boolean; // Specifies if the slot is required. If undefined the slot is not required.
  allowedTagNames?: (TagName | keyof HTMLElementTagNameMap)[]; // Specifies which tagNames are allowed to be used. If undefined all tags are allowed.
  hasAltProp?: boolean; // Specifies if the slot has an equal name prop which can be used instead.
  isDeprecated?: boolean;
};

/**
 * @controlled Annotation specified in `<component>.tsx`.
 * Metadata defining a relationship between an event and one or more controlled properties in a component.
 */
export type ControlledMeta = {
  props: string[]; // Names of props that represent the controlled state(s) of the component.
  event: string; // Event name that triggers updates to the controlled props.
  isInternallyMutated?: boolean; // Flag indicating whether the controlled props are internally mutated. If true, the component can update its controlled props internally without relying on the external event.
};

/**
 * @css-variable Annotation specified in `<component>.styles.ts`. Documented type includes a `name: string` field which is transformed into key of `cssVariablesMeta`.
 * Metadata defining the relevant slot information in a component.
 */
export type CssVariableMeta = {
  description?: string;
  defaultValue?: string;
  isDeprecated?: boolean;
};

export type ComponentMeta = {
  isDeprecated?: boolean;
  deprecationMessage?: string;
  isExperimental?: boolean;
  isDelegatingFocus: boolean;
  isInternal: boolean;
  isChunked: boolean; // component is part of a chunk
  isThemeable: boolean;
  requiredParent?: TagName | TagName[]; // typically components with an `-item` suffix need the right parent in order to work
  requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
  requiredChild?: string; // direct and only child of kind
  requiredChildSelector?: string; // might contain multiple selectors separated by comma
  nestedComponents?: TagName[]; // array of other pds components
  propsMeta?: { [propName: string]: PropMeta }; // new format
  internalProps?: {
    [propName: string]: boolean | number | string | object | null; // value is the prop's default value
  };
  hostAttributes?: {
    [attrName: string]: string;
  };
  hasSlot: boolean;
  /** Each object key corresponds to a slot. Empty strings as key corresponds to the default slot. Be aware that this is a falsy value in js when working with the keys! */
  slotsMeta?: { [slotName: string]: SlotMeta };
  eventsMeta?: { [eventName: string]: EventMeta }; // new format
  hasEvent: boolean;
  controlledMeta?: ControlledMeta[];
  /** Each object key corresponds to a cssVariable. */
  cssVariablesMeta?: { [cssVariableName: string]: CssVariableMeta };
  hasAriaProp: boolean;
  hasObserveAttributes: boolean;
  /** Indicates if a component uses the ElementInternals API */
  hasElementInternals: boolean;
  observedAttributes?: string[];
  hasObserveChildren: boolean;
  styling: 'jss' | 'scss' | 'hybrid';
};

export type ComponentsMeta = Record<TagName, ComponentMeta>;
