/* Auto Generated File */
import type { NextPage } from 'next';
import { PPagination } from '@porsche-design-system/components-react/ssr';

const PaginationPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground light" title="should show default pagination on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} />
      </div>

      <div className="playground dark" title="should show pagination on dark background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} theme="dark" />
      </div>

      <div className="playground light" title="should show pagination with ellipsis on both sides on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={10} />
      </div>

      <div className="playground light" title="should show pagination with last page selected on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={20} />
      </div>

      <div className="playground light" title="should show pagination with less than maximum pages on light background">
        <PPagination totalItemsCount={75} itemsPerPage={25} activePage={2} />
      </div>

      <div className="playground light" title="should show pagination with 3rd item set as active on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={3} />
      </div>

      <div className="playground light" title="should show pagination with 7 items (including ellipsis) on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} maxNumberOfPageLinks={7} />
      </div>

      <div className="playground light" title="should show pagination with 5 items (including ellipsis) on light background">
        <PPagination totalItemsCount={500} itemsPerPage={25} activePage={1} maxNumberOfPageLinks={5} />
      </div>

      <div
        className="playground light"
        title="should show pagination with 5 or 7 items depending on window size (including ellipsis) on light background"
      >
        <PPagination
          totalItemsCount={500}
          itemsPerPage={25}
          activePage={1}
          maxNumberOfPageLinks={{ base: 5, s: 7, l: 5 }}
         />
      </div>
    </>
  );
};

export default PaginationPage;
