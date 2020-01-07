// @ts-ignore
import { StorefrontConfig } from '@/interface';

export const config: StorefrontConfig = {
  pages: {
    'Getting Started': {
      About: [
        // @ts-ignore
        () => import(`@/pages/app/about.md`)
      ],
      'Start Designing': [
        // @ts-ignore
        () => import(`@/pages/app/start-designing.md`)
      ],
      'Design Workflow': [
        // @ts-ignorew
        () => import(`@/pages/app/design-workflow.md`)
      ]
    },
    News: {
      Updates: [
        // @ts-ignore
        () => import(`@/pages/app/updates.md`)
      ],
      Roadmap: [
        // @ts-ignore
        () => import(`@/pages/app/roadmap.md`)
      ]
    },
    Help: {
      Support: [
        // @ts-ignore
        () => import(`@/pages/app/support.md`)
      ],
      FAQ: [
        // @ts-ignore
        () => import(`@/pages/app/faq.md`)
      ]
    }
  },
  stories: {
    Basic: {
      Color: [
        // @ts-ignore
        () => import(`@/stories/app/color.md`)
      ]
    },
    Action: {
      Button: [
        // @ts-ignore
        () => import(`@/stories/app/button.md`)
      ]
    }
  }
};
