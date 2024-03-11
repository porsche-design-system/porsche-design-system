import { useState } from 'react';
import { type LinkTileProductLikeEventDetail, PLinkTileProduct, PTag } from '@porsche-design-system/components-react';

export const LinkTileProductExample = (): JSX.Element => {
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
      <PTag slot="tags" color="background-base">
        New
      </PTag>
      <img
        src="https://porsche-design-system.github.io/porsche-design-system/placeholder_800x900.svg"
        width="800"
        height="900"
        alt="Some alt text"
      />
    </PLinkTileProduct>
  );
};
