import { AngularWrapperGenerator } from './AngularWrapperGenerator';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { UXPinReactWrapperGenerator } from './UXPinReactWrapperGenerator';

type Framework = 'angular' | 'react' | 'uxpin';

export class WrapperGenerator {
  public generate(framework: Framework): void {
    if (framework === 'angular') {
      new AngularWrapperGenerator().generate();
    } else if (framework === 'react') {
<<<<<<< HEAD
      new ReactWrapperGenerator(this.config).generate();
=======
      new ReactWrapperGenerator().generate();
    } else if (framework === 'nextjs') {
      new NextJsReactWrapperGenerator().generate();
>>>>>>> 0d3b136f8 (feat: remove component skeletons | sas | #1221)
    } else if (framework === 'uxpin') {
      new UXPinReactWrapperGenerator().generate();
    } else {
      throw new Error(`Framework ${framework} isn't supported, yet.`);
    }
  }
}
