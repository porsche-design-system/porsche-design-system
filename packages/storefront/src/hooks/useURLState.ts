import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useURLState = (initialState: StoryState<HTMLTagOrComponent>, tag: HTMLTagOrComponent) => {
  const [state, setState] = useState<StoryState<HTMLTagOrComponent>>(initialState);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const { properties } = state;
    const serializedProps = encodeURIComponent(JSON.stringify(properties));
    const newUrl = `${pathname}?tag=${tag}&props=${serializedProps}`;
    router.push(newUrl);
  }, [state, router, pathname]);

  return [state, setState];
};
