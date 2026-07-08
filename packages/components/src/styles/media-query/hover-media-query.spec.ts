import type { CssStyle } from '../../utils/css-serializer';
import { hoverMediaQuery } from './hover-media-query';

it('should return style wrapped in @media(hover: hover) query', () => {
  const style: CssStyle = {
    '&:hover, &:focus': {
      color: 'd5001c',
      background: 'currentColor',
    },
  };

  expect(hoverMediaQuery(style)).toEqual({ '@media(hover:hover)': style });
});
