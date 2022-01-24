import { font, fontFamily, fontSize, fontWeight } from './font';

it('should contain correct values for fontFamily', () => {
  expect(fontFamily).toMatchSnapshot();
});

it('should contain correct values for fontWeight', () => {
  expect(fontWeight).toMatchSnapshot();
});

it('should contain correct values for fontSize', () => {
  expect(fontSize).toMatchSnapshot();
});

it('should contain correct values for font', () => {
  expect(font).toMatchSnapshot();
});
