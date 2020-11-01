/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { PaginationItem } from '../hooks/use-remote-list';

interface Props {
  paginationList: PaginationItem[];
}

export default ({ paginationList }: Props): JSX.Element => {
  return (
    <nav>
      <ul className="pagination justify-content-end">
        {paginationList.map((p) => (
          <li
            className={`page-item ${p.isActive ? 'active' : ''}`}
            key={p.text}
          >
            <button className="page-link" onClick={p.onClick} type="button">
              {p.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
