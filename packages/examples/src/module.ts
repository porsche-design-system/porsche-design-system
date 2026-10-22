import type { FrameworkExampleId } from '@porsche-design-system/examples-framework';
import type { PageExampleId } from '@porsche-design-system/examples-pages';
import type { AccessibilityExampleId, StoryExampleId } from '@porsche-design-system/examples-stories';
import type { SlotStories, Story } from '@porsche-design-system/story-generator';
import type { ComponentType } from 'react';
import type { AccessibilityExample, ExampleId, FrameworkExample, PageExample, StoryExample } from './types';

/**
 * An example as its module exports it, `@porsche-design-system/examples/<id>`: its data and what renders it. Apart from
 * the catalogue (`.`), because a story imports the React wrapper's types: this entry is checked after the wrappers are
 * built, and so are the generated modules, each of which satisfies the type of its id.
 */

/**
 * A story of any tag. Its generator takes the state of its own tag (`Story<'p-button'>`), which neither a story of
 * every tag (`Story<HTMLTagOrComponent>`) nor a union of the stories of all tags accepts.
 */
type AnyStory = Story<any>;
type AnySlotStories = SlotStories<any>;

/** A story example's module: its stories, which the configurator and `Example` render, and its description. */
export type StoryExampleModule<Id extends StoryExampleId = StoryExampleId> = StoryExample<Id> & {
  story: AnyStory;
  /** Default stories only: the stories of the slots the configurator offers. */
  slotStories?: AnySlotStories;
  /** Default stories only: the controlled variant of a component with a controlled mode. */
  controlledStory?: AnyStory;
  controlledSlotStories?: AnySlotStories;
  /** Its `example.mdx`. */
  Description?: ComponentType;
};

/** A framework example's module: its live preview, a client component, and its description. */
export type FrameworkExampleModule<Id extends FrameworkExampleId = FrameworkExampleId> = FrameworkExample<Id> & {
  Preview: ComponentType;
  /** Its `example.mdx`. */
  Description?: ComponentType;
};

/** A pattern's or template's module: its data, which holds its project. */
export type PageExampleModule<Id extends PageExampleId = PageExampleId> = PageExample<Id>;

/** An accessibility example's module: its data, the snippets of both sides. */
export type AccessibilityExampleModule<Id extends AccessibilityExampleId = AccessibilityExampleId> =
  AccessibilityExample<Id>;

export type ExampleModule =
  | StoryExampleModule
  | FrameworkExampleModule
  | PageExampleModule
  | AccessibilityExampleModule;

/** The module of an id, narrowed to the kind its project gives it. */
export type ExampleModuleOf<Id extends ExampleId> = Id extends StoryExampleId
  ? StoryExampleModule<Id>
  : Id extends FrameworkExampleId
    ? FrameworkExampleModule<Id>
    : Id extends AccessibilityExampleId
      ? AccessibilityExampleModule<Id>
      : Id extends PageExampleId
        ? PageExampleModule<Id>
        : never;
