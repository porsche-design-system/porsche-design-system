import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { getTagNameWithoutPrefix } from '../tag-name';
import type { TileAlign, TileAspectRatio, TileSize } from '../';
import { throwException } from '../';

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
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
