import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/footer` – static markup without behaviour of its own, so the initial state is all there is to scan.
 */

testInitialStates('patterns-footer', {
  // `page-has-heading-one` is a best-practice rule about *pages*, and this pattern is not one: it demonstrates a single
  // section in the place it occupies, and a heading above it would be content the pattern is not about. The unit tests
  // encode the same exception – every page has **at most** one first level heading, and only a template is required to
  // have exactly one.
  disabledRules: ['page-has-heading-one'],
});
