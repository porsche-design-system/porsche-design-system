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
  priceUsage: string;
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
    priceUsage: 'text.size = options.size;',
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
    priceUsage: '<p-text [size]="size">{{ price }}</p-text>',
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
    priceUsage: '<PText size={size}>{price}</PText>',
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
    priceUsage: '<PText :size="size">{{ price }}</PText>',
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
 * follow-up, in the structure the skill's `references/report-template.md` fixes. The rule ids,
 * deprecation messages and replacements are the real ones from the deprecation index; only the
 * audited project is invented.
 */
export const renderAuditReport = ({ framework, frameworkSuffix, getSkillName }: FrameworkRenderContext): string => {
  const sample = auditReportSamples[framework];

  return `
    # Porsche Design System deprecation audit (${frameworkSuffix}) — ${auditRunId}

    - **PDS version audited:** \`${localPorscheDesignSystemVersion}\`
    - **Framework:** \`${frameworkSuffix}\`
    - **Project root:** \`apps/checkout\`
    - **Result:** \`completed\`

    …

    ## Summary

    - **2** findings across **3** locations
    - **1** manual follow-up

    | Effort | Findings |
    | --- | --- |
    | \`small\` | 1 |
    | \`medium\` | 1 |

    | Confidence | Findings |
    | --- | --- |
    | \`high\` | 2 |

    ## Findings

    Ordered cheapest first — effective effort ascending, then confidence, then occurrence count
    descending, then rule id. This order is the recommended action plan.

    ### 1. Deprecated prop heading on p-accordion

    - **Rule id:** \`prop/p-accordion/heading\`
    - **Kind:** \`prop\`
    - **Confidence:** \`high\`
    - **Effort:** \`small\` (baseline)
    - **Deprecation message:** Will be removed in the next major release. Use the \`summary\` slot instead.
    - **Replacement:** \`heading\` → \`summary slot\`
    - **Instruction:** Move the heading text into the \`summary\` slot instead of the \`heading\` prop.
    - **Sources:**
      - \`${getSkillName('knowledge')}/references/components/p-accordion/p-accordion.md\` (PDS ${localPorscheDesignSystemVersion})
    - **Locations (2):**
      - \`${sample.faqPath}:42\` — \`direct\`
        \`\`\`
        ${sample.faqUsage}
        \`\`\`
      - \`${sample.specsPath}:17\` — \`direct\`
        \`\`\`
        ${sample.specsUsage}
        \`\`\`

    ### 2. Deprecated component p-display

    - **Rule id:** \`component/p-display\`
    - **Kind:** \`component\`
    - **Confidence:** \`high\`
    - **Effort:** \`medium\` (baseline)
    - **Deprecation message:** since v4.0.0, will be removed with next major release. Please use \`p-heading\` instead.
    - **Replacement:** \`${sample.displayFrom}\` → \`${sample.displayTo}\`
    - **Instruction:** Replace \`${sample.displayFrom}\` with \`${sample.displayTo}\`.
    - **Sources:**
      - \`${getSkillName('knowledge')}/references/components/p-display/p-display.md\` (PDS ${localPorscheDesignSystemVersion})
    - **Locations (1):**
      - \`${sample.homePath}:28\` — \`direct\`
        \`\`\`
        ${sample.homeUsage}
        \`\`\`

    ## Manual follow-ups

    Detected but not statically resolvable. These are for a human to review — do not fix them
    automatically.

    ### 1. p-text size

    - **Reason:** The value arrives from a prop that no call site resolves, so whether it is a
      deprecated size cannot be determined statically.
    - **Evidence (1):**
      - \`${sample.pricePath}:19\`
        \`\`\`
        ${sample.priceUsage}
        \`\`\`

    ## How to act on this report

    …
  `;
};
