'use client';

import { PButtonPure, PLinkPure, PTag } from '@porsche-design-system/components-react/ssr';
import { openExampleInStackblitz } from '@porsche-design-system/stackblitz';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useResizeHandle } from '@/hooks/useResizeHandle';
import {
  type ExamplePath,
  type ExamplePayload,
  getExamplePayloadUrl,
  getExampleUrl,
  withMediaOrigin,
} from '@/utils/examples';
import { getBasePath } from '@/utils/getBasePath';
import { localPorscheDesignSystemMajorVersion } from '@/utils/porscheDesignSystemVersion';

type ExampleProps = {
  /**
   * A pattern or template of `@porsche-design-system/examples`, e.g. "patterns/header/overlay". Served by this
   * deployment from `public/examples/`, and opened in StackBlitz as the project it was built from.
   */
  example: ExamplePath;
  /** Accessible title for the iframe */
  title: string;
};

type ExternalProps = {
  /** Path segment appended to the GitHub examples tree URL, e.g. "frameworks/vue" */
  sourceCodePath: string;
  /** Path segment appended to the GitHub Pages examples URL, e.g. "vue" */
  viewPath: string;
  /** Accessible title for the iframe */
  title: string;
};

type WebsiteViewerProps = ExampleProps | ExternalProps;

// The framework apps still live in, and are deployed from, the examples repository.
const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
const MIN_WIDTH = 320;

/**
 * Opens an example in StackBlitz.
 *
 * The payload is fetched when the viewer mounts, not on click: `sdk.openProject()` opens a new tab, which needs the
 * user activation of the click – an `await fetch()` in between lets that expire and the popup blocker step in,
 * notably in Safari. The button is therefore busy until the payload is there.
 */
const OpenExampleInStackblitz = ({ example }: { example: ExamplePath }) => {
  const [payload, setPayload] = useState<ExamplePayload | null>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    fetch(getExamplePayloadUrl(example, getBasePath()))
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((data: ExamplePayload) => isCurrent && setPayload(data))
      .catch((error: Error) => {
        console.error(`Could not load the StackBlitz project of "${example}": ${error.message}`);
        if (isCurrent) setHasFailed(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [example]);

  const onOpen = () => {
    if (payload) {
      openExampleInStackblitz(withMediaOrigin(payload, window.location.origin, getBasePath()));
    }
  };

  return (
    <PButtonPure
      type="button"
      iconSource="assets/icon-stackblitz.svg"
      loading={!payload && !hasFailed}
      disabled={hasFailed}
      onClick={onOpen}
      aria={{ 'aria-description': 'Opens in a new tab' }}
    >
      Open in StackBlitz
    </PButtonPure>
  );
};

export const WebsiteViewer = (props: WebsiteViewerProps) => {
  const { title } = props;
  const isExample = 'example' in props;
  const viewUrl = isExample
    ? getExampleUrl(props.example, getBasePath())
    : `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${props.viewPath}`;

  const { trackRef, width, setWidth, isResizing, handleProps } = useResizeHandle({ minWidth: MIN_WIDTH });

  return (
    <div className="mt-fluid-lg grid gap-fluid-md">
      <div className="flex flex-wrap gap-static-md">
        {isExample ? (
          <OpenExampleInStackblitz example={props.example} />
        ) : (
          <PLinkPure icon="external">
            <Link
              href={`${GITHUB_TREE_BASE}/v${localPorscheDesignSystemMajorVersion}/${props.sourceCodePath}`}
              target="_blank"
            >
              Source Code
            </Link>
          </PLinkPure>
        )}
        <PLinkPure icon="external">
          {/* A plain anchor: an example is a file in `public/`, not a route `next/link` could navigate to. */}
          <a href={viewUrl} target="_blank" rel="noopener">
            View Fullscreen
          </a>
        </PLinkPure>
        {width !== null && (
          <>
            <PTag variant="secondary" compact={true}>
              {width}px
            </PTag>
            <PButtonPure icon="reset" onClick={() => setWidth(null)}>
              Reset width
            </PButtonPure>
          </>
        )}
      </div>
      <div ref={trackRef} className="min-w-0">
        <div
          className="relative max-w-full h-150 max-h-[80vh]"
          style={{ width: width !== null ? `${width}px` : '100%' }}
        >
          <div
            // Absolutely positioned so it doesn't reserve layout space and the iframe can consume 100% width.
            className="group absolute inset-y-0 -inset-e-6 w-6 flex items-center justify-center cursor-ew-resize touch-none focus:outline-none"
            {...handleProps}
          >
            <span className="h-10 w-1.5 rounded-full bg-contrast-medium transition-colors group-hover:bg-contrast-high group-focus-visible:outline outline-focus outline-offset-2" />
          </div>
          <iframe
            // While resizing, disable the iframe's pointer events so it doesn't swallow the drag.
            className={`w-full h-full rounded-3xl shadow-high border border-[light-dark(transparent,var(--color-contrast-lower))] ${isResizing ? 'pointer-events-none' : 'pointer-events-auto'}`}
            title={title}
            src={viewUrl}
          />
        </div>
      </div>
    </div>
  );
};
