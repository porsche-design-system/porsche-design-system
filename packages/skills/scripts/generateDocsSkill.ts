const generateContext = () => {
  // TODO: Generate reference context here, return generated structure to be used for the SKILL.md file
};

const getFrontMatter = (framework: 'js' | 'angular' | 'react' | 'vue', version: string) => ({
  name: 'porsche-design-system-docs',
  description:
    'Authoritative reference for the Porsche Design System (PDS). Use whenever the user asks about PDS components, tokens, styles, patterns, partials, templates, or framework-integration details.',
  compatibility: `Requires @porsche-design-system/components-${framework} v${version}`,
});

const getSkillBody = (framework: 'js' | 'angular' | 'react' | 'vue', version: string) => {
  return `# Porsche Design System Docs Skill

All information needed to answer questions about the Porsche Design System (PDS) live in this skill folder. **Do not guess or invent** props, events, slots, tokens, imports, or behavior — always open the relevant file (linked below) first and ground your answer in it.

## Step 1 — Check correct version is used

This skill was build using PDS v${version} for the package @porsche-design-system/components-${framework}. If the project has a different PDS version or different package installed, stop here and notify the user.

## Step 2 — Select categories

...

## Step 3 - Reference files

...

## Rules

- Always ground answers in the file content and cite the exact relative link(s) you used.
- Never fabricate component props, events, slots, or token names — verify each in the corresponding API.
- If the docs do not contain the requested information, say so explicitly instead of guessing from general PDS knowledge.
- TODO: Add hint regarding code gen skill
  `;
};
