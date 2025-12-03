import { kebabCase } from 'change-case';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { globbySync } from 'globby';
import { gzipSizeSync } from 'gzip-size';
import * as path from 'path';
import { format } from 'prettier';
import { type Config, optimize } from 'svgo';
import { CDN_BASE_PATH_FLAGS } from '../../../../../cdn.config';
import { config } from '../svgo.config';

type Manifest = {
  [name: string]: string;
};
type FlagsMap = Manifest;

const flagsIso3166 = {
  ad: 'Andorra',
  ae: 'United Arab Emirates',
  al: 'Albania',
  am: 'Armenia',
  ar: 'Argentina',
  at: 'Austria',
  au: 'Australia',
  az: 'Azerbaijan',
  ba: 'Bosnia and Herzegovina',
  bd: 'Bangladesh',
  be: 'Belgium',
  bg: 'Bulgaria',
  bh: 'Bahrain',
  bn: 'Brunei',
  bo: 'Bolivia',
  br: 'Brazil',
  by: 'Belarus',
  ca: 'Canada',
  ch: 'Switzerland',
  cl: 'Chile',
  cn: 'China',
  co: 'Colombia',
  cr: 'Costa Rica',
  cw: 'Curacao',
  cy: 'Cyprus',
  cz: 'Czechia',
  de: 'Germany',
  dk: 'Denmark',
  do: 'Dominican Republic',
  dz: 'Algeria',
  ec: 'Ecuador',
  ee: 'Estonia',
  eg: 'Egypt',
  es: 'Spain',
  fi: 'Finland',
  fr: 'France',
  gb: 'United Kingdom',
  ge: 'Georgia',
  gi: 'Gibraltar',
  gh: 'Ghana',
  gr: 'Greece',
  gt: 'Guatemala',
  hk: 'Hong Kong',
  hn: 'Honduras',
  hr: 'Croatia',
  ht: 'Haiti',
  hu: 'Hungary',
  id: 'Indonesia',
  ie: 'Ireland',
  il: 'Israel',
  in: 'India',
  is: 'Iceland',
  it: 'Italy',
  jm: 'Jamaica',
  jo: 'Jordan',
  jp: 'Japan',
  ke: 'Kenya',
  kh: 'Cambodia',
  kr: 'South Korea',
  kw: 'Kuwait',
  kz: 'Kazakhstan',
  lb: 'Lebanon',
  li: 'Liechtenstein',
  lk: 'Sri Lanka',
  lt: 'Lithuania',
  lu: 'Luxembourg',
  lv: 'Latvia',
  ma: 'Morocco',
  mc: 'Monaco',
  md: 'Moldova',
  me: 'Montenegro',
  mk: 'North Macedonia',
  mn: 'Mongolia',
  mo: 'Macao',
  mq: 'Martinique',
  mt: 'Malta',
  mu: 'Mauritius',
  mx: 'Mexico',
  my: 'Malaysia',
  ng: 'Nigeria',
  nl: 'Netherlands',
  no: 'Norway',
  nz: 'New Zealand',
  om: 'Oman',
  pa: 'Panama',
  pe: 'Peru',
  pf: 'French Polynesia',
  ph: 'Philippines',
  pk: 'Pakistan',
  pl: 'Poland',
  pr: 'Puerto Rico',
  pt: 'Portugal',
  py: 'Paraguay',
  qa: 'Qatar',
  re: 'Réunion',
  ro: 'Romania',
  rs: 'Serbia',
  ru: 'Russia',
  sa: 'Saudi Arabia',
  se: 'Sweden',
  sg: 'Singapore',
  si: 'Slovenia',
  sk: 'Slovakia',
  sv: 'El Salvador',
  th: 'Thailand',
  tn: 'Tunisia',
  tr: 'Turkey',
  tt: 'Trinidad and Tobago',
  tw: 'Taiwan, Province of China',
  ua: 'Ukraine',
  us: 'United States of America',
  uy: 'Uruguay',
  uz: 'Uzbekistan',
  ve: 'Venezuela',
  vn: 'Vietnam',
  za: 'South Africa',
  xx: 'Unknown or Invalid Region',
};

const toHash = (str: string): string => crypto.createHash('md5').update(str, 'utf8').digest('hex').substring(0, 7);

type Stats = { name: string; size: number; gzipSize: number };
const stats: Stats[] = [];
const statsDir = path.normalize('./tests/unit/results');
const statsPath = path.normalize(`${statsDir}/stats.json`);

const createManifestAndOptimizeFlags = async (files: string[], config: Config): Promise<void> => {
  fs.rmSync(path.normalize('./dist'), { force: true, recursive: true });
  fs.mkdirSync(path.normalize('./dist/flags'), { recursive: true });

  const manifest: Manifest = {};
  const flagsMap: FlagsMap = {};

  for (const file of files) {
    const svgRawPath = path.normalize(file);
    const svgRawName = path.basename(svgRawPath, '.svg');
    const svgRawData = fs.readFileSync(svgRawPath, 'utf8');
    const svgOptimizedData = optimize(svgRawData, config).data;
    const svgOptimizedHash = toHash(svgOptimizedData);
    const svgOptimizedFilename = `${svgRawName}.${svgOptimizedHash}.svg`;
    const svgOptimizedPath = path.normalize(`./dist/flags/${svgOptimizedFilename}`);

    if (svgRawName !== kebabCase(svgRawName)) {
      throw new Error(`Flag name "${svgRawName}" does not fit naming convention »param-case«.`);
    }
    if (svgRawName in manifest) {
      throw new Error(`Flag name "${svgRawName}" is not unique.`);
    }

    manifest[svgRawName] = svgOptimizedFilename;
    flagsMap[svgRawName] = svgOptimizedData;

    fs.writeFileSync(svgOptimizedPath, svgOptimizedData, 'utf8');

    // TODO: we should create a shared and standardized stats generator for all assets
    stats.push({
      name: svgRawName,
      size: Buffer.byteLength(svgOptimizedData),
      gzipSize: gzipSizeSync(svgOptimizedData),
    });

    const svgRawSize = fs.statSync(svgRawPath).size;
    const svgOptimizedSize = fs.statSync(svgOptimizedPath).size;
    const svgSizeDiff = svgOptimizedSize - svgRawSize;

    console.log(
      `Flag "${svgRawName}" optimized: ${
        svgSizeDiff < 0 ? svgSizeDiff : '+' + svgSizeDiff
      } bytes (size: ${svgOptimizedSize} bytes)`
    );

    if (svgRawName !== 'xx' && svgOptimizedSize > 3000) {
      throw new Error(`Flag "${svgRawName}" is too large.`);
    }
  }

  fs.rmSync(statsDir, { force: true, recursive: true });
  fs.mkdirSync(statsDir, { recursive: true });
  fs.writeFileSync(statsPath, await format(JSON.stringify(stats), { parser: 'json' }), 'utf8');
  console.log(`Write optimized flag stats into "${statsPath}"`);

  const sortedManifestKeys = Object.keys(manifest).sort();
  const sortedManifest: Manifest = sortedManifestKeys.reduce((result, key) => {
    result[key] = manifest[key];
    return result;
  }, {} as Manifest);

  fs.writeFileSync(
    path.normalize('./index.ts'),
    `export const CDN_BASE_PATH = '/${CDN_BASE_PATH_FLAGS}';
export const FLAGS_MANIFEST = ${JSON.stringify(sortedManifest)};
export const FLAGS_ISO_3166 = ${JSON.stringify(flagsIso3166)} as const;
export const FLAG_NAMES = ${JSON.stringify(sortedManifestKeys)} as const;
export type FlagName = typeof FLAG_NAMES[number];
`
  );

  console.log('Created flags manifest.');
};

(async (): Promise<void> => {
  const files = globbySync('./src/**/*.svg').sort();
  await createManifestAndOptimizeFlags(files, config);
})();
