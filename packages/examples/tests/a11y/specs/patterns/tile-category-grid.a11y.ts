import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/category-grid` – three category tiles under one heading, each clickable as a whole through a
 * covering `p-link`. Static markup without behaviour of its own, so the initial state is all there is to scan.
 *
 * Unlike the single tile patterns, this one is not scanned with `page-has-heading-one` disabled: it does carry a
 * heading above its tiles, which is what the arrangement is about.
 */

testInitialStates('patterns-tile-category-grid');
