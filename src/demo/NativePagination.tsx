/* eslint-disable no-console,@typescript-eslint/no-explicit-any */

import React from 'react';
import useRemoteList from '../hooks/use-remote-list';

export default (): JSX.Element => {
  const { paginationList } = useRemoteList({
    totalSize: 20 * 7,
    onChange: (y: any) => console.log(y),
    query: {
      where: { x: 'name' },
      include: ['client'],
      order: 'createAt desc',
    },
  });

  return (
    <div>
      <p>Native</p>
      {paginationList.map((p) => (
        <div key={p.text} onClick={p.onClick}>
          {`${p.text} ${p.isActive ? 'active' : ''}`}
        </div>
      ))}
    </div>
  );
};
