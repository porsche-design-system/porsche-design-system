/**
 * Fixed activation eval set for the `porsche-design-system-docs` skill.
 *
 * These prompts are the offline tuning target for the SKILL.md `description`
 * (`ACTIVATION_DESCRIPTION` in `src/lib/skill/skillMd.ts`). The runner
 * (`run-eval.ts`) replays them against a fixture project with the skill installed
 * and reports whether the skill activated. The set is intentionally fixed so reruns
 * are comparable while the description is tuned.
 *
 * This is an OFFLINE tuning aid, not a CI gate — model output is stochastic, so a
 * single mismatch must never fail a release build. See `README.md`.
 */

export type ExpectedActivation = 'fire' | 'dormant';

export type EvalPrompt = {
  /** Stable id for the report table. */
  id: string;
  /** The user prompt sent to headless Claude Code. */
  prompt: string;
  /** Whether a well-tuned description should activate the skill here. */
  expected: ExpectedActivation;
  /** Which intent bucket this prompt exercises (for grouped reporting). */
  category: string;
};

/**
 * Positive set — UI/frontend work where the skill SHOULD fire, including cases
 * where PDS is not named (the description is meant to prefer PDS for new UI).
 */
export const POSITIVE_PROMPTS: readonly EvalPrompt[] = [
  {
    id: 'pos-button',
    category: 'explicit-pds',
    prompt: 'Add a Porsche button to the top of the homepage.',
    expected: 'fire',
  },
  {
    id: 'pos-card',
    category: 'styling',
    prompt: 'Style a card with a heading, body text and a call-to-action.',
    expected: 'fire',
  },
  {
    id: 'pos-upgrade',
    category: 'migration',
    prompt: 'Upgrade our Porsche Design System to the latest major version.',
    expected: 'fire',
  },
  {
    id: 'pos-form',
    category: 'scaffolding',
    prompt: 'Build a settings form with text inputs, a select and a submit button.',
    expected: 'fire',
  },
  { id: 'pos-table', category: 'component', prompt: 'Add a sortable data table to the users page.', expected: 'fire' },
  {
    id: 'pos-modal',
    category: 'component-implicit',
    prompt: 'I need a confirmation dialog before deleting an account.',
    expected: 'fire',
  },
  {
    id: 'pos-tokens',
    category: 'tokens',
    prompt: 'Use the design system spacing and color tokens for this layout instead of hard-coded values.',
    expected: 'fire',
  },
  {
    id: 'pos-nav',
    category: 'scaffolding-implicit',
    prompt: 'Scaffold a new dashboard page with a sidebar navigation and a header.',
    expected: 'fire',
  },
  {
    id: 'pos-fix',
    category: 'review-fix',
    prompt: 'Review this component and fix any incorrect prop usage on the Porsche inputs.',
    expected: 'fire',
  },
  {
    id: 'pos-icons',
    category: 'partials',
    prompt: 'Set up the fonts and icons for our Porsche-branded web app.',
    expected: 'fire',
  },
];

/**
 * Negative set — work where the skill should stay DORMANT: backend/non-UI,
 * unrelated tests/tooling, pure content/docs, foreign UI library, explicit opt-out.
 */
export const NEGATIVE_PROMPTS: readonly EvalPrompt[] = [
  {
    id: 'neg-api',
    category: 'backend',
    prompt: 'Add a REST endpoint that returns paginated orders from the database.',
    expected: 'dormant',
  },
  {
    id: 'neg-sql',
    category: 'backend',
    prompt: 'Optimize this SQL query that joins the invoices and customers tables.',
    expected: 'dormant',
  },
  {
    id: 'neg-tooling',
    category: 'tooling',
    prompt: 'Update the ESLint config to enforce import ordering across the repo.',
    expected: 'dormant',
  },
  {
    id: 'neg-test',
    category: 'tests',
    prompt: 'Write unit tests for the date-parsing utility in lib/date.ts.',
    expected: 'dormant',
  },
  {
    id: 'neg-docs',
    category: 'content',
    prompt: 'Fix the typos in the README and reword the installation paragraph.',
    expected: 'dormant',
  },
  {
    id: 'neg-cicd',
    category: 'tooling',
    prompt: 'Add a GitHub Actions job that runs the linter on pull requests.',
    expected: 'dormant',
  },
  {
    id: 'neg-other-lib',
    category: 'foreign-library',
    prompt: 'Add a Material UI Button component to the checkout page.',
    expected: 'dormant',
  },
  {
    id: 'neg-optout',
    category: 'opt-out',
    prompt: 'Add a button to the page. Do not use the Porsche Design System for this.',
    expected: 'dormant',
  },
];

export const ALL_PROMPTS: readonly EvalPrompt[] = [...POSITIVE_PROMPTS, ...NEGATIVE_PROMPTS];
