import { consoleWarn } from '../log';

// Timout after which the version validation will happen to increase changes of different versions being loaded and initialized
export const VERSION_VALIDATION_TIMEOUT = 3000;

/**
 * Validates the versions of the Porsche Design System and logs a warning if multiple different versions are detected.
 *
 * This is in particular problematic since multiple versions can initialize at different times.
 * You cannot know when all versions are initialized and versions can be loaded only on particular pages. You have to consider having a mix of versions with the validation logic and without.
 * You would need to detect changes to the document.porscheDesignSystem object and fire a validation on every change.
 * This would be possible with a proxy which is only created once, but it would still only warn about the versions initialized at the time.
 * Also, it makes it difficult to change the implementation in the future since it cannot be overwritten by another proxy.
 * Another approach could be using the stencil 'appload' event (https://stenciljs.com/docs/api), which is already included in older versions of the design system.
 * More information about other implementations can be found in the PR: https://github.com/porsche-design-system/porsche-design-system/pull/2867
 */
export const validateVersions = (): void => {
  // Uses a timeout to increase the chances that all used versions are loaded and initialized
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cdn, ...versions } = document.porscheDesignSystem;
    if (Object.keys(versions).length > 1) {
      consoleWarn(
        'Multiple different versions detected!\nWhile bootstrapping multiple versions is valid, it's highly recommended to upgrade all instances to the latest version in use for the best performance.\nRefer to the document.porscheDesignSystem object for detailed information on the current versions in use.\n',
        document.porscheDesignSystem
      );
    }
  }, VERSION_VALIDATION_TIMEOUT);
};
