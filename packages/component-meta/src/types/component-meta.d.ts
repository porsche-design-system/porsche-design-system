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
};

export type EventMeta = {
  description?: string;
  type: string;
  typeDetail?: string;
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
  requiredParent?: TagName; // typically components with an `-item` suffix need the right parent in order to work
  requiredRootNode?: TagName[]; // components, that use this internal component within their shadow DOM
  requiredChild?: string; // direct and only child of kind
  requiredChildSelector?: string; // might contain multiple selectors separated by comma
  nestedComponents?: TagName[]; // array of other pds components
  propsMeta?: { [propName: string]: PropMeta }; // new format
  /** @deprecated use `propsMeta` instead */
  props?: {
    [propName: string]: boolean | number | string | object | null; // value is the prop's default value
  };
  /** @deprecated use `propsMeta` instead */
  requiredProps?: string[]; // array of props that are mandatory
  /** @deprecated use `propsMeta` instead */
  deprecatedProps?: string[]; // array of props that are deprecated
  /** @deprecated use `propsMeta` instead */
  breakpointCustomizableProps?: string[]; // array of props that are breakpointCustomizable
  /** @deprecated use `propsMeta` instead */
  arrayProps?: string[]; // array of props that are of type array
  /** @deprecated use `propsMeta` instead */
  allowedPropValues?: {
    [propName: string]: 'boolean' | 'number' | 'string' | object | string[] | number[];
  };
  /** @deprecated use `propsMeta` instead */
  deprecatedPropValues?: {
    [propName: string]: string[]; // array of values of a prop that are deprecated
  };
  internalProps?: {
    [propName: string]: boolean | number | string | object | null; // value is the prop's default value
  };
  hostAttributes?: {
    [attrName: string]: string;
  };
  hasSlot: boolean;
  namedSlots?: string[]; // array of named slots
  requiredNamedSlots?: { slotName: string; tagName: TagName }[]; // array of objects for each named slot with specific component tag
  eventsMeta?: { [eventName: string]: EventMeta }; // new format
  hasEvent: boolean;
  /** @deprecated use `eventsMeta` instead */
  eventNames?: string[];
  /** @deprecated use `eventsMeta` instead */
  deprecatedEventNames?: string[]; // array of event names
  hasAriaProp: boolean;
  hasObserveAttributes: boolean;
  observedAttributes?: string[];
  hasObserveChildren: boolean;
  styling: 'jss' | 'scss' | 'hybrid';
};

export type ComponentsMeta = Record<TagName, ComponentMeta>;
