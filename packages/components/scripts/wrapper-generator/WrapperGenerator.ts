import { AngularWrapperGenerator } from './AngularWrapperGenerator';
import { NextJsReactWrapperGenerator } from './NextJsReactWrapperGenerator';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { VueWrapperGenerator } from './VueWrapperGenerator';

type Framework = 'angular' | 'react' | 'nextjs' | 'vue';

export class WrapperGenerator {
  public generate(framework: Framework): void {
    if (framework === 'angular') {
      new AngularWrapperGenerator().generate();
    } else if (framework === 'react') {
      new ReactWrapperGenerator().generate();
    } else if (framework === 'nextjs') {
      new NextJsReactWrapperGenerator().generate();
    } else if (framework === 'vue') {
      new VueWrapperGenerator().generate();
    } else {
      throw new Error(`Framework ${framework} isn't supported, yet.`);
    }
  }
}
