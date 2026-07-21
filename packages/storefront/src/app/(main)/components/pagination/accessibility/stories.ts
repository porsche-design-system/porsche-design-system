import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const paginationA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Default English labels on a localized page",
    anti: {
      generator: () => [
        {
          tag: "html",
          properties: { lang: "de_DE" },
          children: [
            "...",
            {
              tag: "p-pagination",
              properties: { totalItemsCount: 120, itemsPerPage: 10, activePage: 1 },
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "html",
          properties: { lang: "de_DE" },
          children: [
            "...",
            {
              tag: "p-pagination",
              properties: { totalItemsCount: 120, itemsPerPage: 10, activePage: 1, intl: { 'root': "Seitennavigation", 'prev': "Vorherige Seite", 'next': "Nächste Seite", 'page': "Seite" } },
            }
          ],
        },
      ],
    },
  },
];
