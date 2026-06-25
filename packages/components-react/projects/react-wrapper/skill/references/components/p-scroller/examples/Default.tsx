import React from 'react';
import { PScroller, PTag } from '@porsche-design-system/components-react';

export const Example = () => {
  return (
    <>
      <PScroller className="max-w-[600px] whitespace-nowrap">
        <PTag className="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="notification-warning-soft">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="notification-warning-soft">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag className="me-static-md" color="primary">
          <button type="button">
            Some tag content
          </button>
        </PTag>
        <PTag color="notification-info-soft">
          <button type="button">
            Some tag content
          </button>
        </PTag>
      </PScroller>
    </>
  )
}
