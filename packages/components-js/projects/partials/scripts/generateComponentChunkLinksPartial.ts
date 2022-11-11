import { COMPONENT_CHUNK_NAMES, COMPONENT_CHUNKS_MANIFEST } from '../../components-wrapper';
import { CDN_BASE_PATH_COMPONENTS } from '../../../../../cdn.config';
import { withoutTagsOption } from './utils';

export const generateComponentChunkLinksPartial = (): string => {
  const chunkNamesTypeLiteral = COMPONENT_CHUNK_NAMES.map((x) => `'${x}'`).join(' | ');
  // 'any' is fallback when COMPONENT_CHUNK_NAMES is an empty array because components-js wasn't built, yet
  const types = `type ComponentChunkName = ${chunkNamesTypeLiteral || 'any'};

type GetComponentChunkLinksOptions = {
  components?: ComponentChunkName[];
  cdn?: Cdn;
  ${withoutTagsOption}
  format?: Format;
};
type GetComponentChunkLinksOptionsFormatHtml = Omit<GetComponentChunkLinksOptions, 'withoutTags'> & { format: 'html' };
type GetComponentChunkLinksOptionsFormatJsx = Omit<GetComponentChunkLinksOptions, 'withoutTags'> & { format: 'jsx' };
type GetComponentChunkLinksOptionsWithoutTags = Omit<GetComponentChunkLinksOptions, 'format'>;`;

  const func = `export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptionsFormatJsx): JSX.Element;
export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptionsFormatHtml): string;
export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptionsWithoutTags): string[];
export function getComponentChunkLinks(opts?: GetComponentChunkLinksOptions): string | string[] | JSX.Element {
  const { components, cdn, withoutTags, format }: GetComponentChunkLinksOptions = {
    components: [],
    cdn: 'auto',
    withoutTags: false,
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getComponentChunkLinks');

  const scriptAttributes = 'data-pds-core-chunk-link ';
  const scriptProps = { 'data-pds-core-chunk-link': 'true' };

  const supportedComponentChunkNames: ComponentChunkName[] = ${JSON.stringify(COMPONENT_CHUNK_NAMES)};
  const invalidComponentChunkNames = components.filter((x) => !supportedComponentChunkNames.includes(x));

  if (invalidComponentChunkNames.length) {
    throw new Error(\`The following supplied component chunk names are invalid:
  \${invalidComponentChunkNames.join(', ')}

Please use only valid component chunk names:
  \${supportedComponentChunkNames.join(', ')}\`);
  }

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const manifest = ${JSON.stringify(COMPONENT_CHUNKS_MANIFEST)};

  const componentNameAndCDNUrl = ['core'].concat(components).map((cmp) => ({ cmpName: cmp, url: \`\${cdnBaseUrl}/${CDN_BASE_PATH_COMPONENTS}/\${manifest[cmp]}\` }));
  const urls = componentNameAndCDNUrl.map(({url}) => url )

  const linksHtml = componentNameAndCDNUrl
    // core needs crossorigin attribute / we need ternary otherwise false is written into link
    .map(({ cmpName, url }, idx) => \`<link rel=preload href=\${url} as=script\${idx === 0 ? \` \$\{scriptAttributes\}crossorigin\` : \` data-\$\{cmpName\}-chunk-link\`}>\`)
    .join('');

  const linksJsx = componentNameAndCDNUrl.map(({ cmpName, url }, index) => <link key={index} rel="preload" href={url} as="script" {...(index === 0 ? { crossOrigin: 'true', ...scriptProps } : { [\`data-\${cmpName}-chunk-link\`]: 'true' })} />);

  const markup = format === 'html' ? linksHtml : <>{linksJsx}</>;

  return withoutTags ? urls : markup;
}`;

  return [types, func].join('\n\n');
};
