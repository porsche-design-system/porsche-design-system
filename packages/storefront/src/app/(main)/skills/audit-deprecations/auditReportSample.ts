import type { Framework } from '@porsche-design-system/shared';
import type { FrameworkRenderContext } from '@/models/framework';
import { localPorscheDesignSystemVersion } from '@/utils/porscheDesignSystemVersion';

/** Illustrative run directory, matching the filesystem-safe UTC timestamp the skill writes. */
export const auditRunId = '2026-07-23T09-21-27Z';

type AuditReportSample = {
  faqPath: string;
  faqUsage: string;
  specsPath: string;
  specsUsage: string;
  homePath: string;
  homeUsage: string;
  pricePath: string;
  displayFrom: string;
  displayTo: string;
};

/**
 * Per-framework spellings for the example report, so a reader sees the markup and file names their
 * own project would produce rather than another framework's.
 */
const auditReportSamples = {
  'vanilla-js': {
    faqPath: 'src/components/faq-list.js',
    faqUsage: 'accordion.heading = item.question;',
    specsPath: 'src/pages/specs.html',
    specsUsage: '<p-accordion heading="Technical data">',
    homePath: 'src/pages/home.html',
    homeUsage: '<p-display size="large">Taycan</p-display>',
    pricePath: 'src/components/price.js',
    displayFrom: 'p-display',
    displayTo: 'p-heading',
  },
  angular: {
    faqPath: 'src/app/faq/faq-list.component.html',
    faqUsage: '<p-accordion [heading]="item.question" [open]="isOpen">',
    specsPath: 'src/app/specs/specs.component.html',
    specsUsage: '<p-accordion heading="Technical data">',
    homePath: 'src/app/home/home.component.html',
    homeUsage: '<p-display size="large">Taycan</p-display>',
    pricePath: 'src/app/price/price.component.html',
    displayFrom: 'p-display',
    displayTo: 'p-heading',
  },
  react: {
    faqPath: 'src/components/FaqList.tsx',
    faqUsage: '<PAccordion heading={item.question} open={isOpen}>',
    specsPath: 'src/pages/Specs.tsx',
    specsUsage: '<PAccordion heading="Technical data">',
    homePath: 'src/pages/Home.tsx',
    homeUsage: '<PDisplay size="large">Taycan</PDisplay>',
    pricePath: 'src/components/Price.tsx',
    displayFrom: 'PDisplay',
    displayTo: 'PHeading',
  },
  vue: {
    faqPath: 'src/components/FaqList.vue',
    faqUsage: '<PAccordion :heading="item.question" :open="isOpen">',
    specsPath: 'src/pages/Specs.vue',
    specsUsage: '<PAccordion heading="Technical data">',
    homePath: 'src/pages/Home.vue',
    homeUsage: '<PDisplay size="large">Taycan</PDisplay>',
    pricePath: 'src/components/Price.vue',
    displayFrom: 'PDisplay',
    displayTo: 'PHeading',
  },
} as const satisfies Record<Framework, AuditReportSample>;

/** The two files one audit run writes, as a tree. */
export const renderAuditFiles = ({ getSkillName }: FrameworkRenderContext): string => `
  .pds/audits/${auditRunId}/
  ├── ${getSkillName('audit-deprecations')}.json
  └── ${getSkillName('audit-deprecations')}.md
`;

/**
 * Shortened stand-in for the Markdown report: two findings ordered cheapest first and one manual
 * follow-up. The rule ids, deprecation messages and replacements are the real ones from the
 * deprecation index; only the audited project is invented.
 */
export const renderAuditReport = ({ framework, componentPackageName }: FrameworkRenderContext): string => {
  const sample = auditReportSamples[framework];

  return `
    # Porsche Design System deprecation audit

    ${componentPackageName} ${localPorscheDesignSystemVersion} · result: completed
    2 findings across 3 locations · 1 manual follow-up

    ## Findings

    ### 1. \`heading\` prop on \`p-accordion\` (small effort, high confidence)

    Rule: \`prop/p-accordion/heading\`
    Deprecation: Will be removed in the next major release. Use the \`summary\` slot instead.
    Fix: move the heading text into the \`summary\` slot.

    - ${sample.faqPath}:42 · \`${sample.faqUsage}\`
    - ${sample.specsPath}:17 · \`${sample.specsUsage}\`

    ### 2. \`p-display\` (medium effort, high confidence)

    Rule: \`component/p-display\`
    Deprecation: since v4.0.0, will be removed with next major release. Please use \`p-heading\` instead.
    Fix: replace \`${sample.displayFrom}\` with \`${sample.displayTo}\`.

    - ${sample.homePath}:28 · \`${sample.homeUsage}\`

    ## Manual follow-ups

    - \`p-text\` \`size\` at ${sample.pricePath}:19 · the value arrives from a prop that no call site
      resolves, so whether it is a deprecated size has to be checked by hand.

    ## How to act on this report

    …
  `;
};
