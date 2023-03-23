import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { getTagName } from '../tag-name';
import type { TileAlign, TileAspectRatio, TileSize } from '../';

// does not take care of breakpoint customizable
export const throwIfAlignTopAndNotCompact = (
  host: HTMLElement,
  align: TileAlign,
  compact: BreakpointCustomizable<boolean>
): void => {
  if (align === 'top' && (!compact || (typeof compact === 'string' && compact === 'false'))) {
    throw new Error(`Usage of ${getTagName(host)} is not valid. Top alignment is only possible when compact is true.`);
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
