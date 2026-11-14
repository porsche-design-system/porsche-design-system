import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/model-navigation` – a model of the navigation, revealing its background on hover. Static markup without behaviour of its own, so the initial state is all there
 * is to scan.
 */

testInitialStates('patterns-tile-model-navigation', {
  // `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: like the footer pattern,
  // it demonstrates a single element in the place it occupies, and a heading above it would be content the pattern is
  // not about. The unit tests encode the same exception for every tile pattern.
  disabledRules: ['page-has-heading-one'],
});
