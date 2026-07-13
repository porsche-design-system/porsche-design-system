import path from 'node:path';
import type { PackageSkill } from '@porsche-design-system/shared';
import { stylesheetsSkill } from '../../../../components/projects/stylesheets/skill/skill';
import { emotionSkill } from '../../../../styles/projects/emotion/skill/skill';
import { scssSkill } from '../../../../styles/projects/scss/skill/skill';
import { tailwindcssSkill } from '../../../../styles/projects/tailwindcss/skill/skill';
import { vanillaExtractSkill } from '../../../../styles/projects/vanilla-extract/skill/skill';
import { rewriteDocLinks, type RouteReferences } from './links';
import { rawScssReference, rawTailwindcssReference } from './rawStyleReferences';
import type { PackageSkillSections, SkillReferenceRow } from './skillMd';
import type { Framework, SkillTree } from './skillTree';

type PackageSkillRegistration = {
  skill: PackageSkill;
  mount: '' | 'styles';
  rawReference?: (framework: Framework) => string;
};

/**
 * Package-owned skill sources mounted into every wrapper tree. Adding another styling solution
 * requires its PackageSkill export and one registration here; paths, route links and SKILL.md rows
 * are derived from that registration.
 */
const STYLING_SKILLS: readonly PackageSkillRegistration[] = [
  { skill: tailwindcssSkill, mount: 'styles', rawReference: rawTailwindcssReference },
  { skill: scssSkill, mount: 'styles', rawReference: rawScssReference },
  { skill: vanillaExtractSkill, mount: 'styles' },
  { skill: emotionSkill, mount: 'styles' },
];
const STYLESHEETS_SKILL: PackageSkillRegistration = { skill: stylesheetsSkill, mount: '' };
const PACKAGE_SKILLS = [...STYLING_SKILLS, STYLESHEETS_SKILL];

const referencePath = ({ skill, mount }: PackageSkillRegistration): string =>
  path.posix.join(mount, `${skill.name}.md`);

export const getPackageSkillRouteReferences = (): RouteReferences =>
  Object.fromEntries(
    PACKAGE_SKILLS.map((registration) => [
      registration.skill.name,
      path.posix.join('references', referencePath(registration)),
    ])
  );

const toSkillReferenceRow = (registration: PackageSkillRegistration): SkillReferenceRow => {
  const { title, description, intro } = registration.skill;
  return {
    title,
    description,
    ...(intro ? { intro } : {}),
    resolvedPath: path.posix.join('references', referencePath(registration)),
  };
};

export const getPackageSkillSections = (): PackageSkillSections => ({
  stylesheets: toSkillReferenceRow(STYLESHEETS_SKILL),
  styling: STYLING_SKILLS.map(toSkillReferenceRow),
});

const fullStylesheetSection = (rawReference: string): string =>
  `## Full stylesheet\n\nThe tables above are the index, with each token's value. For the complete generated stylesheet — resets, deprecated aliases and everything not tabulated here — read \`${rawReference}\` in the installed package.\n`;

export const writePackageSkillReferences = (
  tree: SkillTree,
  framework: Framework,
  routeReferences: RouteReferences
): string[] =>
  PACKAGE_SKILLS.map((registration) => {
    const reference = referencePath(registration);
    const rawReference = registration.rawReference?.(framework);
    const packageContent = registration.skill.getContent();
    const content = rawReference ? `${packageContent}\n${fullStylesheetSection(rawReference)}` : packageContent;
    const treePath = path.posix.join('references', reference);
    return tree.writeReference(reference, rewriteDocLinks(content, treePath, routeReferences));
  });
