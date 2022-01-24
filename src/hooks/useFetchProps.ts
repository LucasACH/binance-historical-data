import { useReducer } from 'react';
import * as constants from '../constants';
import { FetchProps, FetchPropsAction } from '../interfaces/FetchProps';

const useFetchProps = () => {
  const fetchPropsInitialState: FetchProps = {
    apiBaseUrl: constants.spotApiBaseUrl,
    market: 'Spot',
    contractType: '',
    symbol: '',
    interval: constants.intervals[0],
    startTime: 0,
    endTime: new Date().getTime(),
  };

  const reducer = (state: FetchProps, action: FetchPropsAction) => {
    const { type, payload } = action;
    return { ...state, [type]: payload };
  };

  const [fetchProps, setFetchProps] = useReducer(
    reducer,
    fetchPropsInitialState
  );

  return { fetchProps, setFetchProps };
};

export default useFetchProps;
