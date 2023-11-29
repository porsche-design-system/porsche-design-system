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
      price="199,99€"
      info="Some info"
      href="/"
      liked={liked}
      onLikeChange={handleLikeChange}
    >
      <PTag slot="tags" color="background-base">
        New
      </PTag>
      <Link slot="link" to="https://www.porsche.com" />
      <img src="/assets/link-tile-product-example-01.webp" alt="Some alt text" />
    </PLinkTileProduct>
  );
};
