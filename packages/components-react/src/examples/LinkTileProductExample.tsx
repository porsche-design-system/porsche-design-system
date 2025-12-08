import { type LinkTileProductLikeEventDetail, PLinkTileProduct, PTag } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const LinkTileProductExamplePage = (): JSX.Element => {
  const [liked, setLiked] = useState(false);

  const handleLike = (e: CustomEvent<LinkTileProductLikeEventDetail>) => {
    setLiked(!e.detail.liked);
  };

  return (
    <PLinkTileProduct
      heading="Some product"
      price="1.911,00 €"
      description="Some description"
      href="https://porsche.com"
      liked={liked}
      onLike={handleLike}
    >
      <PTag slot="tags" variant="primary">
        New
      </PTag>
      <img src="http://localhost:3002/placeholder_800x900.svg" width="800" height="900" alt="Some alt text" />
    </PLinkTileProduct>
  );
};
