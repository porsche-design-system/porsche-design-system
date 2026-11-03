'use client';

import * as components from '@porsche-design-system/components-react/ssr';
import { pascalCase } from 'change-case';
import { createElement, type Dispatch, type ElementType, type ReactNode, type SetStateAction, useState } from 'react';
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

/** The properties stories set to an asset, so text typed into the configurator, e.g. a `value`, stays as typed. */
const assetProperties = ['src', 'srcSet', 'poster', 'iconSource', 'source'];

/** Stories reference `public/assets` relatively, which the browser would resolve against the page path instead of the site root. */
const resolveAssetPath = (name: string, value: unknown, basePath: string): unknown =>
  assetProperties.includes(name) && typeof value === 'string' && value.startsWith('assets/')
    ? `${basePath ? `/${basePath}` : ''}/${value}`
    : value;

const renderElement = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  key: number,
  setState: SetState,
  basePath: string
): ReactNode => {
  if (!config) return null;
  if (typeof config === 'string') return config;

  const { tag, properties = {}, events = {}, children = [] } = config;
  const resolvedProperties = Object.fromEntries(
    Object.entries(properties).map(([name, value]) => [name, resolveAssetPath(name, value, basePath)])
  );
  const eventHandlers = Object.fromEntries(
    Object.entries(events).map(([eventName, eventConfig]) => [eventName, createEventHandler(eventConfig, setState)])
  );

  return createElement(
    tag.startsWith('p-') ? getComponent(tag) : tag,
    { key, ...resolvedProperties, ...eventHandlers },
    ...children.map((child, index) => renderElement(child, index, setState, basePath))
  );
};

export type StoryPreviewProps = {
  story: Story<HTMLTagOrComponent>;
  /** The state to render the story in. Without it, the preview keeps its own state, starting with the story's. */
  state?: State;
  /** Receives the state changes the story's `events` make, e.g. `open: false` when a modal is dismissed. */
  onStateChange?: SetState;
  /** The deployment's path prefix without slashes, e.g. `v4`, which `assets/…` paths are resolved against. */
  basePath?: string;
};

/** Renders a story with the React components of the Porsche Design System. */
export const StoryPreview = ({ story, state, onStateChange, basePath = '' }: StoryPreviewProps) => {
  const [ownState, setOwnState] = useState<State>(story.state ?? {});
  const isControlled = state !== undefined;
  const currentState = isControlled ? state : ownState;
  const setState: SetState = isControlled ? (onStateChange ?? (() => {})) : setOwnState;

  return <>{story.generator(currentState).map((config, index) => renderElement(config, index, setState, basePath))}</>;
};
