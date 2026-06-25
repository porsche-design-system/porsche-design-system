import React from 'react';
import { PAiTag, PInputSearch } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PInputSearch label="What's your favorite Fruit" description="Search for fruits" name="search">
        <PAiTag slot="end" variant="abbreviation"></PAiTag>
      </PInputSearch>
    </>
  )
}
