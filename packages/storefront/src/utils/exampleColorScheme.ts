import type { ExampleProject } from '@porsche-design-system/examples';
import type { ColorScheme } from '@porsche-design-system/shared';

/**
 * Whether the storefront shows an example in the color scheme its visitor chose.
 *
 * An example sets no scheme on its `<html>`, since that is the decision of the application it is copied into, so it
 * renders light on its own. Only one built for the dark scheme as well – `colorSchemes` of its meta – gets the scheme
 * of the storefront: in the preview, and in the project StackBlitz opens.
 */
export const followsStorefrontColorScheme = ({ colorSchemes }: Pick<ExampleProject, 'colorSchemes'>): boolean =>
  !!colorSchemes?.includes('dark');

/**
 * The project of an example as StackBlitz opens it from the storefront: with the scheme its visitor chose on the
 * `<html>` of its `index.html`, so the project looks like the preview it was opened from. Left as it is for an example
 * built for the light scheme only. The code view and the knowledge skill keep the files without a scheme.
 */
export const withColorScheme = <Project extends ExampleProject>(
  project: Project,
  colorScheme: ColorScheme
): Project => {
  const html = project.files['index.html'];
  if (!followsStorefrontColorScheme(project) || html === undefined) {
    return project;
  }

  return {
    ...project,
    files: {
      ...project.files,
      'index.html': html.replace('<html lang="en">', `<html lang="en" class="${colorScheme}">`),
    },
  };
};
