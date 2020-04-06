import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../projects/components-wrapper/src/lib/components', () => {
  return require('../../../projects/components-wrapper/src/mocks/mock-collection');
});
