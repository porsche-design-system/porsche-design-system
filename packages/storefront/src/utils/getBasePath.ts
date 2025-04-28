/**
 * Returns the base path for the application based on the GitHub branch.
 *
 * Behavior:
 * - If the GitHub branch is `'main'`, returns `'nightly'`.
 * - Otherwise, returns the current branch name from `process.env.NEXT_PUBLIC_BASE_PATH`.
 * - If `NEXT_PUBLIC_BASE_PATH` is not defined, returns empty string ''.
 *
 * Notes:
 * - The returned path does **not** include leading or trailing slashes.
 *
 * @returns {string} The base path to use in routing or deployment, or '' if the branch name is not available.
 */
export const getBasePath = (): string => {
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    // Use branch name as base path expect for main where it needs to be nightly
    if (process.env.NEXT_PUBLIC_BASE_PATH === 'main') return 'nightly';
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  return '';
};
