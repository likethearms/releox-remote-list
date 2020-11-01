import { useCallback, useEffect, useState } from 'react';

export interface BaseFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any;
  order?: string;
  include?: string | string[];
}

export interface Filter extends BaseFilter {
  limit?: number;
  skip?: number;
}

interface Options {
  defaultSizePerPage?: number;
  totalSize: number;
  onChange(filter: Filter): void;
  query?: BaseFilter;
}

export interface RemoteListObject {
  sizePerPage: number;
  paginationList: PaginationItem[];
  changePage(page: number): void;
}

export interface PaginationItem {
  text: number | string;
  isActive: boolean;
  pageIndex: number;
  onClick(): void;
}

export const useRemoteList = (options: Options): RemoteListObject => {
  const { totalSize, defaultSizePerPage, onChange, query } = options;
  const [queryCache, setQueryCache] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [paginationList, setPaginationList] = useState<PaginationItem[]>([]);
  const [sizePerPage, setSizePerPage] = useState(20);

  // Setup default size per page
  useEffect(() => {
    if (defaultSizePerPage) setSizePerPage(defaultSizePerPage);
  }, [defaultSizePerPage]);

  // Page Change
  const changePage = useCallback(
    (pageIndex: number) => {
      setCurrentPageIndex(pageIndex);
    },
    [setCurrentPageIndex]
  );

  // Change pagination
  useEffect(() => {
    const pageCount = Math.ceil(totalSize / sizePerPage) || 1;
    let pagination: PaginationItem[] = [];

    for (let i = 0; i < pageCount; i += 1) {
      pagination.push({
        isActive: currentPageIndex === i,
        text: i + 1,
        pageIndex: i,
        onClick: () => changePage(i),
      });
    }

    if (pagination.length > 6) {
      if (currentPageIndex < 2) {
        pagination = pagination.splice(0, 4);
      } else if (currentPageIndex === 2) {
        pagination = pagination.splice(0, 5);
      } else {
        pagination = pagination.splice(currentPageIndex - 2, 5);
      }

      if (pagination[0].pageIndex !== 0) {
        pagination.unshift({
          text: 'First',
          pageIndex: 0,
          isActive: false,
          onClick: () => changePage(0),
        });
      }
      if (pagination[pagination.length - 1].pageIndex !== pageCount - 1) {
        pagination.push({
          text: 'Last',
          pageIndex: pageCount - 1,
          isActive: false,
          onClick: () => changePage(pageCount - 1),
        });
      }
    }

    setPaginationList(pagination);
  }, [currentPageIndex, sizePerPage, totalSize, setPaginationList, changePage]);

  // Request
  useEffect(() => {
    const loopbackQuery = {
      ...query,
      limit: sizePerPage,
      skip: currentPageIndex * sizePerPage,
    };

    const queryString = JSON.stringify(loopbackQuery);

    if (queryCache !== queryString) {
      onChange(loopbackQuery);
      setQueryCache(queryString);
    }
  }, [currentPageIndex, sizePerPage, totalSize, onChange, query, queryCache]);

  return {
    sizePerPage,
    changePage,
    paginationList,
  };
};
