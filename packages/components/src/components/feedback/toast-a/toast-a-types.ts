export type ToastState = 'neutral' | 'success';

export type CallToAction = {
  label: string;
  callback: () => void;
};
