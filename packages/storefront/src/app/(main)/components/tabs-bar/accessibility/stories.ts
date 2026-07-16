import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';

export const tabsBarA11yExamples: A11yIntegrationExample[] = [
  {
    title: "Tabbed interface without tablist label",
    anti: {
      generator: () => [
        {
          tag: "p-tabs-bar",
          properties: { activeTabIndex: 0 },
          children: [
            {
              tag: "button",
              properties: { type: "button", id: "tab-0", ariaControls: "panel-0" },
              children: [
                "Overview"
              ],
            },
            {
              tag: "button",
              properties: { type: "button", id: "tab-1", ariaControls: "panel-1" },
              children: [
                "Equipment"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "p-tabs-bar",
          properties: { aria: { 'aria-label': "Porsche 911 configuration sections" }, activeTabIndex: 0 },
          children: [
            {
              tag: "button",
              properties: { type: "button", id: "tab-0", ariaControls: "panel-0" },
              children: [
                "Overview"
              ],
            },
            {
              tag: "button",
              properties: { type: "button", id: "tab-1", ariaControls: "panel-1" },
              children: [
                "Equipment"
              ],
            }
          ],
        },
      ],
    },
  },
  {
    title: "Route navigation without landmark label",
    anti: {
      generator: () => [
        {
          tag: "p-tabs-bar",
          children: [
            {
              tag: "a",
              properties: { href: "/models/911" },
              children: [
                "911"
              ],
            },
            {
              tag: "a",
              properties: { href: "/models/taycan" },
              children: [
                "Taycan"
              ],
            }
          ],
        },
      ],
    },
    recommended: {
      generator: () => [
        {
          tag: "nav",
          properties: { ariaLabel: "Porsche model range" },
          children: [
            {
              tag: "p-tabs-bar",
              children: [
                {
                  tag: "a",
                  properties: { href: "/models/911", ariaCurrent: "page" },
                  children: [
                    "911"
                  ],
                },
                {
                  tag: "a",
                  properties: { href: "/models/taycan" },
                  children: [
                    "Taycan"
                  ],
                }
              ],
            }
          ],
        },
      ],
    },
  },
];
