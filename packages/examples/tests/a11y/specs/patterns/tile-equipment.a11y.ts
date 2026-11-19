import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment` – the equipment options of a vehicle in both variants of the tile, with a button as their only action. Static markup
 * without behaviour of its own, so the initial state is all there is to scan.
 */

testInitialStates('patterns-tile-equipment', {
  // `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: like the other tile
  // patterns, it demonstrates its tiles in the place they occupy, and a heading above it would be content the
  // pattern is not about. The unit tests encode the same exception for every tile pattern.
  disabledRules: ['page-has-heading-one'],
});
