import { CDN_BASE_PATH_COMPONENTS } from '../../../../../cdn.config';
import { COMPONENT_CHUNKS_MANIFEST, COMPONENT_CHUNK_NAMES } from '../../components-wrapper';

export const generateComponentChunkLinksPartial = (): string => {
  const chunkNamesTypeLiteral = COMPONENT_CHUNK_NAMES.map((x) => `'${x}'`).join(' | ');
  // 'any' is fallback when COMPONENT_CHUNK_NAMES is an empty array because components-js wasn't built, yet
  const types = `type ComponentChunkName = ${chunkNamesTypeLiteral || 'any'};

type GetComponentChunkLinksOptions = {
  components?: ComponentChunkName[];
  cdn?: Cdn;
  format?: FormatWithJS;
};`;

  const func = `export function getComponentChunkLinks(opts: GetComponentChunkLinksOptions & { format: 'js' }): PartialLink[];
export function getComponentChunkLinks(opts: GetComponentChunkLinksOptions & { format: 'jsx' }): JSX.Element;
export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptions): string;
export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptions): string | JSX.Element | PartialLink[] {
  const { components, cdn, format }: GetComponentChunkLinksOptions = {
    components: [],
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getComponentChunkLinks');

  const supportedComponentChunkNames: ComponentChunkName[] = ${JSON.stringify(COMPONENT_CHUNK_NAMES)};
  const invalidComponentChunkNames = components.filter((x) => !supportedComponentChunkNames.includes(x));

  if (invalidComponentChunkNames.length) {
    throw new Error(\`[Porsche Design System] The following supplied component chunk names are invalid:
  \${invalidComponentChunkNames.join(', ')}

Please use only valid component chunk names:
  \${supportedComponentChunkNames.join(', ')}\`);
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifest = ${JSON.stringify(COMPONENT_CHUNKS_MANIFEST)};
  const urls = ['core'].concat(components).map((cmp) => \`\${cdnBaseUrl}/${CDN_BASE_PATH_COMPONENTS}/\${manifest[cmp as keyof typeof manifest]}\`);

  const linksHtml = urls
    // core needs crossorigin attribute / we need ternary otherwise false is written into link
    .map((url, idx) => \`<link rel=preload href=\${url} as=script\${idx === 0 ? ' crossorigin' : ''}>\`)
    .join('');

  if (format === 'html') {
    return linksHtml;
  } else if (format === 'jsx') {
    const linksJsx = urls.map((url, index) => <link key={index} rel="preload" href={url} as="script" {...(index === 0 && { crossOrigin: '' })} />);
    return <>{linksJsx}</>;
  } else {
    return urls.map((url, index) => ({ href: url, options: { as: 'script', ...(index === 0 && { crossOrigin: '' }) } } as PartialLink))
  }
}`;

  return [types, func].join('\n\n');
};
