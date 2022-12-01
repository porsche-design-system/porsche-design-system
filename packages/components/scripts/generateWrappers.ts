import { WrapperGenerator } from './wrapper-generator';

const generateWrappers = (): void => {
  const generator = new WrapperGenerator();
  generator.generate('angular');
  generator.generate('react');
  generator.generate('nextjs');
  generator.generate('vue');
  generator.generate('uxpin');
};

generateWrappers();
