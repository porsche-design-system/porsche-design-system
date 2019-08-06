// @ts-ignore
import {Pages} from '@/interface';

export interface DesignSystemAppConfig {
  pages: Pages;
}

const empty = '';

export const config: DesignSystemAppConfig = {
  pages: {
    'Getting Started': {
      About: () => import(`@/pages/app/${empty}about.md`),
    },
  }
};
