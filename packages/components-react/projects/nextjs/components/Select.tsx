'use client';

import { routes } from '../routes';
import { useRouter, usePathname } from 'next/navigation';

export const Select = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const selected: string = pathname ?? '';
  return (
    <select
      value={selected}
      onChange={(e) => {
        const { value } = e.target;
        router.push(value);
      }}
    >
      <option disabled value="">
        Select a page
      </option>
      {routes.map((route) => (
        <option key={route.path} value={route.path} children={route.name} />
      ))}
    </select>
  );
};
