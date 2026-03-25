import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
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

export const WebsiteViewer = ({ sourceCodePath, viewPath, title }: WebsiteViewerProps) => {
  const sourceCodeUrl = `${GITHUB_TREE_BASE}/v${localPorscheDesignSystemMajorVersion}/${sourceCodePath}`;
  const viewUrl = `${GITHUB_PAGES_BASE}/v${localPorscheDesignSystemMajorVersion}/${viewPath}`;

  return (
    <>
      <div className="flex flex-wrap gap-static-md mt-fluid-lg">
        <PLinkPure icon="external">
          <Link href={sourceCodeUrl}>Source Code</Link>
        </PLinkPure>
        <PLinkPure icon="external">
          <Link href={viewUrl}>View Fullscreen</Link>
        </PLinkPure>
      </div>

      <iframe className="my-fluid-md w-full aspect-3/2 rounded-4xl shadow-high" title={title} src={viewUrl} />
    </>
  );
};

