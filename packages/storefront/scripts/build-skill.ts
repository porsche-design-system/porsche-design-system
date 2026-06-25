import path from 'node:path';
import { SKELETON_REFERENCE_MAP, buildSkillMd } from '../src/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, SkillTree, isFramework } from '../src/lib/skill/skillTree';

const REPO_ROOT = path.resolve(__dirname, '../../..');

/** Wrapper source dir (relative to the repo root) whose committed `skill/` tree each framework owns. */
const WRAPPER_SKILL_DIR: Record<Framework, string> = {
  js: 'packages/components-js/projects/components-wrapper/skill',
  angular: 'packages/components-angular/projects/angular-wrapper/skill',
  react: 'packages/components-react/projects/react-wrapper/skill',
  vue: 'packages/components-vue/projects/vue-wrapper/skill',
};

const generateTree = (framework: Framework): void => {
  const root = path.resolve(REPO_ROOT, WRAPPER_SKILL_DIR[framework]);
  const tree = new SkillTree(root);
  tree.reset();

  // Seed the reference-map scaffold. Content generators (TASK-03+) write their
  // produced files and register their own rows here before SKILL.md is rendered.
  for (const entry of SKELETON_REFERENCE_MAP) {
    tree.registerReference(entry);
  }

  tree.write('SKILL.md', buildSkillMd(framework, tree.referenceMap));

  console.log(`Wrote ${framework} skill tree → ${path.relative(REPO_ROOT, root)}`);
};

const main = (): void => {
  const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
  const frameworks = requested.length > 0 ? requested : [...FRAMEWORKS];

  for (const framework of frameworks) {
    if (!isFramework(framework)) {
      console.error(`Unknown framework "${framework}". Expected one of: ${FRAMEWORKS.join(', ')}.`);
      process.exit(1);
    }
    generateTree(framework);
  }
};

main();
