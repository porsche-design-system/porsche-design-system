export interface Pages {
  [category: string]: {
    [page: string]: string;
  };
}

export const pages: Pages = {
  'Getting Started': {
    'About': '@/pages/about.md',
    'Design Workflow': '@/pages/design-workflow.md',
    'Sketch Plugins': '@/pages/sketch-plugins.md',
    'Start Coding': '@/pages/start-coding.md',
  },
  'News': {
    Updates: '@/pages/updates.md',
    Versioning: '@/pages/versioning.md',
    Roadmap: '@/pages/roadmap.md',
  },
  'Help': {
    Support: '@/pages/support.md',
    FAQ: '@/pages/faq.md',
  },
  'Basics': {
    'Browser Compatibility': '@/pages/browser-compatibility.md',
    'Quality Criteria': '@/pages/quality-criteria.md',
    'Accessibility Criteria': '@/pages/accessibility.md',
  },
};
