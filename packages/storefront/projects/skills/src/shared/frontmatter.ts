/**
 * Agent Skills frontmatter fields. Generated artifacts are validated against the specification by
 * the frontmatter gate.
 */
export type SkillFrontmatter = {
  /**
   * Required. 1-64 characters, lowercase alphanumerics and hyphens only, no leading, trailing or
   * consecutive hyphens. Must match the skill's directory name.
   */
  name: string;
  /** Required. 1-1024 characters, describing what the skill does and when to use it. */
  description: string;
  /** License name, or the name of a bundled license file. */
  license?: string;
  /** Max 500 characters. Only for skills with real environment requirements; most have none. */
  compatibility?: string;
  /** Arbitrary string-to-string properties the spec does not define. */
  metadata?: Record<string, string>;
  /** Space-separated pre-approved tools, e.g. `Bash(git:*) Read`. Experimental in the spec. */
  allowedTools?: string;
  /**
   * Client extension honored by Claude Code and GitHub Copilot CLI for manual-only skills. It must
   * remain top-level rather than under the specification's `metadata` map.
   */
  disableModelInvocation?: boolean;
};

/**
 * Quote a value only when a plain YAML scalar would misread it — a `: ` separator, a leading `#`,
 * surrounding whitespace, or an embedded newline. Left unquoted otherwise, so the common case stays
 * readable in the shipped file.
 */
const scalar = (value: string): string => (/: |^\s|\s$|^#|\n|^["'[{]/.test(value) ? JSON.stringify(value) : value);

export const renderFrontmatter = ({
  name,
  description,
  license,
  compatibility,
  metadata,
  allowedTools,
  disableModelInvocation,
}: SkillFrontmatter): string => {
  const lines = [`name: ${scalar(name)}`, `description: ${scalar(description)}`];

  if (license) {
    lines.push(`license: ${scalar(license)}`);
  }
  if (compatibility) {
    lines.push(`compatibility: ${scalar(compatibility)}`);
  }
  if (metadata && Object.keys(metadata).length > 0) {
    lines.push('metadata:', ...Object.entries(metadata).map(([key, value]) => `  ${key}: ${scalar(value)}`));
  }
  if (allowedTools) {
    lines.push(`allowed-tools: ${scalar(allowedTools)}`);
  }
  if (disableModelInvocation) {
    lines.push('disable-model-invocation: true');
  }

  return ['---', ...lines, '---'].join('\n');
};
