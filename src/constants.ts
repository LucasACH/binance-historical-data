export const spotApiBaseUrl = 'https://api.binance.com/api/v3/';

export const usdFuturesApiBaseUrl = 'https://fapi.binance.com/fapi/v1/';

export const coinFuturesApiBaseUrl = 'https://dapi.binance.com/dapi/v1/';

export const markets = ['Spot', 'USDⓈ-M Futures', 'COIN-M  Futures'];

export const contractTypes = ['PERPETUAL', 'CURRENT_QUARTER'];

export const intervals = [
  '1m',
  '3m',
  '5m',
  '15m',
  '30m',
  '1h',
  '2h',
  '4h',
  '6h',
  '8h',
  '12h',
  '1d',
  '3d',
  '1w',
  '1M',
];

export const headers = [
  'Open Time',
  'Open Price',
  'High Price',
  'Low Price',
  'Close Price',
  'Volume',
  'Close Time',
  'Quote Asset Volume',
  'Number Of Trades',
  'Taker Buy Base Asset Volume',
  'Taker Buy Quote Asset Volume',
];
