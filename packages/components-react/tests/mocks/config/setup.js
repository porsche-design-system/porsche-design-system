import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../projects/components-wrapper/src', () => {
  return require('../../../projects/components-wrapper/src/mocks');
});
