/**
 * The `SKILL.md` YAML frontmatter, typed against the Agent Skills specification:
 * https://agentskills.io/specification#skill-md-format
 *
 * Every skill renders its frontmatter through {@link renderFrontmatter} rather than assembling the
 * lines itself, so field names, ordering and value escaping are decided once.
 */

/**
 * Spec-defined frontmatter fields, plus the one client extension this repository relies on.
 *
 * Constraints are documented rather than enforced at runtime: they are gated for every generated
 * tree by `tests/specs/gates/frontmatter.spec.ts`, which checks the shipped artifact instead of the
 * intent, and so also covers skills added later.
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
   * **Not part of the Agent Skills specification.** A client extension honored by Claude Code and
   * the GitHub Copilot CLI, which stops a skill being invoked by the model so it runs only when a
   * user asks for it.
   *
   * It is rendered as a top-level key because that is where those clients read it. The spec's
   * `metadata` map is the sanctioned place for undefined properties, but nothing reads it for this
   * purpose, so moving it there would be spec-tidy and behaviourally dead.
   */
  disableModelInvocation?: boolean;
};

/**
 * Quote a value only when a plain YAML scalar would misread it — a `: ` separator, a leading `#`,
 * surrounding whitespace, or an embedded newline. Left unquoted otherwise, so the common case stays
 * readable in the shipped file.
 */
const scalar = (value: string): string => (/: |^\s|\s$|^#|\n|^["'[{]/.test(value) ? JSON.stringify(value) : value);

/** Render frontmatter to its `---`-delimited block, in specification field order. */
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
