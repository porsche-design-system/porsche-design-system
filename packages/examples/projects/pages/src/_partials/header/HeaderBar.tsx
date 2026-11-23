import type { ComponentChildren } from 'preact';

type HeaderBarProps = {
  /** Navigation side of the bar. */
  start: ComponentChildren;
  /** Brand side, only as wide as its content. */
  center: ComponentChildren;
  /** Meta actions side. */
  end: ComponentChildren;
};

/**
 * The row every header variant is built from: three columns with the middle one sized by its content.
 *
 * `center` is rendered without a wrapper on purpose. `Brand` returns two elements, one per viewport size, and only
 * one of them is rendered at a time – a wrapper would turn them into a nested layout and cost the shared column.
 */
export const HeaderBar = ({ start, center, end }: HeaderBarProps) => (
  <div class="col-wide grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-fluid-md items-center min-h-[80px]">
    <div class="flex flex-wrap gap-static-md items-center justify-start">{start}</div>
    {center}
    <div class="flex flex-wrap gap-static-md items-center justify-end">{end}</div>
  </div>
);
