'use client';

import * as components from '@porsche-design-system/components-react/ssr';
import { pascalCase } from 'change-case';
import {
  createElement,
  type Dispatch,
  type ElementType,
  type Key,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import type { ElementConfig, EventConfig, HTMLTagOrComponent } from '../element';
import type { Story, StoryState } from '../story';

type State = StoryState<HTMLTagOrComponent>;
type SetState = Dispatch<SetStateAction<State>>;

/** `p-link-tile` → `PLinkTile` of `@porsche-design-system/components-react/ssr`. */
const getComponent = (tag: string): ElementType => {
  const component = (components as unknown as Record<string, ElementType | undefined>)[pascalCase(tag)];
  if (!component) {
    throw new Error(`No React component of @porsche-design-system/components-react/ssr renders <${tag}>`);
  }
  return component;
};

const createEventHandler =
  ({ prop, eventValueKey, negateValue, value, preventDefault, toggleValue }: EventConfig, setState: SetState) =>
  (event: any) => {
    preventDefault && event?.preventDefault?.();
    const eventValue = eventValueKey ? event.detail[eventValueKey] : value;
    setState((prev) => ({
      ...prev,
      properties: {
        ...prev.properties,
        // `toggleValue` flips the current state (needs `prev`); otherwise apply the (optionally negated) event/static value.
        [prop]: toggleValue ? !(prev.properties as any)?.[prop] : negateValue ? !eventValue : eventValue,
      },
    }));
  };

type Configs = (string | ElementConfig<HTMLTagOrComponent> | undefined)[];

/**
 * Keys siblings by tag, slot and occurrence instead of index, so toggling a slot does not make React reuse an
 * element of another slot, which would e.g. set `slot` to `"undefined"` on a custom element.
 */
const getElementKeys = (configs: Configs): string[] => {
  const occurrences = new Map<string, number>();
  return configs.map((config, index) => {
    if (!config || typeof config === 'string') return `${index}`;
    const id = `${config.tag}[${(config.properties as { slot?: string } | undefined)?.slot ?? ''}]`;
    const occurrence = occurrences.get(id) ?? 0;
    occurrences.set(id, occurrence + 1);
    return `${id}-${occurrence}`;
  });
};

const renderElements = (configs: Configs, setState: SetState): ReactNode[] => {
  const keys = getElementKeys(configs);
  return configs.map((config, index) => renderElement(config, keys[index], setState));
};

const renderElement = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  key: Key,
  setState: SetState
): ReactNode => {
  if (!config) return null;
  if (typeof config === 'string') return config;

  const { tag, properties = {}, events = {}, children = [] } = config;
  const eventHandlers = Object.fromEntries(
    Object.entries(events).map(([eventName, eventConfig]) => [eventName, createEventHandler(eventConfig, setState)])
  );

  return createElement(
    tag.startsWith('p-') ? getComponent(tag) : tag,
    { key, ...properties, ...eventHandlers },
    ...renderElements(children, setState)
  );
};

export type StoryPreviewProps = {
  story: Story<HTMLTagOrComponent>;
  /** The state to render the story in. Without it, the preview keeps its own state, starting with the story's. */
  state?: State;
  /** Receives the state changes the story's `events` make, e.g. `open: false` when a modal is dismissed. */
  onStateChange?: SetState;
};

/** Renders a story with the React components of the Porsche Design System. */
export const StoryPreview = ({ story, state, onStateChange }: StoryPreviewProps) => {
  const [ownState, setOwnState] = useState<State>(story.state ?? {});
  const isControlled = state !== undefined;
  const currentState = isControlled ? state : ownState;
  const setState: SetState = isControlled ? (onStateChange ?? (() => {})) : setOwnState;

  return <>{renderElements(story.generator(currentState), setState)}</>;
};
