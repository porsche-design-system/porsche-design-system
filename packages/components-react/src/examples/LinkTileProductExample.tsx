import { useState } from 'react';
import { type LinkTileProductUpdateEvent, PLinkTileProduct, PTag } from '@porsche-design-system/components-react';

export const LinkTileProductExample = (): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const handleLikeChange = (e: CustomEvent<LinkTileProductUpdateEvent>) => {
    setLiked(!e.detail.liked);
  };

  return (
    <PLinkTileProduct
      heading="Some product"
      price="911€"
      info="Some info"
      href="https://www.porsche.com"
      liked={liked}
      onLikeChange={handleLikeChange}
    >
      <PTag slot="tags" color="background-base">
        New
      </PTag>
      <img src="/assets/placeholder_800x900.svg" width="3000" height="2000" alt="Some alt text" />
    </PLinkTileProduct>
  );
};
