import type { ComponentMeta } from '@porsche-design-system/component-meta';

/**
 * Representative `componentMeta` fixtures modelled on real components, covering every
 * shape the API-table generator must handle:
 * - `p-accordion`: deprecated + experimental + breakpoint-customizable props, a default
 *   slot (key `''`) alongside a deprecated named slot, an event with `typeDetail`, and
 *   CSS variables.
 * - `p-heading`: props whose `deprecatedValues` overlap their `allowedValues`, so the
 *   recommended value list must split deprecated values out.
 */
export const componentApiFixtures: Record<string, ComponentMeta> = {
  'p-accordion': {
    isDelegatingFocus: true,
    isInternal: false,
    isChunked: true,
    propsMeta: {
      open: {
        description: 'Controls whether the accordion is open or closed.',
        type: 'boolean',
        defaultValue: null,
        allowedValues: 'boolean',
      },
      background: {
        description: 'Sets the background color of the accordion panel.',
        type: 'AccordionBackground',
        defaultValue: 'none',
        allowedValues: ['canvas', 'surface', 'frosted', 'none'],
      },
      indent: {
        description: 'Indents the slotted content to align with the summary text.',
        type: 'boolean',
        defaultValue: false,
        isBreakpointCustomizable: true,
        allowedValues: 'boolean',
      },
      size: {
        description: '@deprecated Will be removed in the next major release. Controls the heading size.',
        type: 'AccordionSize',
        defaultValue: 'small',
        isDeprecated: true,
        isBreakpointCustomizable: true,
        allowedValues: ['small', 'medium'],
      },
      sticky: {
        description: '@experimental Makes the summary section sticky while scrolling.',
        type: 'boolean',
        defaultValue: null,
        isExperimental: true,
        allowedValues: 'boolean',
      },
    },
    hasSlot: true,
    slotsMeta: {
      summary: { description: "Content for the accordion's summary section." },
      heading: { description: "Content for the accordion's heading section.", isDeprecated: true },
      '': { description: 'Main content displayed when the accordion is expanded.' },
    },
    eventsMeta: {
      update: {
        description: 'Emitted when the user toggles the accordion open or closed.',
        type: 'AccordionUpdateEventDetail',
        typeDetail: '{ open: boolean }',
      },
    },
    hasEvent: true,
    cssVariablesMeta: {
      '--p-accordion-px': { description: 'Horizontal padding of the accordion.', defaultValue: '16px' },
      '--p-accordion-py': { description: 'Vertical padding of the accordion.', defaultValue: '16px' },
    },
    hasAriaProp: false,
    hasObserveAttributes: false,
    hasElementInternals: false,
    hasObserveChildren: true,
    styling: 'jss',
  },

  'p-heading': {
    isDelegatingFocus: false,
    isInternal: false,
    isChunked: true,
    propsMeta: {
      size: {
        description: 'Adjusts the size of the heading.',
        type: 'HeadingSize',
        defaultValue: 'large',
        allowedValues: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', 'small', 'medium', 'large', 'x-large', 'xx-large'],
        deprecatedValues: ['small', 'medium', 'large', 'x-large', 'xx-large'],
      },
      weight: {
        description: 'Adjusts the font weight of the heading.',
        type: 'HeadingWeight',
        defaultValue: 'semibold',
        allowedValues: ['normal', 'semibold', 'bold', 'regular', 'semi-bold'],
        deprecatedValues: ['regular', 'semi-bold'],
      },
    },
    hasSlot: true,
    slotsMeta: {
      '': { description: 'Default slot for the heading text.' },
    },
    hasEvent: false,
    hasAriaProp: false,
    hasObserveAttributes: false,
    hasElementInternals: false,
    hasObserveChildren: false,
    styling: 'jss',
  },
};
