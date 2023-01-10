import { Link } from "@remix-run/react";
import { PHeadline } from "@porsche-design-system/components-react/ssr";

export default function Index() {
  return (
    <main>
      <PHeadline>Welcome to React Remix!</PHeadline>

      <ul>
        <li>
          <Link to="/pages/overview">Blog Posts</Link>
        </li>
      </ul>
    </main>
  );
}
