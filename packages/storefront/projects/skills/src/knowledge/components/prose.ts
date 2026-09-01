import type { Root } from 'mdast';
import { leadSentence, stripLeadingBlockquotes, stripLeadingH1 } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';
import { renderMdxToMarkdown } from '../mdx/renderMdxToMarkdown';
import { renderA11yIntegrationExamples, type SkillAccessibilityMeta } from './accessibility';

export type ComponentProseSource = {
  introduction: Root;
  usage: Root;
  accessibility: SkillAccessibilityMeta;
  notes?: Record<string, { name: string; description: Root }>;
};

const NO_SUMMARY = '_No description available._';

/**
 * Appends transformed prose but returns the raw Markdown for summary extraction.
 */
const renderSection = (
  tree: Root | undefined,
  sections: string[],
  label: string,
  framework: Framework,
  transform: (markdown: string) => string = (markdown) => markdown
): string => {
  if (!tree) {
    return '';
  }
  const markdown = renderMdxToMarkdown(tree, framework, label);
  const transformed = transform(markdown).trim();
  if (transformed) {
    sections.push(transformed);
  }
  return markdown;
};

const USAGE_FILLER =
  /\n*The following section provides guidance for designers and developers on how to use this component in different situations\.\n*/;

/** All-pass support is documented globally; only component-specific exceptions are retained. */
const HAS_EXCEPTIONAL_TEST_SUPPORT = /🟠|❌|⚠️|🚫|partial/i;

const stripBoilerplateProse = (markdown: string): string =>
  markdown
    .replace(USAGE_FILLER, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/**
 * Renders component prose, a roster summary, and optional accessibility examples. Test-support prose
 * is retained only for component-specific exceptions.
 */
export const renderComponentProse = (
  tag: string,
  source: ComponentProseSource,
  statusBanner = '',
  framework: Framework = 'js'
): { markdown: string; summary: string; accessibilityMarkdown: string } => {
  const sections: string[] = statusBanner ? [`# ${tag}`, statusBanner] : [`# ${tag}`];

  const introMarkdown = renderSection(source.introduction, sections, `${tag} › introduction`, framework);
  const summary = leadSentence(stripLeadingBlockquotes(introMarkdown)) || NO_SUMMARY;

  renderSection(source.usage, sections, `${tag} › usage`, framework, stripLeadingH1);
  renderSection(source.accessibility.overview, sections, `${tag} › accessibility`, framework, stripLeadingH1);

  const integrationExamples = renderA11yIntegrationExamples(tag, source.accessibility.examples, framework);
  if (integrationExamples) {
    sections.push(
      '## Integration examples\n\nSee [accessibility integration examples](./accessibility.md) for paired anti-pattern and recommended implementations.'
    );
  }

  if (source.accessibility.tests) {
    const testsMarkdown = renderMdxToMarkdown(source.accessibility.tests, framework, `${tag} › accessibility tests`);
    if (HAS_EXCEPTIONAL_TEST_SUPPORT.test(testsMarkdown)) {
      sections.push(testsMarkdown.trim());
    }
  }

  const noteEntries = Object.values(source.notes ?? {});
  if (noteEntries.length > 0) {
    const noteBlocks: string[] = ['## Notes'];
    for (const note of noteEntries) {
      const markdown = renderMdxToMarkdown(note.description, framework, `${tag} › notes:${note.name}`);
      noteBlocks.push(`### ${note.name}`, markdown.trim());
    }
    sections.push(noteBlocks.join('\n\n'));
  }

  const accessibilityMarkdown = integrationExamples
    ? `# ${tag} accessibility integration examples\n\n${integrationExamples}`
    : '';

  return { markdown: stripBoilerplateProse(sections.join('\n\n')), summary, accessibilityMarkdown };
};
