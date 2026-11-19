import { testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment` – one equipment option of a vehicle, with a button as its only action. Static markup
 * without behaviour of its own, so the initial state is all there is to capture.
 */

const id = 'patterns-tile-equipment';
testInitialStates(id);
