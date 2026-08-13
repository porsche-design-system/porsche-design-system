import { classes } from '../../_classes.ts';
import { placeholderHref } from '../../_data.ts';

type BrandProps = {
  /** Color scheme class of the bar, since the brand marks sit on it – see `Header`. */
  scheme?: string;
};

/**
 * The Porsche brand mark of the header: the crest on narrow viewports, the wordmark from `s` upwards.
 *
 * Both are returned side by side rather than wrapped, so they share one column of `HeaderBar` – exactly one of them
 * is rendered at any viewport size.
 */
export const Brand = ({ scheme }: BrandProps) => (
  <>
    <p-crest class={classes('sm:hidden', scheme)} href={placeholderHref} />
    <p-wordmark class={classes('max-sm:hidden', scheme)} href={placeholderHref} />
  </>
);
