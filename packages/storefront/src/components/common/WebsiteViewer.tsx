'use client';

import { PButtonPure, PLinkPure, PTag } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { useResizeHandle } from '@/hooks/useResizeHandle';
import { localPorscheDesignSystemMajorVersion } from '@/utils/porscheDesignSystemVersion';

type WebsiteViewerProps = {
  /** Path segment appended to the GitHub examples tree URL, e.g. "templates/src/landing-page/1" */
  sourceCodePath: string;
  /** Path segment appended to the GitHub Pages examples URL, e.g. "templates/landing-page/1" */
  viewPath: string;
  /** Accessible title for the iframe */
  title: string;
};

const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
const MIN_WIDTH = 320;

export const WebsiteViewer = ({ sourceCodePath, viewPath, title }: WebsiteViewerProps) => {
  const sourceCodeUrl = `${GITHUB_TREE_BASE}/v${localPorscheDesignSystemMajorVersion}/${sourceCodePath}`;
  const viewUrl = `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${viewPath}`;

  const { trackRef, width, setWidth, isResizing, handleProps } = useResizeHandle({ minWidth: MIN_WIDTH });

  return (
    <div className="mt-fluid-lg grid gap-fluid-md">
      <div className="flex flex-wrap gap-static-md">
        <PLinkPure icon="external">
          <Link href={sourceCodeUrl} target="_blank">
            Source Code
          </Link>
        </PLinkPure>
        <PLinkPure icon="external">
          <Link href={viewUrl} target="_blank">
            View Fullscreen
          </Link>
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
