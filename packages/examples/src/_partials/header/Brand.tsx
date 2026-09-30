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
export const Brand = ({ scheme = '' }: BrandProps) => (
  <>
    <p-crest class={`sm:hidden ${scheme}`} href="#" />
    <p-wordmark class={`max-sm:hidden ${scheme}`} href="#" />
  </>
);
