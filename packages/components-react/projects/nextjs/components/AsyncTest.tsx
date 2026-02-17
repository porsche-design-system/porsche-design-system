import { PTabs, PTabsItem, PText } from '@porsche-design-system/components-react/ssr';

import { headers } from 'next/headers';

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function AsyncTest() {
  // force dynamic rendering
  const _ = await headers();
  await wait(3000);

  return (
    <>
      Async Data
      <PTabs>
        <PTabsItem label="Tab One">
          <PText>
            Tab Content One
          </PText>
        </PTabsItem>
        <PTabsItem label="Tab Two">
          <PText>
            Tab Content Two
          </PText>
        </PTabsItem>
        <PTabsItem label="Tab Three">
          <PText>
            Tab Content Three
          </PText>
        </PTabsItem>
      </PTabs>
    </>
  );
}
