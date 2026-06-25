import type { ReactElement } from 'react';

/**
 * Stand-in for a compiled MDX module whose embedded components are *directly
 * imported* (so they bypass the `components` prop and actually render their own
 * markup). Exercises the render module's drop-list: the `<nav>`, the PDS web
 * component (`<p-tag>`), and the `<button>` must not leak into the markdown,
 * while the surrounding prose survives.
 */
export const NoiseComponent = (): ReactElement => (
  <>
    <h2>Usage</h2>
    <nav aria-label="Table of contents">
      <ul>
        <li>
          <a href="#usage">Usage</a>
        </li>
      </ul>
    </nav>
    <p>
      Use the <code>variant</code> prop to change appearance.
      <p-tag color="primary">status</p-tag>
    </p>
    <button type="button">Toggle</button>
    <ul>
      <li>Keep prose readable.</li>
    </ul>
  </>
);
