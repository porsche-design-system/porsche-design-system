import { PLink, PLinkProps } from '@porsche-design-system/components-react/ssr';
import { MouseEvent, useCallback } from 'react';
import { Link, useNavigate } from '@remix-run/react';

// https://remix.run/docs/en/main/components/link#md-react-router-link
// wrapper around react-router's Link: https://reactrouter.com/en/main/components/link
// active, isPending https://remix.run/docs/en/main/components/nav-link
// relative / replace

const RouterPLinkHooked = ({
  navigate,
  ...props
}: PLinkProps & { navigate?: ReturnType<typeof useNavigate> }): JSX.Element => {
  const onClick = useCallback((e: MouseEvent & { target: PLinkProps }) => {
    e.preventDefault();
    // @ts-ignore
    navigate((e.target as any).href);
  }, []);

  return <PLink {...props} {...(navigate && { onClick })} />;
};

const LinkExamplePage = (): JSX.Element => {
  const navigate = useNavigate();
  const onClick = useCallback((e: MouseEvent & { target: PLinkProps }) => {
    e.preventDefault();
    navigate(e.target.href!);
  }, []);

  return (
    <>
      <PLink href="/">Link 1</PLink>
      <PLink href="/" onClick={onClick}>
        Link 2 click listener
      </PLink>
      <Link to="/">
        <PLink>Link 3 wrapped by Link (check markup)</PLink>
      </Link>
      <RouterPLinkHooked href="/" navigate={navigate}>
        Link 4 hooked
      </RouterPLinkHooked>
    </>
  );
};

export default LinkExamplePage;
