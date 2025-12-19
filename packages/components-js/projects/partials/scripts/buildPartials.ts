import * as fs from 'fs';
import * as path from 'path';
import { CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../cdn.config';
import { generateComponentChunkLinksPartial } from './generateComponentChunkLinksPartial';
import { generateFontLinksPartial } from './generateFontLinksPartial';
import { generateIconLinksPartial } from './generateIconLinksPartial';
import { generateLoaderScriptPartial } from './generateLoaderScriptPartial';
import { generateMetaTagsAndIconLinksPartial } from './generateMetaTagsAndIconLinksPartial';

const generateSharedCode = (): string => {
  return `import type { Cdn, FormatWithCSP, FormatWithJS } from '../shared';
import { throwIfRunInBrowser, getSha256Hash } from '../shared';

const getCdnBaseUrl = (cdn: Cdn): string => (cdn === 'cn' ? '${CDN_BASE_URL_CN}' : '${CDN_BASE_URL_COM}');

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
    generateFontLinksPartial(),
    generateComponentChunkLinksPartial(),
    generateMetaTagsAndIconLinksPartial(),
    generateIconLinksPartial(),
    generateLoaderScriptPartial(),
  ].join('\n\n');

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.writeFileSync(targetFile, content);
};

generatePartials().catch((e) => {
  console.error(e);
  process.exit(1);
});
