export interface FetchProps {
  apiBaseUrl: string;
  market: string;
  contractType: string;
  symbol: string;
  interval: string;
  startTime: number;
  endTime: number;
}

export interface FetchPropsAction {
  type:
    | 'apiBaseUrl'
    | 'market'
    | 'contractType'
    | 'symbol'
    | 'interval'
    | 'startTime'
    | 'endTime';
  payload: string | number;
}
