import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { isTruthyForAnyBreakpoint } from '../breakpoint-customizable';
import { throwException } from '../log/logger';
import { getTagNameWithoutPrefix } from '../tag-name';
import type { TileAlign, TileAspectRatio, TileSize } from '../tile/tile-utils';

export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && !isTruthyForAnyBreakpoint(compact)) {
    throwException(
      `usage of ${getTagNameWithoutPrefix(host)} is not valid. align='top' is only possible with compact='true'.`
    );
  }
};

export type ITileProps = {
  size?: BreakpointCustomizable<TileSize>;
  aspectRatio?: BreakpointCustomizable<TileAspectRatio>;
  label: string;
  description: string;
  align?: TileAlign;
  gradient?: boolean;
  compact?: BreakpointCustomizable<boolean>;
};
