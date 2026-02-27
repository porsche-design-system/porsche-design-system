import { PaginationUpdateEventDetail, PPagination } from '@porsche-design-system/components-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaginationExamplePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleUpdate = (e: CustomEvent<PaginationUpdateEventDetail>) => {
    navigate(`/pagination-example?page=${e.detail.page}`); // Could also directly provide the url in the event so it does not have to be repeated here
  };

  return (
    <>
      <PPagination
        totalItemsCount={500}
        itemsPerPage={25}
        activePage={Number(searchParams.get('page')) ?? 1}
        hrefBuilder={(page) => `/pagination-example?page=${page}`}
        onUpdate={handleUpdate}
      />
    </>
  );
};
