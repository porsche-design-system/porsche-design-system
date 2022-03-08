import { MutationObserverMock } from '../src/utils/mutation-observer-mock';

// @ts-ignore
global.MutationObserver = MutationObserverMock;

import { WrapperGenerator } from './wrapper-generator';

const generateWrappers = (): void => {
  const generator = new WrapperGenerator();
  generator.generate('angular');
  generator.generate('react');
  generator.generate('uxpin');
};

generateWrappers();
