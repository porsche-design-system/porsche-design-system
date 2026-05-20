import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';
import type { TokenMeta } from '@porsche-design-system/tokens-meta';
import { kebabCase } from 'change-case';
import type { ReactNode } from 'react';
import { Code } from '@/components/common/Code';

export type SortDirection = 'asc' | 'desc' | 'color';

type TokensTableProps = {
  meta: Record<string, TokenMeta>;
  sort?: SortDirection;
  showColorSwatch?: boolean;
};

type HslComponents = { l: number; a: number };

const COLOR_FAMILY_ORDER = ['info', 'success', 'warning', 'error'];
// Convert a camelCase token name to a PDS CSS custom property, e.g. colorCanvas → --p-color-canvas
const toCssVar = (name: string): string => `--p-${kebabCase(name)}`;

// Render Markdown bold (**text**) and backtick code (`text`) as React nodes
const renderDescription = (description: string): ReactNode => {
  const parts = description.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

// Pulls HSL values from a token; for light-dark() tokens, uses the light mode value.
const extractHsl = (value: string): HslComponents => {
  const lightDarkMatch = value.match(/light-dark\(\s*(hsl\([^)]+\))/);
  const hslString = lightDarkMatch ? lightDarkMatch[1] : value;
  const m = hslString.match(/hsl\(\s*[\d.]+\s+[\d.]+%\s+([\d.]+)%(?:\s*\/\s*([\d.]+))?\s*\)/);
  if (!m) return { l: 0, a: 1 };
  return { l: parseFloat(m[1]), a: m[2] ? parseFloat(m[2]) : 1 };
};

// Gets the color family from a token name, e.g. colorErrorFrostedSoft → "error".
const extractFamily = (name: string): string => name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;


// Extracts a number from a token value so tokens can be sorted by size.
const toSortNum = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const clampMatch = value.match(/clamp\(\s*([\d.]+)/);
  if (clampMatch) return parseFloat(clampMatch[1]);
  // shadows: use the largest px value as the size indicator
  const pxValues = Array.from(value.matchAll(/([\d.]+)px/g), (m) => parseFloat(m[1]));
  if (pxValues.length > 0) return Math.max(...pxValues);
  return parseFloat(value);
};

export const TokensTable = ({ meta, sort, showColorSwatch }: TokensTableProps) => {
  let items = Object.values(meta);

  if (sort === 'color') {
    const keys = new Map(
      items.map((t) => {
        const family = extractFamily(t.name);
        return [
          t.name,
          {
            familyIdx: COLOR_FAMILY_ORDER.indexOf(family),
            family,
            darkness: (({ l, a }) => (1 - l / 100) * a)(extractHsl(String(t.value))),
          },
        ];
      })
    );
    items = [...items].sort((a, b) => {
      const ka = keys.get(a.name) ?? { familyIdx: -1, family: a.name, darkness: 0 };
      const kb = keys.get(b.name) ?? { familyIdx: -1, family: b.name, darkness: 0 };
      // Unknown families come first, then sort alphabetically.
      const familyCmp = ka.familyIdx - kb.familyIdx || ka.family.localeCompare(kb.family);
      return familyCmp !== 0 ? familyCmp : kb.darkness - ka.darkness; // darkest first within family
    });
  } else if (sort) {
    const nums = new Map(items.map((t) => [t.name, toSortNum(t.value)]));
    items = [...items].sort((a, b) => {
      const numA = nums.get(a.name) ?? Number.NaN;
      const numB = nums.get(b.name) ?? Number.NaN;

      const isNumeric = !Number.isNaN(numA) && !Number.isNaN(numB);
      const cmp = isNumeric ? numA - numB : String(a.value).localeCompare(String(b.value));
      return sort === 'asc' ? cmp : -cmp;
    });
  }

  return (
    <PTable className="my-fluid-md">
      <PTableHead>
        <PTableRow>
          {showColorSwatch && <PTableHeadCell>Color</PTableHeadCell>}
          <PTableHeadCell>Token</PTableHeadCell>
          <PTableHeadCell>Description</PTableHeadCell>
          <PTableHeadCell>Value</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {items.map((token) => (
          <PTableRow key={token.name}>
            {showColorSwatch && (
              <PTableCell>
                <div
                  className="w-10 h-10 rounded-md border border-contrast-low"
                  style={{ background: `var(${toCssVar(token.name)})` }}
                />
              </PTableCell>
            )}
            <PTableCell>
              <Code variant="nowrap">{token.name}</Code>
            </PTableCell>
            <PTableCell multiline={true}>{renderDescription(token.description)}</PTableCell>
            <PTableCell multiline={true}>
              <Code variant="value">{token.value}</Code>
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
  );
};
