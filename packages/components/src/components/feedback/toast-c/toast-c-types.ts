import { BannerState } from '../../../types';

export type ToastState = BannerState | 'success';

export type CallToAction = {
  label: string;
  callback: () => void;
};
