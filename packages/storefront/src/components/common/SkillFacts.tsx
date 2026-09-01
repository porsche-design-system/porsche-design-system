import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  PText,
} from '@porsche-design-system/components-react/ssr';
import type { ReactNode } from 'react';

type SkillFactsProps = {
  /** Accessible name of the table, e.g. `Knowledge Skill facts`. */
  caption: string;
  /** Whether an agent may start the skill on its own, or only a user can. */
  invocation: ReactNode;
  /** Other skills the skill needs to do its job, or that it needs none. */
  dependencies: ReactNode;
  reads: ReactNode;
  writes: ReactNode;
  executes: ReactNode;
};

/**
 * Scannable summary of what a skill is allowed to do, rendered on every skill page so the same
 * aspects can be compared across skills.
 *
 * The values are hand-written per page rather than derived from the generated `SKILL.md`, because
 * only some of them exist as frontmatter and the storefront deliberately imports the skills package
 * for its registry alone.
 */
export const SkillFacts = ({ caption, invocation, dependencies, reads, writes, executes }: SkillFactsProps) => (
  <div className="my-fluid-md">
    <PTable caption={caption}>
      <PTableHead>
        <PTableRow>
          <PTableHeadCell>Aspect</PTableHeadCell>
          <PTableHeadCell>Detail</PTableHeadCell>
        </PTableRow>
      </PTableHead>
      <PTableBody>
        {[
          { aspect: 'Invocation', detail: invocation },
          { aspect: 'Dependencies', detail: dependencies },
          { aspect: 'Reads', detail: reads },
          { aspect: 'Writes', detail: writes },
          { aspect: 'Executes', detail: executes },
        ].map(({ aspect, detail }) => (
          <PTableRow key={aspect}>
            <PTableCell className="align-top whitespace-nowrap">{aspect}</PTableCell>
            <PTableCell className="min-w-40 align-top" multiline={true}>
              {detail}
            </PTableCell>
          </PTableRow>
        ))}
      </PTableBody>
    </PTable>
    <PText size="small" color="contrast-medium" className="mt-static-sm max-w-(--max-width-prose)">
      Invocation comes from the skill's frontmatter and is honored by your AI coding tool. The rest is guidance the
      skill gives an agent, not a permission your tool enforces.
    </PText>
  </div>
);
