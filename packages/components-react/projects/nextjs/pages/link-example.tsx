import type { NextPage } from 'next';
import { PLink, PLinkProps } from '@porsche-design-system/components-react/ssr';
import { NextRouter, useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';
import Link from 'next/link';

// push and replace via `as` prop on Link
// active detection: router.asPath === href or router.pathname

const RouterPLinkHooked = ({ navigate, ...props }: PLinkProps & { navigate?: NextRouter['push'] }): JSX.Element => {
  const onClick = useCallback((e: MouseEvent & { target: PLinkProps }) => {
    e.preventDefault();
    // @ts-ignore
    navigate((e.target as any).href);
  }, []);

  return <PLink {...props} {...(navigate && { onClick })} />;
};

const LinkExamplePage: NextPage = (): JSX.Element => {
  const router = useRouter();

  const onClick = useCallback((e: MouseEvent & { target: PLinkProps }) => {
    e.preventDefault();
    router.push(e.target.href!);
  }, []);

  return (
    <>
      <PLink href="/">Link 1</PLink>
      <PLink href="/" onClick={onClick}>
        Link 2 click listener
      </PLink>
      <Link href="/" passHref>
        <PLink>Link 3 passHref (check markup)</PLink>
      </Link>
      <RouterPLinkHooked href="/" navigate={router.push}>
        Link 4 hooked
      </RouterPLinkHooked>
    </>
  );
};

export default LinkExamplePage;
