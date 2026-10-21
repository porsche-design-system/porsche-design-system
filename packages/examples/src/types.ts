import type { FrameworkExampleId } from '@porsche-design-system/examples-framework';
import type { ExamplePath } from '@porsche-design-system/examples-pages';
import type { AccessibilityExampleId, StoryExampleId } from '@porsche-design-system/examples-stories';
import type { Framework, TagName } from '@porsche-design-system/shared';

/**
 * An example's id: lowercase kebab-case segments joined by `/`, the folder of the example below its project's `src/`
 * (see `packages/examples/AGENTS.md`). It names neither the kind nor a framework, so an example keeps its id when its
 * format changes.
 */
export type ExampleId = StoryExampleId | FrameworkExampleId | AccessibilityExampleId | ExamplePath;

/** What every example has, whatever its kind. */
type ExampleBase<Id extends ExampleId> = {
  id: Id;
  /** The heading of the example, in the Storefront and in the skills. */
  title: string;
  /** The MDX source of its description; plain text for a pattern or a template. */
  description?: string;
  /** The PDS components it shows, so the reference of a component can list it. */
  components: TagName[];
};

/** An example written as a story; its live preview renders its stories (`/stories`). */
export type StoryExample<Id extends StoryExampleId = StoryExampleId> = ExampleBase<Id> & {
  kind: 'story';
  /** The code of every framework, as the code tabs, StackBlitz and the skills show it. */
  code: Record<Framework, string>;
};

/** An example written by hand for every framework; its live preview is a React component (`/previews`). */
export type FrameworkExample<Id extends FrameworkExampleId = FrameworkExampleId> = ExampleBase<Id> & {
  kind: 'framework';
  /** The code of every framework, as the code tabs, StackBlitz and the skills show it. */
  code: Record<Framework, string>;
};

/** A pattern or a template: a page of its own, shown in an iframe. */
export type PageExample<Id extends ExamplePath = ExamplePath> = ExampleBase<Id> & {
  kind: 'pattern' | 'template';
  /** Plain text, which every page has. */
  description: string;
  /** The files of its Vite project, as StackBlitz opens it: path in the project → content. */
  files: Record<string, string>;
  /** Where its built page is served, relative to the root of a site and without its base path. */
  url: string;
};

/** An anti-pattern and its recommendation, as snippets. */
export type AccessibilityExample<Id extends AccessibilityExampleId = AccessibilityExampleId> = ExampleBase<Id> & {
  kind: 'accessibility';
  antiPattern: Record<Framework, string>;
  recommended: Record<Framework, string>;
};

export type Example = StoryExample | FrameworkExample | PageExample | AccessibilityExample;

export type ExampleKind = Example['kind'];

/** The example of an id, narrowed to the kind its project gives it. */
export type ExampleOf<Id extends ExampleId> = Id extends StoryExampleId
  ? StoryExample<Id>
  : Id extends FrameworkExampleId
    ? FrameworkExample<Id>
    : Id extends AccessibilityExampleId
      ? AccessibilityExample<Id>
      : Id extends ExamplePath
        ? PageExample<Id>
        : never;

/** The catalogue: every example by its id. */
export type Examples = { readonly [Id in ExampleId]: ExampleOf<Id> };
