import { SKELETONS_ACTIVE } from '../constants';

export const describeSkipSkeletons = SKELETONS_ACTIVE ? describe : xdescribe;
export const itSkipSkeletons = SKELETONS_ACTIVE ? it : xit;
