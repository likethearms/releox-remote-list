/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { PaginationItem } from '../hooks/use-remote-list';

interface Props {
  paginationList: PaginationItem[];
  floatRight?: boolean;
}

const TailwindPagination = ({
  paginationList,
  floatRight,
}: Props): JSX.Element => {
  return (
    <div className={`inline-block ${floatRight ? 'float-right' : ''}`}>
      <ul className="flex border border-grey-light rounded w-auto TailwindPagination">
        {paginationList.map((p) => {
          const baseClasses =
            'block border-r border-grey-light px-3 py-2 focus:outline-none';
          let btnClasses = '';
          let liClasses = '';

          if (p.isActive) {
            btnClasses = `${baseClasses} text-white`;
            liClasses = 'bg-blue-600 rounded-sm';
          } else {
            btnClasses = `${baseClasses} text-blue-600 hover:bg-gray-300`;
          }

          return (
            <li key={p.text} className={liClasses}>
              <button type="button" className={btnClasses} onClick={p.onClick}>
                {p.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TailwindPagination.defaultProps = {
  floatRight: true,
};

export default TailwindPagination;
