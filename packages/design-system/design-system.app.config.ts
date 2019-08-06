// @ts-ignore
import {Pages} from '@/interface';

export interface DesignSystemAppConfig {
  pages: Pages;
}

export const config: DesignSystemAppConfig = {
  pages: {
    'Getting Started': {
      // @ts-ignore
      About: () => import(`@/pages/app/about.md`),
    },
  }
};
