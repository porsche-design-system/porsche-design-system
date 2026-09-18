import type { Framework } from './skillTree';

/**
 * Produces one framework's tree of one skill at `root`. The storefront inputs are a type parameter
 * rather than a fixed shape, so this contract carries no knowledge of any single skill's sources —
 * each generator declares only the inputs it reads, and `generators.ts` (the one module that knows
 * both sides) checks them against what the build actually supplies.
 */
export type SkillGenerator<TInputs> = (root: string, framework: Framework, inputs: TInputs) => void;
