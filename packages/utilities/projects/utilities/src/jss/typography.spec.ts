import {
  headline,
  headline1,
  headline2,
  headline3,
  headline4,
  headline5,
  text,
  textLarge,
  textMedium,
  textSmall,
  textXLarge,
  textXSmall,
  titleLarge,
} from './typography';

it('should contain correct values for titleLarge', () => {
  expect(titleLarge).toMatchSnapshot();
});

it('should contain correct values for headline1', () => {
  expect(headline1).toMatchSnapshot();
});

it('should contain correct values for headline2', () => {
  expect(headline2).toMatchSnapshot();
});

it('should contain correct values for headline3', () => {
  expect(headline3).toMatchSnapshot();
});

it('should contain correct values for headline4', () => {
  expect(headline4).toMatchSnapshot();
});

it('should contain correct values for headline5', () => {
  expect(headline5).toMatchSnapshot();
});

it('should contain correct values for headline', () => {
  expect(headline).toMatchSnapshot();
});

it('should contain correct values for textXSmall', () => {
  expect(textXSmall).toMatchSnapshot();
});

it('should contain correct values for textSmall', () => {
  expect(textSmall).toMatchSnapshot();
});

it('should contain correct values for textMedium', () => {
  expect(textMedium).toMatchSnapshot();
});

it('should contain correct values for textLarge', () => {
  expect(textLarge).toMatchSnapshot();
});

it('should contain correct values for textXLarge', () => {
  expect(textXLarge).toMatchSnapshot();
});

it('should contain correct values for text', () => {
  expect(text).toMatchSnapshot();
});
