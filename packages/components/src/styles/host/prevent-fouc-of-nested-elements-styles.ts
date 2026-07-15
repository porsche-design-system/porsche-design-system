import { css } from '../../utils/css';

export const preventFoucOfNestedElementsStyles = {
  ':not(:defined,[data-ssr])': {
    visibility: 'hidden',
  },
} as const;

export const preventFoucOfNestedElementsStylesCss = css`
  :not(:defined, [data-ssr]) {
    visibility: hidden;
  }
`;
