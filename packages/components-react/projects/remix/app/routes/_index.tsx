import { Link } from '@remix-run/react';
import { PHeading, PLink } from '@porsche-design-system/components-react/ssr';

export default function _index(): JSX.Element {
  return (
    <main>
      <PHeading>Welcome to React Remix!</PHeading>

      <ul>
        <li>
          <Link to="/overview">Overview</Link>
        </li>
        <li>
          <Link to="/accordion-layout-shift">Accordion Layout Shift</Link>
        </li>
        <li>
          <PLink>
            <Link to="/modal-route-change">Modal Route Change</Link>
          </PLink>
        </li>
      </ul>
    </main>
  );
}
