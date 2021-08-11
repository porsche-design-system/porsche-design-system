import { BannerState } from '../../../types';

export type ToastState2 = BannerState | 'success';

export type CallToAction2 = {
  label: string;
  callback: () => void;
};
