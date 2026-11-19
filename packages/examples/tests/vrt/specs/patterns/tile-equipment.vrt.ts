import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment` – the equipment options of a vehicle in both variants of the tile, with a button as their only action. Static markup
 * without behaviour of its own, so the initial state is all there is to capture.
 */

const id = 'patterns-tile-equipment';
testInitialStates(id);
