import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRemoteList, {
  BaseFilter,
  Filter,
  RemoteListObject,
} from './use-remote-list';

interface Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalSizeSelector(state: any): number;
  onChange(config: Filter): void;
  query?: BaseFilter;
  defaultSizePerPage?: number;
}

export default ({
  totalSizeSelector,
  onChange,
  query,
  defaultSizePerPage,
}: Options): RemoteListObject => {
  const totalSize = useSelector(totalSizeSelector);
  const dispatch = useDispatch();

  const onChangeCallback = useCallback(
    (filter: Filter) => {
      dispatch(onChange(filter));
    },
    [dispatch, onChange]
  );

  return useRemoteList({
    totalSize,
    onChange: onChangeCallback,
    query,
    defaultSizePerPage,
  });
};
