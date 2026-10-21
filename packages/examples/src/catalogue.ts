import { frameworkExamples } from '@porsche-design-system/examples-framework';
import { pageExamples } from '@porsche-design-system/examples-pages';
import { accessibilityExamples, storyExamples } from '@porsche-design-system/examples-stories';
import type { Example, Examples } from './types';

/**
 * Every example by its id: stories, framework examples, accessibility examples, patterns and templates. Every project
 * exports its examples in the shape of `Example` already, so the catalogue only merges them; a project whose shape
 * drifts fails the typecheck here. Data only – it imports no story, preview or wrapper, so it loads before the wrappers
 * are built. The whole set is large (the code of every framework, the files of every page): import it on the server,
 * and hand a client the example it shows.
 */
export const examples: Examples = {
  ...storyExamples,
  ...frameworkExamples,
  ...accessibilityExamples,
  ...pageExamples,
};

/** The examples of all projects as a list, before they are merged by id – so a duplicate id shows. */
export const exampleList: Example[] = [
  ...Object.values(storyExamples),
  ...Object.values(frameworkExamples),
  ...Object.values(accessibilityExamples),
  ...Object.values(pageExamples),
];
