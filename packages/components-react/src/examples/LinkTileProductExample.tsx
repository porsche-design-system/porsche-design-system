import { useState } from 'react';
import { type LinkTileProductUpdateEvent, PLinkTileProduct, PTag } from '@porsche-design-system/components-react';
import { Link } from 'react-router-dom';

export const LinkTileProductExample = (): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const handleLikeChange = (e: CustomEvent<LinkTileProductUpdateEvent>) => {
    setLiked(!e.detail.liked);
  };

  return (
    <PLinkTileProduct
      heading="Some product name"
      price="911€"
      info="Some info"
      href="https://www.porsche.com"
      liked={liked}
      onLikeChange={handleLikeChange}
    >
      <PTag slot="tags" color="background-base">
        New
      </PTag>
      <img src="/assets/link-tile-product-example-01.webp" alt="Some alt text" />
    </PLinkTileProduct>
  );
};
