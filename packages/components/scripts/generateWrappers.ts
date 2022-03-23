import { WrapperGenerator } from './wrapper-generator';
const generateWrappers = (): void => {
  const generator = new WrapperGenerator({ hasSkeletonSupport: false }); // to remove skeleton property classes in the generated wrappers, set to false
  generator.generate('angular');
  generator.generate('react');
  generator.generate('uxpin');
};

generateWrappers();
