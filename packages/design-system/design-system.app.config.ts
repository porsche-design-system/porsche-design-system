// @ts-ignore
import {DesignSystemConfig} from '@/interface';

export const config: DesignSystemConfig = {
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
    },
  },
  stories: {
    Basic: {
      Color: [
        // @ts-ignore
        () => import(`@/stories/app/color.md`)
      ],
    },
    Action: {
      Button: [
        // @ts-ignore
        () => import(`@/stories/app/button.md`)
      ]
    },
  }
};
