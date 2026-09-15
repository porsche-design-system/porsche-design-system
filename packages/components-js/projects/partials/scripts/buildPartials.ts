import * as fs from 'fs';
import * as path from 'path';
import { generateComponentChunkLinksPartial } from './generateComponentChunkLinksPartial';
import { generateFontLinksPartial } from './generateFontLinksPartial';
import { generateIconLinksPartial } from './generateIconLinksPartial';
import { generateLoaderScriptPartial } from './generateLoaderScriptPartial';
import { generateMetaTagsAndIconLinksPartial } from './generateMetaTagsAndIconLinksPartial';

const generateSharedCode = (): string => {
  return `import type { JSX } from 'react';
import type { Cdn, FormatWithCSP, FormatWithJS } from '../shared';
import { throwIfRunInBrowser, getSha256Hash } from '../shared';

// Assets are served relative to the document, so the cdn option no longer affects the base url.
const getCdnBaseUrl = (_cdn: Cdn): string => './assets';

const convertPropsToAttributeString = (props: { [p: string]: string }): string =>
  Object.entries(props)
    .map(([attr, val]) => \`\${attr}\${val ? '=' + val : ''}\`)
    .join(' ');

type PreloadAs =
    | "audio"
    | "document"
    | "embed"
    | "fetch"
    | "font"
    | "image"
    | "object"
    | "track"
    | "script"
    | "style"
    | "video"
    | "worker";
type PreloadOptions = {
  as: PreloadAs;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
  imageSizes?: string | undefined;
  imageSrcSet?: string | undefined;
  integrity?: string | undefined;
  type?: string | undefined;
  nonce?: string | undefined;
  referrerPolicy?: ReferrerPolicy | undefined;
}

type PartialLink = {
  href: string;
  options?: PreloadOptions;
}`;
};

const generatePartials = async (): Promise<void> => {
  const targetDirectory = path.normalize('./src/lib');
  const targetFile = path.resolve(targetDirectory, 'partials.tsx');

  const content = [
    generateSharedCode(),
    await generateFontLinksPartial(),
    generateComponentChunkLinksPartial(),
    await generateMetaTagsAndIconLinksPartial(),
    await generateIconLinksPartial(),
    generateLoaderScriptPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
