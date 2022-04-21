import { SKELETONS_ACTIVE } from '../constants';

export const describeIfSkeletonsActive = SKELETONS_ACTIVE ? describe : xdescribe;
export const itIfSkeletonsActive = SKELETONS_ACTIVE ? it : xit;
