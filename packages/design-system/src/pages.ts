export interface Pages {
  [category: string]: {
    [page: string]: string;
  };
}

export const pages: Pages = {
  'Getting Started': {
    'About': '@/pages/getting-started/about.md',
    'Design Workflow': '@/pages/getting-started/design-workflow.md',
    'Sketch Plugins': '@/pages/getting-started/sketch-plugins.md',
    'Start Coding': '@/pages/getting-started/start-coding.md',
  },
  'News': {
    Updates: '@/pages/news/updates.md',
    Versioning: '@/pages/news/versioning.md',
    Roadmap: '@/pages/news/roadmap.md',
  },
  'Help': {
    Support: '@/pages/help/support.md',
    FAQ: '@/pages/help/faq.md',
  },
  'Basics': {
    'Browser Compatibility': '@/pages/basics/browser-compatibility.md',
    'Quality Criteria': '@/pages/basics/quality-criteria.md',
    'Accessibility Criteria': '@/pages/basics/accessibility.md',
  },
};
