/* eslint-disable no-console,@typescript-eslint/no-explicit-any */

import React from 'react';
import useRemoteListRedux from '../hooks/use-remote-list-redux';
import onChangeAction from './on-change-action';

const FakeSelector = () => 20 * 7;

export default (): JSX.Element => {
  const { paginationList } = useRemoteListRedux({
    totalSizeSelector: FakeSelector,
    onChange: onChangeAction,
    query: {
      where: { x: 'name' },
      include: ['client'],
      order: 'createAt desc',
    },
  });

  return (
    <div>
      <p>Redux</p>
      {paginationList.map((p) => (
        <div key={p.text} onClick={p.onClick}>
          {`${p.text} ${p.isActive ? 'active' : ''}`}
        </div>
      ))}
    </div>
  );
};
