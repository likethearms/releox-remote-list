/* eslint-disable no-console,@typescript-eslint/no-explicit-any */
import React from 'react';
import { ReleoxBootstrapPagination } from '../components/ReleoxBootstrapPagination';
import { ReleoxTailwindPagination } from '../components/ReleoxTailwindPagination';
import { useRemoteList } from '../hooks/use-remote-list';
import NativePagination from './NativePagination';
import ReduxPaginationDemo from './ReduxPaginationDemo';

const App = (): JSX.Element => {
  const { paginationList } = useRemoteList({
    totalSize: 20 * 7,
    onChange: console.log,
    query: {
      where: { x: 'name' },
      include: ['client'],
      order: 'createAt desc',
    },
  });
  return (
    <div style={{ padding: '20px' }} className="clearfix">
      <NativePagination />
      <ReduxPaginationDemo />
      <ReleoxBootstrapPagination paginationList={paginationList} />
      <ReleoxTailwindPagination paginationList={paginationList} />
    </div>
  );
};

export default App;
