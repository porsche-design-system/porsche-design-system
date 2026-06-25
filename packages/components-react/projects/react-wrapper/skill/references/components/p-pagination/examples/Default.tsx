import React from 'react';
import { PPagination } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1}></PPagination>
    </>
  )
}
