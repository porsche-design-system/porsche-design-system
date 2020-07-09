require('@testing-library/jest-dom/extend-expect');
// import { PButton } from '@porsche-design-system/components-react/mocks';
// import * as Mocks from '@porsche-design-system/components-react/mocks';

jest.mock('@porsche-design-system/components-react', () => {
  // return {
  //   __esModule: true,
  //   PButton
  // };
  return require('@porsche-design-system/components-react/mocks');
});
