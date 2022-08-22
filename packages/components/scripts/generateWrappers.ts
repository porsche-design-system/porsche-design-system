import { WrapperGenerator } from './wrapper-generator';
import { SKELETONS_ACTIVE } from '@porsche-design-system/shared';

const generateWrappers = (): void => {
  const generator = new WrapperGenerator({ hasSkeletonSupport: SKELETONS_ACTIVE });
  generator.generate('angular');
  generator.generate('react');
  generator.generate('uxpin');
};

generateWrappers();
