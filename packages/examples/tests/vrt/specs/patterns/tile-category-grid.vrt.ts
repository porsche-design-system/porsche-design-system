import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/category-grid` – the arrangement as it is rendered, in both color schemes.
 *
 * The hover state of a tile belongs to the single category pattern, which records it; what this one adds is how the
 * three sit together, and that is what the capture is of.
 */

const id = 'patterns-tile-category-grid';
testInitialStates(id);
