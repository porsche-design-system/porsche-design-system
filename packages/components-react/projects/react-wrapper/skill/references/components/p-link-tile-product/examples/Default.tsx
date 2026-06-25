import React from 'react';
import { useState } from 'react';
import { PLinkTileProduct, PTag, type LinkTileProductLikeEvent } from '@porsche-design-system/components-react';

export const Example = () => {
  const [liked, setLiked] = useState(false);

  const onLike = (e: CustomEvent<LinkTileProductLikeEvent>) => {
    setLiked(!e.detail.liked);
  }

  return (
    <>
      <PLinkTileProduct liked={liked} heading="Some product" price="718,00 €" priceOriginal="911,00 €" description="Some description" href="https://porsche.com" onLike={onLike}>
        <PTag slot="header" color="background-base">
          New
        </PTag>
        <img src="assets/placeholder_800x900.svg" width={800} height={900} alt="Some alt text" />
      </PLinkTileProduct>
    </>
  )
}
