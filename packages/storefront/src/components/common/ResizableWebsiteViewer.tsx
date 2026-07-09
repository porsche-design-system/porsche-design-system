'use client';

import { PButtonPure, PLinkPure, PText } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { type PointerEvent as ReactPointerEvent, useRef, useState } from 'react';
import { isDevEnvironment } from '@/utils/isDev';
import { localPorscheDesignSystemMajorVersion } from '@/utils/porscheDesignSystemVersion';

type ResizableWebsiteViewerProps = {
  /** Path segment appended to the GitHub examples tree URL, e.g. "patterns/src/popover/1" */
  sourceCodePath: string;
  /** Path segment appended to the GitHub Pages examples URL, e.g. "patterns/popover/1" */
  viewPath: string;
  /** Accessible title for the iframe */
  title: string;
};

const GITHUB_TREE_BASE = 'https://github.com/porsche-design-system/examples/tree';
const GITHUB_PAGES_BASE = 'https://porsche-design-system.github.io/examples';
// Local `patterns` workspace dev server (`npm run dev:patterns` in the examples repo). Its Vite root is `src`, so a
// GitHub Pages `viewPath` like `patterns/popover/1` is served locally at `http://localhost:5173/popover/1/`.
const LOCAL_PATTERNS_BASE = 'http://localhost:5173';
const MIN_WIDTH = 320;

/**
 * Like `WebsiteViewer`, but the embedded iframe can be dragged narrower via a handle on its right edge to preview
 * responsive/mobile behavior without resizing the browser. Because the example lives in an iframe (its own viewport),
 * shrinking the frame drives the example's own responsive logic (media queries, ResizeObserver, …) live.
 */
export const ResizableWebsiteViewer = ({ sourceCodePath, viewPath, title }: ResizableWebsiteViewerProps) => {
  const sourceCodeUrl = `${GITHUB_TREE_BASE}/v${localPorscheDesignSystemMajorVersion}/${sourceCodePath}`;
  const isLocalPattern = isDevEnvironment && viewPath.startsWith('patterns/');
  const viewUrl = isLocalPattern
    ? `${LOCAL_PATTERNS_BASE}/${viewPath.replace(/^patterns\//, '')}/`
    : `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${viewPath}`;

  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null); // null = full width
  const [isResizing, setIsResizing] = useState(false);

  const startResize = (e: ReactPointerEvent<HTMLElement>) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);
    setIsResizing(true);

    const trackLeft = track.getBoundingClientRect().left;
    const maxWidth = track.clientWidth - 24; // keep room for the handle bar column

    const onMove = (ev: PointerEvent) => {
      setWidth(Math.min(maxWidth, Math.max(MIN_WIDTH, ev.clientX - trackLeft)));
    };
    const onUp = () => {
      handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      setIsResizing(false);
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  };

  return (
    <div className="my-fluid-md">
      <div className="flex flex-wrap gap-static-md items-center mb-static-sm">
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
            <PText size="x-small" color="contrast-medium">
              {Math.round(width)}px
            </PText>
            <PButtonPure icon="reset" onClick={() => setWidth(null)}>
              Reset width
            </PButtonPure>
          </>
        )}
      </div>

      <div ref={trackRef} className="flex items-stretch w-full">
        <div
          className="relative min-w-0"
          style={width !== null ? { flex: `0 0 ${width}px`, maxWidth: '100%' } : { flex: '1 1 0%' }}
        >
          <iframe
            className="w-full h-[600px] max-h-[80vh] rounded-3xl shadow-high border border-[light-dark(transparent,var(--color-contrast-lower))]"
            style={{ pointerEvents: isResizing ? 'none' : undefined }}
            title={title}
            src={viewUrl}
          />
        </div>
        <div
          className="group flex w-6 shrink-0 items-center justify-center cursor-ew-resize touch-none"
          onPointerDown={startResize}
          role="separator"
          aria-orientation="vertical"
          aria-label="Drag to resize preview"
        >
          <span className="h-10 w-[6px] rounded-full bg-[var(--color-contrast-medium)] transition-colors group-hover:bg-[var(--color-contrast-high)]" />
        </div>
      </div>
    </div>
  );
};
