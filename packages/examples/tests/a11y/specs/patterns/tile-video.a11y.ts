import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/video` – a category with a mood video and the control pausing it.
 */

testInitialStates('patterns-tile-video', {
  // `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: like the footer pattern,
  // it demonstrates a single element in the place it occupies, and a heading above it would be content the pattern is
  // not about. The unit tests encode the same exception for every tile pattern.
  disabledRules: ['page-has-heading-one'],
});
