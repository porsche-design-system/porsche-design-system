import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/support` – a tile holding three smaller ones, each clickable as a whole through a covering
 * `p-link`. Static markup without behaviour of its own, so the initial state is all there is to scan.
 *
 * Like the category grid and unlike the single tile patterns, this one is not scanned with `page-has-heading-one`
 * disabled: it does carry a heading above the tiles it holds.
 */

testInitialStates('patterns-tile-support');
