export const FILTER_STATUS_ANNOUNCE_TIMEOUT = 300;

export const getFilterStatusMessage = (filterValue: string, visibleOptionCount: number): string => {
  if (!filterValue) {
    return '';
  }

  if (visibleOptionCount === 0) {
    return 'No results found';
  }

  return visibleOptionCount === 1 ? '1 result available' : `${visibleOptionCount} results available`;
};
