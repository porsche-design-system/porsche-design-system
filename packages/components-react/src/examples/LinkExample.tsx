import { PLink, PLinkProps } from '@porsche-design-system/components-react';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';

// Extend existing wrappers or offer new ones?
// Link & NavLink for active state
// What about different routing libraries? react-router-dom, react-location
// https://reactrouter.com/en/main/hooks/use-navigate
// https://reactrouter.com/en/main/hooks/use-match
// https://reactrouter.com/en/main/components/link
// https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L412
// https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L550
// https://react-location.tanstack.com/docs/api#usenavigate
// https://react-location.tanstack.com/docs/api#usematchroute
// https://react-location.tanstack.com/docs/api#link
// global config https://mui.com/material-ui/guides/routing/#global-theme-link
// next.js adapter https://github.com/mui/material-ui/blob/HEAD/examples/material-next-ts/src/Link.tsx

const RouterPLink = (props: PLinkProps): JSX.Element => {
  const navigate = useNavigate();

  const onClick = useCallback((e: MouseEvent & { target: PLinkProps }) => {
    e.preventDefault();
    navigate(e.target.href);
  }, []);

  return <PLink {...props} onClick={onClick} />;
};

const RouterPLinkHooked = ({ navigate, ...props }: PLinkProps & { navigate: NavigateFunction }): JSX.Element => {
  const onClick = useCallback(
    (e: MouseEvent & { target: PLinkProps }) => {
      e.preventDefault();
      navigate(e.target.href);
    },
    [navigate]
  );

  return <PLink {...props} {...(navigate && { onClick })} />;
};

export const LinkExamplePage = (): JSX.Element => {
  return (
    <>
      <PLink href="/">Link 1 default</PLink>
      <RouterPLink href="/">Link 2 click listener</RouterPLink>
      <RouterPLinkHooked href="/" navigate={useNavigate()}>
        Link 2 hooked
      </RouterPLinkHooked>
    </>
  );
};
