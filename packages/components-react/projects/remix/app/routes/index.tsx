import { Link } from '@remix-run/react';
import { PHeadline } from '@porsche-design-system/components-react/ssr';

export default function Index(): JSX.Element {
  return (
    <main>
      <PHeadline>Welcome to React Remix!</PHeadline>

      <ul>
        <li>
          <Link to="/overview">Overview</Link>
        </li>
        <li>
          <Link to="/accordion-layout-shift">Accordion Layout Shift</Link>
        </li>
      </ul>
    </main>
  );
}
