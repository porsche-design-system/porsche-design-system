'use client';

import {
  PButtonPure,
  PLinkPure,
  PPopover,
  PSpinner,
  PTabsBar,
  PText,
  type TabsBarUpdateEventDetail,
} from '@porsche-design-system/components-react/ssr';
import { openExampleInStackblitz } from '@porsche-design-system/stackblitz';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
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

/** The files of an example's project the code view shows, in the order of its tabs. */
const codeFiles: { file: string; name: string; language: CodeLanguage }[] = [
  { file: 'index.html', name: 'HTML', language: 'html' },
  { file: 'style.css', name: 'CSS', language: 'css' },
  { file: 'main.js', name: 'JS', language: 'js' },
];

type ExamplePayloadState = { payload: ExamplePayload | null; hasFailed: boolean };

/**
 * Loads the StackBlitz payload of an example, which both the code view and StackBlitz are fed from – it holds the
 * project's files verbatim.
 *
 * Fetched when the viewer mounts, not on click: `sdk.openProject()` opens a new tab, which needs the user activation
 * of the click – an `await fetch()` in between lets that expire and the popup blocker step in, notably in Safari.
 * Without an example, as in the framework mode, nothing is fetched.
 */
const useExamplePayload = (example: ExamplePath | null): ExamplePayloadState => {
  const [state, setState] = useState<ExamplePayloadState>({ payload: null, hasFailed: false });

  useEffect(() => {
    if (!example) return;
    let isCurrent = true;
    setState({ payload: null, hasFailed: false });

    fetch(getExamplePayloadUrl(example, getBasePath()))
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((payload: ExamplePayload) => isCurrent && setState({ payload, hasFailed: false }))
      .catch((error: Error) => {
        console.error(`Could not load the StackBlitz project of "${example}": ${error.message}`);
        if (isCurrent) setState({ payload: null, hasFailed: true });
      });

    return () => {
      isCurrent = false;
    };
  }, [example]);

  return state;
};

/** Opens an example in StackBlitz, busy until its payload is there. */
const OpenExampleInStackblitz = ({ payload, hasFailed }: ExamplePayloadState) => {
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

/** Sizes the preview and the code alike, so switching between them does not move the page. */
const VIEW_HEIGHT = 'h-150 max-h-[80vh]';

/**
 * The code of an example in the file its tab selected, as long as the payload is loading or failed to load a
 * placeholder of the same size.
 */
const ExampleCode = ({
  payload,
  hasFailed,
  codeFile: { file, name, language },
  title,
}: ExamplePayloadState & { codeFile: (typeof codeFiles)[number]; title: string }) => {
  if (!payload) {
    return (
      <div className={`${VIEW_HEIGHT} grid place-items-center rounded-3xl bg-surface`}>
        {hasFailed ? (
          <PText>The code could not be loaded.</PText>
        ) : (
          <PSpinner aria={{ 'aria-label': `Loading the code of ${title}` }} />
        )}
      </div>
    );
  }

  return (
    <CodeBlock language={language} label={`${name} of ${title}`} heightClassName={VIEW_HEIGHT}>
      {payload.files[file] ?? ''}
    </CodeBlock>
  );
};

export const WebsiteViewer = (props: WebsiteViewerProps) => {
  const { title } = props;
  const isExample = 'example' in props;
  const viewUrl = isExample
    ? getExampleUrl(props.example, getBasePath())
    : `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${props.viewPath}`;

  const { trackRef, width, setWidth, isResizing, handleProps } = useResizeHandle({ minWidth: MIN_WIDTH });
  const examplePayload = useExamplePayload(isExample ? props.example : null);
  // 0 is the preview, every other tab one of `codeFiles`.
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const codeFile = activeTabIndex > 0 ? codeFiles[activeTabIndex - 1] : null;

  // From the example rather than `useId()`, whose ids differ between the server render and the client here – the
  // `aria-labelledby` set on a tab change would then miss the ids the tabs were rendered with.
  const id = isExample ? `example-${props.example.replaceAll('/', '-')}` : '';
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
            <OpenExampleInStackblitz {...examplePayload} />
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
            {codeFile && <ExampleCode {...examplePayload} codeFile={codeFile} title={title} />}
          </div>
        </>
      ) : (
        preview
      )}
    </div>
  );
};
