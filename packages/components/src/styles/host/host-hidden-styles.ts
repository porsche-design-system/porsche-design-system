import { css } from '../../utils/css';

export const hostHiddenStyles = {
  '&([hidden])': {
    display: 'none',
  },
} as const;

export const hostHiddenStylesCss = css`
  :host([hidden]) {
    display: none !important;
  }
`;
