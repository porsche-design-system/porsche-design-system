import React from 'react';
import { PButtonTile, PTag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-static-md">
        <PButtonTile aspectRatio="4/3" label="Some Label" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum." size="large">
          <PTag slot="header" color="background-frosted" compact="true">
            4/3
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </PButtonTile>
        <PButtonTile aspectRatio="4/3" label="Some Label" description="Some description">
          <PTag slot="header" color="background-frosted" compact="true">
            4/3
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </PButtonTile>
        <PButtonTile aspectRatio="1/1" label="Some Label" description="Some description">
          <PTag slot="header" color="background-frosted" compact="true">
            1/1
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </PButtonTile>
        <PButtonTile aspectRatio="9/16" label="Some Label" description="Some description">
          <PTag slot="header" color="background-frosted" compact="true">
            9/16
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </PButtonTile>
        <PButtonTile aspectRatio="1/1" label="Some Label" description="Some description">
          <PTag slot="header" color="background-frosted" compact="true">
            1/1
          </PTag>
          <img src="assets/lights.jpg" alt="Some image description" />
        </PButtonTile>
      </div>
    </>
  )
}
