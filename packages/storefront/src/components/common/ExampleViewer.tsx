import type { ExamplePath } from '@porsche-design-system/examples';
import { P } from '@/components/common/MdxTypography';
import { WebsiteViewer } from '@/components/common/WebsiteViewer';
import { getExample, getExampleMediaPath, getExampleUrl } from '@/utils/examples';
import { getBasePath } from '@/utils/getBasePath';

type ExampleViewerProps = {
  /** A pattern or template of `@porsche-design-system/examples`, e.g. "patterns/header/overlay". */
  example: ExamplePath;
};

/**
 * A pattern or template, introduced by its description and framed by `WebsiteViewer` under its title.
 *
 * Everything shown is imported from `@porsche-design-system/examples` at build time – the meta and the files of the
 * project the code view shows and StackBlitz opens – so the MDX of a page names the example and nothing else. A server
 * component on purpose: the package export holds every example, and only the one shown is handed to the client.
 */
export const ExampleViewer = ({ example: path }: ExampleViewerProps) => {
  const basePath = getBasePath();
  const example = getExample(path, basePath);

  return (
    <>
      <P>{example.description}</P>
      <WebsiteViewer example={example} src={getExampleUrl(path, basePath)} mediaPath={getExampleMediaPath(basePath)} />
    </>
  );
};
