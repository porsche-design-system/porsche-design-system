import { AngularWrapperGenerator } from './AngularWrapperGenerator';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { UXPinReactWrapperGenerator } from './UXPinReactWrapperGenerator';
import type { AbstractWrapperGeneratorConfig } from './AbstractWrapperGenerator';

type Framework = 'angular' | 'react' | 'uxpin';

export class WrapperGenerator {
  constructor(private config: AbstractWrapperGeneratorConfig) {}
  public generate(framework: Framework): void {
    if (framework === 'angular') {
      new AngularWrapperGenerator(this.config).generate();
    } else if (framework === 'react') {
      new ReactWrapperGenerator(this.config).generate();
    } else if (framework === 'uxpin') {
      new UXPinReactWrapperGenerator().generate();
    } else {
      throw new Error(`Framework ${framework} isn't supported, yet.`);
    }
  }
}
