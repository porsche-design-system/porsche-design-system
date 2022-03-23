import { SKELETONS_ACTIVE } from '../constants';

export const describeif = SKELETONS_ACTIVE ? describe : xdescribe;
export const itif = SKELETONS_ACTIVE ? it : xit;
