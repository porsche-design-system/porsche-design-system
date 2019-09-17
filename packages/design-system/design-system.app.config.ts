// @ts-ignore
import {Pages, StoriesApp} from '@/interface';

export interface DesignSystemAppConfig {
  pages: Pages;
  stories: StoriesApp;
}

export const config: DesignSystemAppConfig = {
  pages: {
    'Getting Started': {
      // @ts-ignore
      About: () => import(`@/pages/app/about.md`),
      // @ts-ignore
      'Start Designing': () => import(`@/pages/app/start-designing.md`),
      // @ts-ignore
      'Design Workflow': () => import(`@/pages/app/design-workflow.md`)
    },
    News: {
      // @ts-ignore
      Updates: () => import(`@/pages/app/updates.md`),
      // @ts-ignore
      Roadmap: () => import(`@/pages/app/roadmap.md`)
    },
    Help: {
      // @ts-ignore
      Support: () => import(`@/pages/app/support.md`),
      // @ts-ignore
      Faq: () => import(`@/pages/app/faq.md`)
    }
  },
  stories: {
    Basic: {
      // @ts-ignore
      Color: () => import(`@/stories/app/color.md`)
    }
  }
};
