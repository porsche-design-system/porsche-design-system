'use client';

import {
  PButtonPure,
  PLinkPure,
  PPopover,
  PTabsBar,
  type TabsBarUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
// Types only: the package exports every example, and a client component is handed the one it shows.
import type { Example } from '@porsche-design-system/examples';
import { openExampleInStackblitz } from '@porsche-design-system/stackblitz';
import Link from 'next/link';
import { useState } from 'react';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
import { useResizeHandle } from '@/hooks/useResizeHandle';
import { withMediaOrigin } from '@/utils/exampleMediaOrigin';
import { localPorscheDesignSystemMajorVersion } from '@/utils/porscheDesignSystemVersion';

type ExampleProps = {
  /**
   * A pattern or template of `@porsche-design-system/examples`, with its media below the slug of this deployment –
   * rendered by `ExampleViewer`. Its title names the iframe, its files are shown as code and opened in StackBlitz.
   */
  example: Example;
  /** The URL this deployment serves the built page at, from `public/examples/`. */
  src: string;
  /** Where this deployment serves the media of the examples, slug included. */
  mediaPath: string;
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

/** The files of an example's project the code view shows, in the order of its tabs. */
const codeFiles: { file: string; name: string; language: CodeLanguage }[] = [
  { file: 'index.html', name: 'HTML', language: 'html' },
  { file: 'style.css', name: 'CSS', language: 'css' },
  { file: 'main.js', name: 'JS', language: 'js' },
];

/** Opens an example in StackBlitz, with its media pointing at this deployment. */
const OpenExampleInStackblitz = ({ example, mediaPath }: Pick<ExampleProps, 'example' | 'mediaPath'>) => (
  <PButtonPure
    type="button"
    iconSource="assets/icon-stackblitz.svg"
    onClick={() => openExampleInStackblitz(withMediaOrigin(example, window.location.origin, mediaPath))}
    aria={{ 'aria-description': 'Opens in a new tab' }}
  >
    Open in StackBlitz
  </PButtonPure>
);

/** Sizes the preview and the code alike, so switching between them does not move the page. */
const VIEW_HEIGHT = 'h-150 max-h-[80vh]';

/** The code of an example in the file its tab selected. */
const ExampleCode = ({
  example: { title, files },
  codeFile: { file, name, language },
}: Pick<ExampleProps, 'example'> & { codeFile: (typeof codeFiles)[number] }) => (
  <CodeBlock language={language} label={`${name} of ${title}`} heightClassName={VIEW_HEIGHT}>
    {files[file] ?? ''}
  </CodeBlock>
);

export const WebsiteViewer = (props: WebsiteViewerProps) => {
  const isExample = 'example' in props;
  const title = isExample ? props.example.title : props.title;
  const viewUrl = isExample
    ? props.src
    : `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${props.viewPath}`;

  const { trackRef, width, setWidth, isResizing, handleProps } = useResizeHandle({ minWidth: MIN_WIDTH });
  // 0 is the preview, every other tab one of `codeFiles`.
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const codeFile = activeTabIndex > 0 ? codeFiles[activeTabIndex - 1] : null;

  // From the example rather than `useId()`, whose ids differ between the server render and the client here – the
  // `aria-labelledby` set on a tab change would then miss the ids the tabs were rendered with.
  const id = isExample ? `example-${props.example.path.replaceAll('/', '-')}` : '';
  const previewTabId = `${id}-preview-tab`;
  const previewPanelId = `${id}-preview`;
  const codeTabId = (name: string) => `${id}-${name}-tab`;
  const codePanelId = `${id}-code`;

  const preview = (
    <div ref={trackRef} className="min-w-0">
      <div className={`relative max-w-full ${VIEW_HEIGHT}`} style={{ width: width !== null ? `${width}px` : '100%' }}>
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
  );

  return (
    <div className="mt-fluid-lg grid gap-fluid-md">
      <div className="flex flex-wrap gap-static-md items-center justify-between">
        {isExample && (
          <div className="flex flex-wrap gap-static-sm items-center">
            <PTabsBar
              activeTabIndex={activeTabIndex}
              compact={true}
              background="surface"
              onUpdate={(e: CustomEvent<TabsBarUpdateEventDetail>) => setActiveTabIndex(e.detail.activeTabIndex)}
              aria={{ 'aria-label': `Select the view of ${title}` }}
            >
              <button id={previewTabId} type="button" aria-controls={previewPanelId}>
                Preview
              </button>
              {codeFiles.map(({ name }) => (
                <button key={name} id={codeTabId(name)} type="button" aria-controls={codePanelId}>
                  {name}
                </button>
              ))}
            </PTabsBar>
            <PPopover aria={{ 'aria-label': `About the setup of ${title}` }}>
              The examples are written with web platform technologies – <code>HTML</code>, <code>CSS</code> and{' '}
              <code>JavaScript</code> – but rely on Tailwind CSS, which requires a bundler such as Vite. Open the
              example in StackBlitz to explore the setup in detail and adapt it to your needs, e.g. for Next.js, Vue or
              Angular.
            </PPopover>
          </div>
        )}
        <div className="flex flex-wrap gap-static-md items-center">
          {isExample ? (
            <OpenExampleInStackblitz example={props.example} mediaPath={props.mediaPath} />
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
          {width !== null && !codeFile && (
            <PButtonPure icon="reset" onClick={() => setWidth(null)}>
              <span className="sr-only">Reset</span>
              {width}px
              <span className="sr-only">viewport width</span>
            </PButtonPure>
          )}
        </div>
      </div>
      {isExample ? (
        <>
          {/* Hidden rather than unmounted, so the example neither reloads nor loses its state on the way back. */}
          <div
            id={previewPanelId}
            role="tabpanel"
            aria-labelledby={previewTabId}
            hidden={!!codeFile}
            // Like the track inside, or the resized preview's width in px would widen the grid, toolbar included.
            className="min-w-0"
          >
            {preview}
          </div>
          {/* Rendered throughout, so the `aria-controls` of the code tabs always point at an element. A grid item
              grows to its longest line unless allowed to shrink, which would keep the code from scrolling. */}
          <div
            id={codePanelId}
            role="tabpanel"
            aria-labelledby={codeFile ? codeTabId(codeFile.name) : undefined}
            hidden={!codeFile}
            className="min-w-0"
          >
            {codeFile && <ExampleCode example={props.example} codeFile={codeFile} />}
          </div>
        </>
      ) : (
        preview
      )}
    </div>
  );
};
