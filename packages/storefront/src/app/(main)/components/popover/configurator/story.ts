'use client';

import type { SlotStories, Story } from '@/models/story';

export const popoverSlotStories: SlotStories<'p-popover'> = {
  button: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-button',
          properties: { slot: 'button', type: 'button' },
          children: ['Toggle Popover'],
        },
      ],
    },
  },
  default: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-text',
          children: ['Some additional content.'],
        },
      ],
    },
  },
};

export const popoverStory: Story<'p-popover'> = {
  // `open` only takes effect in controlled mode; disable it here so the uncontrolled example can't be
  // pushed into a broken (stuck-open) state.
  disabledProps: ['open'],
  state: {
    slots: {
      default: popoverSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-popover',
      properties,
      children: [...(slots?.button?.generator() ?? []), ...(slots?.default?.generator() ?? [])],
    },
  ],
};

// Controlled mode: the consumer owns `open`. A slotted `button` opens the popover (`open: true`) and the
// `dismiss` event (Escape / outside click) closes it (`open: false`). Mirrors the drilldown configurator pattern.
// The `button` slot is required in controlled mode (the trigger opens the popover), so it is preselected and
// locked via `requiredSlots` — the user cannot deactivate it.
export const popoverControlledSlotStories: SlotStories<'p-popover'> = {
  button: {
    basic: {
      name: 'Basic',
      generator: () => [
        {
          tag: 'p-button',
          properties: { slot: 'button', type: 'button' },
          events: {
            onClick: {
              target: 'p-popover',
              prop: 'open',
              // Toggle the controlled `open` state so the trigger both opens and closes the popover. The slotted
              // trigger is exempt from the popover's outside-click dismiss, so toggling here has no dismiss race.
              toggleValue: true,
            },
          },
          children: ['Toggle Popover'],
        },
      ],
    },
  },
  default: popoverSlotStories.default,
};

export const popoverControlledStory: Story<'p-popover'> = {
  requiredSlots: ['button'],
  state: {
    properties: { open: false },
    slots: {
      button: popoverControlledSlotStories.button.basic,
      default: popoverControlledSlotStories.default.basic,
    },
  },
  generator: ({ properties, slots } = {}) => [
    {
      tag: 'p-popover',
      properties,
      events: {
        // @ts-expect-error: `onDismiss` is valid for p-popover but the generic root ElementConfig union widens the event type
        onDismiss: {
          target: 'p-popover',
          prop: 'open',
          value: false,
        },
      },
      children: [...(slots?.button?.generator() ?? []), ...(slots?.default?.generator() ?? [])],
    },
  ],
};
