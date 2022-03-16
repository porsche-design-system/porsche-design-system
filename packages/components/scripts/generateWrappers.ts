import { WrapperGenerator } from './wrapper-generator';
export const generateSkeletons = true;
const generateWrappers = (): void => {
  const generator = new WrapperGenerator({ hasSkeletonSupport: true }); // to remove skeleton property classes in the generated wrappers, set to false
  generator.generate('angular');
  generator.generate('react');
  generator.generate('uxpin');
};

generateWrappers();
