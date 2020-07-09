//@ts-nocheck
import React from 'react';

export const PPagination = (props) => {
  const { activePage, totalItemsCount, onPageChange } = props;

  const capped = (page) => {
    return Math.min(Math.max(page, 1), totalItemsCount);
  };

  const handleChange = (page) => {
    if (onPageChange) {
      onPageChange({ page, previousPage: activePage });
    }
  };

  const previousPage = capped(activePage - 1);
  const nextPage = capped(activePage + 1);

  return (
    <p-pagination>
      <ul>
        <li type="PREVIOUS_PAGE_LINK" value={`${previousPage}`} onClick={() => handleChange(previousPage)} />
        {[...Array(totalItemsCount || 1)].map((i, index) => {
          return (
            <li type="PAGE" key={index + 1} value={`${index + 1}`} onClick={() => handleChange(index + 1)}>
              {index + 1}
            </li>
          );
        })}
        <li type="NEXT_PAGE_LINK" value={`${nextPage}`} onClick={() => handleChange(nextPage)} />
      </ul>
    </p-pagination>
  );
};
