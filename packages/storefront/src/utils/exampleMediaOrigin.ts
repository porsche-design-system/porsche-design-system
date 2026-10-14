import type { ExampleProject } from '@porsche-design-system/examples';

/**
 * The project of an example as StackBlitz needs it: with the origin in front of every media path.
 *
 * The iframe is same-origin, so `/v4/examples/media/718.webp` is enough there. The WebContainer is not: it loads the
 * media cross-origin from this very deployment, which is why the origin is added here, at click time, rather than at
 * build time – one build serves local development, previews and production, and only the running page knows where
 * it is.
 *
 * Kept apart from `examples.ts`, which imports every example, so a client component can use it: `mediaPath` is the one
 * of this deployment, slug included – see `getExampleMediaPath()`.
 */
export const withMediaOrigin = <Project extends ExampleProject>(
  project: Project,
  origin: string,
  mediaPath: string
): Project => ({
  ...project,
  files: Object.fromEntries(
    Object.entries(project.files).map(([file, content]) => [
      file,
      content.replaceAll(mediaPath, `${origin}${mediaPath}`),
    ])
  ),
});
