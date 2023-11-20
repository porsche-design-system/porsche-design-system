import { Link } from '@remix-run/react';
import { PHeading } from '@porsche-design-system/components-react/ssr';

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
          {/* the scroll position bug was only reproducible with nested routing */}
          <Link preventScrollReset={true} to="/modal">
            Modal Page
          </Link>
        </li>
      </ul>
    </main>
  );
}
