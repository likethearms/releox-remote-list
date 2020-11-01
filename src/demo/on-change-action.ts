// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export default (filter: any): any => ({
  type: 'SET_FILTER',
  payload: filter,
});
