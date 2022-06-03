import { hoverValidator } from './hover-validator';

it('hoverValidator()', () => {
  expect(hoverValidator({ '&:hover, &:focus': { color: 'd5001c', background: 'currentColor' } })).toMatchSnapshot();
});
