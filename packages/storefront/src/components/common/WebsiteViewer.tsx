import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { isDevEnvironment } from '@/utils/isDev';
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
// Local `patterns` workspace dev server (`npm run dev:patterns` in the examples repo). Its Vite root is `src`, so a
// GitHub Pages `viewPath` like `patterns/header/1` is served locally at `http://localhost:5173/header/1/`.
const LOCAL_PATTERNS_BASE = 'http://localhost:5173';

export const WebsiteViewer = ({ sourceCodePath, viewPath, title }: WebsiteViewerProps) => {
  const sourceCodeUrl = `${GITHUB_TREE_BASE}/v${localPorscheDesignSystemMajorVersion}/${sourceCodePath}`;
  const isLocalPattern = isDevEnvironment && viewPath.startsWith('patterns/');
  const viewUrl = isLocalPattern
    ? `${LOCAL_PATTERNS_BASE}/${viewPath.replace(/^patterns\//, '')}/`
    : `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${viewPath}`;

  return (
    <>
      <div className="flex flex-wrap gap-static-md mt-fluid-lg">
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
      </div>
      <iframe
        className="my-fluid-md w-full aspect-3/2 rounded-3xl shadow-high border border-[light-dark(transparent,var(--color-contrast-lower))]"
        title={title}
        src={viewUrl}
      />
    </>
  );
};
