import { ReactWrapperGenerator } from './ReactWrapperGenerator';

type Framework = 'react';

export class WrapperGenerator {
  public generate(framework: Framework): void {
    if (framework === 'react') {
      new ReactWrapperGenerator();
    } else {
      throw new Error(`Framework ${framework} isn't supported, yet.`);
    }
  }
}
