import { SKELETONS_ACTIVE } from '../constants';

export const describeif = SKELETONS_ACTIVE ? it : xit;
export const itif = SKELETONS_ACTIVE ? it : xit;
