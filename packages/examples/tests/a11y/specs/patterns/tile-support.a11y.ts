import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/support` – a tile holding three smaller ones, each clickable as a whole through a covering
 * `p-link`. Static markup without behaviour of its own, so the initial state is all there is to scan.
 */

testInitialStates('patterns-tile-support', {
  // `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: the heading it carries
  // above the tiles it holds is the second level a section of a real page would give it, never a first one. The unit
  // tests encode the same exception for every tile pattern.
  disabledRules: ['page-has-heading-one'],
});
